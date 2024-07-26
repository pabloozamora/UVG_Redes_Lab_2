'''
Universidad del Valle de Guatemala
Redes
Sección 10
Laboratorio 2

Codificador de Fletcher checksum

Autores:
Diego Andrés Morales Aquino - 21762
Pablo Andrés Zamora Vásquez - 21780
'''

def fletcher16_checksum(input_value):
    block_size = 8

    # Agregar padding si el input no es múltiplo del tamaño de bloque
    number_of_blocks = -(-len(input_value) // block_size) * block_size
    input_with_padding = bin(int(input_value, 2)).lstrip('0b').zfill(number_of_blocks)

    sum1 = 0
    sum2 = 0

    # Recorrer input en bloques
    for i in range(0, len(input_with_padding), block_size):
        # Suma y mantiene el byte bajo 8 bits
        block_value = int(input_with_padding[i:i + block_size], 2)
        sum1 = (sum1 + block_value) % 255
        sum2 = (sum2 + sum1) % 255

    # Combina sum1 y sum2 en un valor de 16 bits
    checksum = (sum2 << 8) | sum1
    return bin(checksum).lstrip('0b').zfill(16)


complete_message = input("Ingresar cadena codificada: ")

# n - 16 primeros elementos son el mensaje. últimos 16 son el checksum.
message = complete_message[0:-16] 
checksum = complete_message[-16:]

# Calcular checksum
checksum_calc = fletcher16_checksum(message)

if checksum != checksum_calc:
    print("\033[31mChecksum incorrecto\033[0m. El mensaje contiene errores, descartando...")
else:
    print(f"\033[32mMensaje correcto!\033[0m El mensaje es: {message}")