const randomNumbers = {}

for (let i = 0; i < 10000; i++) {

    const number = Math.floor(Math.random() * 20 + 1)

    if (!randomNumbers[number]) {
        randomNumbers[number] = 1
    } else {
        randomNumbers[number]++
    }
}

let acum = 0

for(let i = 1; i <= 20; i++){
    acum = acum + randomNumbers[i]
}

console.log(randomNumbers)
console.log("Verificacion:", acum)

