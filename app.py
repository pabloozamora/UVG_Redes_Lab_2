from sockets import server
conn, client_thread = server.start_server()
    
try:
    while True:
        message = input("Introduce un mensaje para enviar: ")
        if message.lower() == 'exit':
            conn.close()
            break
        server.send_message(conn, message)
except KeyboardInterrupt:
    print("Terminando servidor...")
    conn.close()
finally:
    client_thread.join() # Esperar a que el hilo del cliente termine