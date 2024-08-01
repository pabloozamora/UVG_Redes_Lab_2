import socket
import random
import json
from presentation.ascii_to_binary import ascii_to_binary
from fletcher.fletcher_checksum import fletcher16_encode
from hamming.hamming_encoder import hamming_encode
from noise.generate_noise import generate_noise
from presentation.generate_random_string import generate_random_string

HOST = 'localhost'
PORT = 3000
TESTS_NUM = 10000

# Crear un socket TCP/IP
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
    # Conectar el socket al servidor
    client_socket.connect((HOST, PORT))
    print(f"Conectado al servidor en {HOST}:{PORT}")

    error_probs = [0.01, 0.001, 0.0001, 0.00001, 0.000001]

    for method in ["1", "2"]: # 1: Fletcher, 2: Hamming. N iteraciones por algoritmo
        for error_prob in error_probs:

            for i in range(int(TESTS_NUM / len(error_probs))):
                # Enviar un mensaje al servidor
                message = generate_random_string(random.randint(1, 500))

                # Codificar mensaje a binario
                binary_message = ascii_to_binary(message)

                # Codificar mensaje
                encoded_message = None
                if method == "1":
                    encoded_message = fletcher16_encode(binary_message)
                else:
                    encoded_message = hamming_encode(binary_message)

                # Aplicar ruido
                encoded_message_with_noise = generate_noise(encoded_message, error_prob)

                info = {
                    "errorProb": error_prob,
                    "originalMessage": binary_message,
                    "method": method
                }

                full_message = f"{json.dumps(info)}|{encoded_message_with_noise}"

                # Enviar mensaje
                client_socket.sendall(full_message.encode('utf-8'))

    print(f"Los {TESTS_NUM} mensajes por algoritmo fueron enviados.")
except Exception as e:
    print(f"Error: {e}")

finally:
    # Cerrar el socket
    client_socket.close()
    print("Conexión cerrada")
