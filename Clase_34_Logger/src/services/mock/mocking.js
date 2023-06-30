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

export function mockingUsers(req, res) {
    const user = {
        first_name: fakerES.person.firstName(),
        last_name: fakerES.person.lastName(),
        email: fakerES.internet.email({ firstName: first_name, lastName: last_name }),
        age: fakerES.number.int(100),
        password: fakerES.internet.password({ length: 14, memorable: true })
    };

    res.status(200).json(user)
}