'''
Universidad del Valle de Guatemala
Redes
Sección 10
Laboratorio 2

Codificador de Hamming

Autores:
Diego Andrés Morales Aquino - 21762
Pablo Andrés Zamora Vásquez - 21780
'''


def hamming_encode(data):
    """Codifica cadenas de bits usando código Hamming (n, m)"""
    m = len(data)
    r = 1
    
    # Determinar los bits de paridad necesarios
    while (2**r - 1) < (m + r):
        r += 1

    n = m + r
    encoded = ['0'] * (n + 1)

    # Insertar bits de data en posiciones no potencia de 2
    j = 0
    for i in range(1, n + 1):
        if not (i & (i-1)) == 0: # Si i AND i-1 es 0, entonces i es una potencia de 2
            encoded[i] = data[j] # Insertar bit de data en la posición i
            j += 1 # Pasar al siguiente bit de data

    # Calcular bits de paridad
    for i in range(r): # Por cada bit de paridad
        parity_index = 2**i # Determinar su índice
        parity_value = 0 # Su valor comienza en 0
        for j in range(1, n + 1): # Por cada bit en la secuencia codificada
            if j & parity_index: # Si j tiene un 1 en la posición que indica el indice de paridad, tomarlo en cuenta
                parity_value ^= int(encoded[j]) # Calcular XOR de la paridad actual con el bit actual, determinando si se mantiene o se rompe la paridad
        encoded[parity_index] = str(parity_value)

    return ''.join(encoded[1:])

data = input('Ingrese la cadena de bits a codificar: ')
encoded_data = hamming_encode(data)
print(f"Datos codificados: {encoded_data}")
