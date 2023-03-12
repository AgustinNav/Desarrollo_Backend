const { execSync } = require('child_process');
const fs = require('fs').promises;

async function getInfo() {
  try {
    // Ejecutar "npm init -y" en el directorio actual
    execSync(`cd ${__dirname} && npm init -y`);

    // Leer el archivo package.json
    const packageJson = JSON.parse(await fs.readFile('./package.json'));

    // Crear el objeto de información
    const info = {
      contenidoStr: JSON.stringify(packageJson, null, 2),
      contenidoObj: packageJson,
      size: (await fs.stat('./package.json')).size
    };

    // Imprimir el objeto info en la consola
    console.log(info);

    // Guardar el objeto info en un archivo info.json
    await fs.writeFile('./info.json', JSON.stringify(info, null, 2));
  } catch (error) {
    throw new Error(`Ha ocurrido un error: ${error.message}`);
  }
}

getInfo();