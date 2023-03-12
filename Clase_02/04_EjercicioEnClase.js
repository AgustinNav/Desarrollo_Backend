const objetos = [
    {
        manzanas: 3,
        peras: 2,
        carne: 1,
        jugos: 5,
        dulces: 2
    },
    {
        manzanas: 1,
        sandias: 1,
        huevos: 6,
        jugos: 1,
        panes: 4
    }
]


// MI RESOLUCION 

const [obj1, obj2] = objetos

const Lista = [...Object.keys(obj1), ...Object.keys(obj2)]
const Productos = []

Lista.map((prod) => {
    if (!Productos.includes(prod)){
        Productos.push(prod)
    }
})

console.log(Productos) // PUNTO A

const Valores = [...Object.values(obj1), ...Object.values(obj2)]

let ventasTot = Valores.reduce((acum, value) => acum + value) // PUNTO B

console.log(ventasTot)

// RESOLUCION DEL PROFE

let newArray = []
let totalCantProductos = 0

objetos.forEach(objeto => {
    const keys = Object.keys(objeto)

    keys.forEach(key => {
        if(!newArray.includes(key)) newArray.push(key)
    })

    let soloValores = Object.values(objeto)
    let totalProductos = soloValores.reduce((Acc, Ini) => {
        return Acc + Ini
    })
    totalCantProductos += totalProductos

})

console.log(newArray)
console.log(totalCantProductos)