const impuestos = {
    impuesto1: 2341,
    impuesto2: 341,
    impuesto3: 4611,
    impuesto4: 111
    //  Key:  Valor
}

let parLlaveValor = Object.entries(impuestos)
console.log(parLlaveValor)

let Propiedades = Object.keys(impuestos)
console.log("Propiedades:", Propiedades)

let Valores = Object.values(impuestos)
console.log("Valores:", Valores)

// Calcular el total de los impuestos

const impuestoTotal = Valores.reduce((acumulado, actual) => {
    console.log(
        "Valores:\nActual:", actual,"y Acumulado:", acumulado
    )
    return acumulado + actual
})

console.log("Impuestos totales:", impuestoTotal)

