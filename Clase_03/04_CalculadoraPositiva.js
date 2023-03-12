
const suma = (a, b) => {
    return new Promise((resolve, reject) => {
        console.log(`Se recibe promesa -> ${a} + ${b}`)

        if ((a != 0) && (b != 0)) {

            if ((a + b) < 0) {
                reject("La caluladora solo debe devolver valores positivos")
            } else {
                resolve(a + b)
            }

        } else {
            reject("Operacion innecesaria")
        }
    })
}

const resta = (a, b) => {
    return new Promise((resolve, reject) => {
        console.log(`Se recibe promesa -> ${a} - ${b}`)

        if ((a != 0) && (b != 0)) {

            if ((a - b) < 0) {
                reject("La caluladora solo debe devolver valores positivos")
            } else {
                resolve(a - b)
            }

        } else {
            reject("Operacion invalida")
        }
    })
}

const multiplicacion = (a, b) => {
    return new Promise((resolve, reject) => {
        console.log(`Se recibe promesa -> ${a} * ${b}`)

        if ((a >= 0) && (b >= 0)) {

            resolve(a * b)

        } else {
            reject("La caluladora solo debe devolver valores positivos")
        }
    })
}

const divicion = (a, b) => {

    return new Promise((resolve, reject) => {
        console.log(`Se recibe promesa -> ${a} / ${b}`)

        if (b === 0) {
            reject("No se puede dividir por cero.");
        } else {
            resolve(a / b);
        }
    });
};

const calculos = async (a, b) => {
    try {
        let resutado = await resta(await multiplicacion(await suma(a, b), await (divicion(a, b))), a)

        return resutado
    } catch (error) {
        console.log("Error:", error)
    }
}

console.log(calculos(10, 5))