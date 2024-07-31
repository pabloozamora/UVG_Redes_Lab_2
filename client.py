import socket
from presentation.ascii_to_binary import ascii_to_binary
from fletcher.fletcher_checksum import fletcher16_encode
from hamming.hamming_encoder import hamming_encode
from noise.generate_noise import generate_noise

HOST = 'localhost'
PORT = 3000
ERROR_PROB = 0.0001

# Crear un socket TCP/IP
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
    # Conectar el socket al servidor
    client_socket.connect((HOST, PORT))
    print(f"Conectado al servidor en {HOST}:{PORT}")

    # Enviar un mensaje al servidor
    message = input("Ingresar mensaje a enviar: ")

    # Codificar mensaje a binario
    binary_message = ascii_to_binary(message)

    # Seleccionar algoritmo de detección o corrección
    method = None
    while method == None:
        method = input("Seleccionar algoritmo a utilizar: \n1. Algoritmo de detección (Fletcher).\n2. Algoritmo de corrección (Hamming).\n")
        if method not in ("1", "2"): method = None

    # Codificar mensaje
    encoded_message = None
    if method == "1":
        encoded_message = fletcher16_encode(binary_message)
    else:
        encoded_message = hamming_encode(binary_message)

    # Aplicar ruido
    encoded_message_with_noise = generate_noise(encoded_message, ERROR_PROB)

    # Enviar mensaje
    client_socket.sendall(encoded_message_with_noise.encode('utf-8'))
    print(f"Mensaje enviado: {encoded_message}")

except Exception as e:
    print(f"Error: {e}")

finally:
    # Cerrar el socket
    client_socket.close()
    print("Conexión cerrada")
