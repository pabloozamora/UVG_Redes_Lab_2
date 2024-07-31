import socket

HOST = 'localhost'
PORT = 3000

# Crear un socket TCP/IP
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
    # Conectar el socket al servidor
    client_socket.connect((HOST, PORT))
    print(f"Conectado al servidor en {HOST}:{PORT}")

    # Enviar un mensaje al servidor
    message = "Hola desde el cliente"
    client_socket.sendall(message.encode('utf-8'))
    print(f"Mensaje enviado: {message}")

except Exception as e:
    print(f"Error: {e}")

finally:
    # Cerrar el socket
    client_socket.close()
    print("Conexión cerrada")
