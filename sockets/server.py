import socket
import threading
from presentation import ascii_to_binary

HOST = '127.0.0.1'
PORT = 65432

def handle_client(conn, addr):
    print('Nueva conexión: ', addr)
    while True:
        data = conn.recv(1024)
        if not data:
            break
    conn.close()

def start_server():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((HOST, PORT))
        s.listen()
        print(f"Servidor escuchando en {HOST}:{PORT}")
        conn, addr = s.accept()
        client_thread = threading.Thread(target=handle_client, args=(conn, addr))
        client_thread.start()
        return conn, client_thread

def send_message(conn, message):
    binary_message = ascii_to_binary.ascii_to_binary(message)
    print(f'Mensaje en binario: {binary_message}')
    conn.sendall(binary_message.encode())
