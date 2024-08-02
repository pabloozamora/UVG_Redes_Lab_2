# UVG_Redes_Lab_2
Universidad del Valle de Guatemala - Redes - Laboratorio 2.2

Autores: Diego Morales Aquino y Pablo Zamora

Esta práctica de laboratorio consistió en implementar una arquitectura de capas para la transmisión de mensajes, en la cual, el emisor fue desarrollado en Python y el receptor, en Javascript. Esta implementación permite al usuario ingresar un mensaje para enviar desde el emisor al receptor, así como decidir el algoritmo que se utilizará para la validación o corrección del mismo.

## Algoritmos Implementados
* Corrección de Errores
  
  Código de Hamming: Implementado para detectar y corregir errores en el mensaje transmitido.
* Detección de Errores
  
  Fletcher Checksum: Calcula una suma de verificación para detectar errores en los mensajes.

## ¿Cómo usar?

**Emisor (cliente):**

Para ejecutar los clientes se deben de ejecutar el script de python según sea el caso.

  - Uso simple: ./client.py
  - Pruebas automáticas: ./client_tests.py

 
**Receptor (server):**

Para ejecutar el server ejecutar los siguientes comandos según sea el caso:

  - Uso simple:
  ```
  node ./server.js
  ```
  - Pruebas automáticas:
  ```
  node ./server_tests.js
  ```

**¡Importante!** Asegurarse de correr los archivos de cliente y servidor con su correspondiente pareja. Es decir, si se ejecuta el server simple utilizar también el cliente simple y si se ejecuta el server de pruebas ejecutar también el cliente de pruebas.

## Gráficas

Una vez que se ejecuta el server_tests.js y client_tests.py, se genera en la raiz del proyecto un archivo **output.csv**, con el cual se puede ejecutar el jupyter notebook **tests_graphs.ipynb**.