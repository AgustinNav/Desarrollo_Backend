/*
class nombreDeMiClase {
    constructor(parametrosDeCracion) {
        console.log("Nuevo objeto creado")
        this.variableInterna = 2
    }

    static variableEstatica = 4

    metodo1(){
        console.log("Soy un metodo")
    }

    metodo2(){
        console
    }

}
*/
/*
class Auto {
    constructor(color, marca) {
        this.color = color
        this.marca = marca
        console.log("Auto creado!")
    }

    // Metodos

    frenar() {
        return "Auto frenado."
    }

    acelerar() {
        return "Auto acelerado."
    }
}

// Instanciando la clase

const auto1 = new Auto("Rojo", "Tesla")
const auto2 = new Auto("Verde", "Ford")

console.log("Tengo un ", auto1.marca, auto1.color)
console.log("Yo tengo un ", auto2.marca, auto2.color)

console.log(auto1.acelerar())

*/

class ContadorBanco {
    static cuetaGlobal = 0

    constructor(responsable) {
        this.responsable = responsable
        this.cuentaIndividual = 0
    }

    obtenerResponsable() {
        return this.responsable
    }

    obtenerCuentaIndividual() {
        return this.cuentaIndividual
    }

    obtenerCuentaGlobal() {
        return ContadorBanco.cuetaGlobal
    }

    contar() {
        this.cuentaIndividual++
        ContadorBanco.cuetaGlobal++
    }
}

const r1 = new ContadorBanco("Juan")
const r2 = new ContadorBanco("Seba")

r1.contar()
r2.contar()

console.log(r1)
console.log(r2)

console.log(r1.obtenerCuentaIndividual())
console.log(r2.obtenerCuentaIndividual())

console.log(r2.obtenerCuentaGlobal())

