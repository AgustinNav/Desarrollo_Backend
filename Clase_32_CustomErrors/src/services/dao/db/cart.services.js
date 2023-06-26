import CartModel from "./models/cart.model.js";
import ProductModel from "./models/product.model.js";
import * as ticketService from './ticket.service.js'

export async function getAll() {
    try {
        let carts = await CartModel.find().populate("products.product");
        return carts;
    } catch (error) {
        throw new Error("Error al obtener los carritos de compras.");
    }
}

export async function get(email) {
    try {
        let cart = await CartModel.findOne({ ownerEmail: email }).lean();
        if (!cart) {
            throw new Error("No se encontró el carrito de compras.");
        }
        return cart;
    } catch (error) {
        throw new Error("Error al obtener el carrito de compras.");
    }
}

export async function create(email) {
    try {
        let cart = new CartModel({
            ownerEmail: email,
            products: [],
            total: 0
        });
        await cart.save();
        return cart;
    } catch (error) {
        throw new Error("Error al crear el carrito de compras.");
    }
}

export async function addProduct(email, productId) {
    try {
        let cart = await CartModel.findOne({ ownerEmail: email });
        if (!cart) {
            throw new Error("No se encontró el carrito de compras.");
        }

        let prodToAdd = await ProductModel.findById(productId);
        if (!prodToAdd) {
            throw new Error("No se encontró el producto.");
        }

        let prodInCart = cart.products.find(prod => prod.product._id == productId)
        let prodInCartPosition = cart.products.findIndex(prod => prod.product._id == productId)
        if (prodInCart) {
            cart.products[prodInCartPosition].quantity = prodInCart.quantity + 1
            await CartModel.updateOne({ ownerEmail: email }, cart)
            console.log("cantidad actualizada");
        } else {
            cart.products.push({ product: prodToAdd, quantity: 1 })
            await CartModel.updateOne({ ownerEmail: email }, cart)
            console.log("producto agregado");
        }
        return cart;
    } catch (error) {
        console.error(error);
        throw new Error("Error al agregar el producto al carrito.");
    }
}

export async function update(email, updates) {
    try {
        let cart = await CartModel.findOneAndUpdate({ ownerEmail: email }, updates, { new: true });
        if (!cart) {
            throw new Error("No se encontró el carrito de compras.");
        }
        return cart;
    } catch (error) {
        throw new Error("Error al actualizar el carrito de compras.");
    }
}

export async function updateProductQuantity(email, productId, quantity) {
    try {
        let cart = await CartModel.findOne({ ownerEmail: email });
        if (!cart) {
            throw new Error("No se encontró el carrito de compras.");
        }

        let productIndex = cart.products.findIndex(prod => prod.product.toString() === productId);
        if (productIndex === -1) {
            throw new Error("No se encontró el producto en el carrito.");
        }

        cart.products[productIndex].quantity = quantity;
        await cart.save();
        return cart;
    } catch (error) {
        throw new Error("Error al actualizar la cantidad del producto en el carrito.");
    }
}

export async function deleteProduct(email, productId) {
    try {
        let cart = await CartModel.findOne({ ownerEmail: email });
        if (!cart) {
            throw new Error("No se encontró el carrito de compras.");
        }

        cart.products = cart.products.filter(prod => prod.product.toString() !== productId);
        await cart.save();
        return cart;
    } catch (error) {
        throw new Error("Error al eliminar el producto del carrito.");
    }
}

export async function clearCart(email) {
    try {
        let cart = await CartModel.findOne({ ownerEmail: email });
        if (!cart) {
            throw new Error("No se encontró el carrito de compras.");
        }

        cart.products = [];
        await cart.save();
        return cart;
    } catch (error) {
        throw new Error("Error al vaciar el carrito.");
    }
}

export async function deleteCart(email) {
    try {
        let cart = await CartModel.findOneAndRemove({ ownerEmail: email });
        if (!cart) {
            throw new Error("No se encontró el carrito de compras.");
        }
        return cart;
    } catch (error) {
        throw new Error("Error al eliminar el carrito de compras.");
    }
}

export async function purchase(email) {
    try {
        let cart = await CartModel.findOne({ ownerEmail: email }).populate("products.product");
        if (!cart) {
            throw new Error("No se encontró el carrito de compras.");
        }

        let productsToPurchase = [];
        let productsToUpdate = [];

        // Verificar el stock y generar la lista de productos a comprar y actualizar
        for (const item of cart.products) {
            let product = await ProductModel.findById(item.product._id);

            if (!product) {
                throw new Error(`No se encontró el producto con ID ${item.product._id}`);
            }

            if (product.stock >= item.quantity) {
                productsToPurchase.push({ product: item.product, quantity: item.quantity });
                productsToUpdate.push({ _id: product._id, stock: product.stock - item.quantity });
            }
        }

        // Restar el stock de los productos que se van a comprar
        for (const productToUpdate of productsToUpdate) {
            await ProductModel.findByIdAndUpdate(productToUpdate._id, { stock: productToUpdate.stock });
        }

        // Generar el ticket de compra
        const ticketCode = generateTicketCode();
        const ticketData = {
            code: ticketCode,
            purchaser: email,
            purchase_datetime: new Date(),
            amount: 0,
            products: []
        };

        let totalAmount = 0;

        // Agregar los productos a la lista del ticket y calcular el total
        for (const productToPurchase of productsToPurchase) {
            ticketData.products.push({
                product: productToPurchase.product,
                quantity: productToPurchase.quantity
            });

            totalAmount += productToPurchase.product.price * productToPurchase.quantity;
        }

        ticketData.amount = totalAmount;

        // Crear el ticket de compra
        console.log(ticketData);
        const ticket = await  ticketService.create(ticketData);

        // Filtrar los productos que no se pudieron comprar y actualizar el carrito
        const productsNotPurchased = cart.products.filter(item => {
            const purchased = productsToPurchase.find(p => p.product._id.toString() === item.product._id.toString());
            return !purchased;
        });

        cart.products = productsNotPurchased;
        await cart.save();

        return ticket;
    } catch (error) {
        console.error(error);
        throw new Error("Error al procesar la compra del carrito.");
    }
}

function generateTicketCode() {
    // Lógica para generar un código de ticket único, puedes ajustarla según tus necesidades
    const randomString = Math.random().toString(36).substring(2, 10).toUpperCase();
    const timestamp = Date.now().toString().slice(-8);
    return `TICKET-${randomString}-${timestamp}`;
}
