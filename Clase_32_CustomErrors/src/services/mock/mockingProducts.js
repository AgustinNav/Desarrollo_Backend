import { fakerES } from '@faker-js/faker'

export function mockingProducts(req, res) {
    const productosFicticios = [];

    for (let i = 0; i < 20; i++) {
        const producto = {
            title: fakerES.commerce.productName(),
            price: fakerES.commerce.price(),
            description: fakerES.commerce.productDescription(),
            code: fakerES.string.alphanumeric(5),
            status: true,
            stock: fakerES.number.int(100),
            category: fakerES.commerce.department()
        };
        productosFicticios.push(producto);
    }

    res.status(200).json(productosFicticios)
}