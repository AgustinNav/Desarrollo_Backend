
const persona = {
    nombre: "Sol",
    edad: 21,
    saludar() {
        console.log("Hola, mi nombre es", this.nombre)
    }
}

/*
const hobbiesOriginal = ["Rita", "Pedro", "Miguel", "Ana", "Vanesa"]
console.log("\n--------------------------Copiado arrays--------------------------\n")
const copiedSliceArray = hobbiesOriginal.slice(1, 3)
const copiedNestedArray = [hobbiesOriginal] // No sirve mucho

console.log("Copied Slice Array:", copiedSliceArray)
console.log("Copied Nested Array:", copiedNestedArray)
*/
/*
console.log("\n--------------------------Spread operator--------------------------\n")
const copiedArrayWithSpread = [...hobbiesOriginal]
console.log("Copied Array With Spread:", copiedArrayWithSpread)

const personCopiedSpread = {...persona}
console.log("Tambien sirve para objetos ->", personCopiedSpread)
*/

console.log("\n--------------------------Rest operator--------------------------\n")

const toArray = (...args) => {
    return args
}
//console.log("Funcion toArray:", toArray(1, 2, 3, 4));


// Desestructurando objetos

const printNameStandar = (personaParam) => {
    console.log("Print name Standar =", personaParam.nombre)
}
printNameStandar(persona)

const printNameDestruc = ({ nombre }) => {
    console.log("Print Name Destruc =", nombre)
}
printNameDestruc(persona)