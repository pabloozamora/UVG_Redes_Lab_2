/*
Universidad del Valle de Guatemala
Redes
Sección 10
Laboratorio 2

Decodificador de Hamming

Autores:
Diego Andrés Morales Aquino - 21762
Pablo Andrés Zamora Vásquez - 21780
*/

function hammingDecode(encoded) {
    let n = encoded.length;
    let r = 0;

    // Determinar los bits de paridad con los que cuenta la cadena codificada
    while ((2 ** r - 1) < n) {
        r += 1;
    }

    // Agregar un '0' al inicio para hacer que la cadena codificada sea 1-indexed
    encoded = '0' + encoded;
    let errorPos = 0;

    // Validar bits de paridad
    for (let i = 0; i < r; i++) { // Por cada bit de paridad
        let parityIndex = 2 ** i; // Determinar su índice
        let parityValue = 0; // Iniciar su valor de paridad en 0
        for (let j = 1; j <= n; j++) { // Por cada bit en la secuencia codificada
            if (j & parityIndex) { // Determinar si el bit j tiene un 1 en la posición que indica el indice de paridad
                parityValue ^= parseInt(encoded[j]); // Calcular XOR de la paridad actual con el bit actual, determinando si se mantiene o se rompe la paridad
            }
        }
        if (parityValue !== 0) { // Si el valor de paridad no es 0, hay un error
            errorPos += parityIndex; // Agregar la posición del bit de paridad a la cuenta para calcular la posición del error
        }
    }

    if (errorPos) {
        console.log(`Bit incorrecto en la posición: ${errorPos}. Corrigiendo...`);
        let encodedArray = encoded.split('');
        encodedArray[errorPos] = encodedArray[errorPos] === '0' ? '1' : '0';
        encoded = encodedArray.join('');
    } else {
        console.log('No se detectaron errores en la secuencia codificada.');
    }

    // Extraer los bits de data
    let decoded = [];
    for (let i = 1; i <= n; i++) {
        if (!((i & (i - 1)) === 0)) { // Si i AND i-1 es 0, entonces i es una potencia de 2
            decoded.push(encoded[i]); // Si no es potencia de 2, agregar al arreglo decodificado
        }
    }

    return decoded.join('');
}

module.exports = {
    hammingDecode
}