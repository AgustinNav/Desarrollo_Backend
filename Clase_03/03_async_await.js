const dividirConPromesa = (dividendo, divisor) => {

    return new Promise((resolve, reject) => {
        console.log(`Recibiendo promesa para dividir: ${dividendo} / ${divisor}`);

        if (divisor === 0) {
            reject("No se puede dividir por cero.");
        } else {
            resolve(dividendo / divisor);
        }
    });
};

const funcionAsincrona = async (a, b) => {
    console.log("Ejecutando division por func Async()")
    try {
        let resultado = await dividirConPromesa(a, b)
        console.log("Resutaldo:", resultado)
    }
    catch (error) {
        console.log("Error:", error)
    }
}

funcionAsincrona(8, 48)

