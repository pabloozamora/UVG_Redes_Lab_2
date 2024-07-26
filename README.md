# UVG_Redes_Lab_2
Universidad del Valle de Guatemala - Redes - Laboratorio 2

El objetivo del presente laboratorio es implementar y analizar algoritmos de detección y corrección de errores en la transmisión de datos. Los algoritmos deben ser implementados en dos lenguajes distintos: uno para el emisor y otro para el receptor.

## Algoritmos Implementados
* Corrección de Errores
  
  Código de Hamming: Implementado para detectar y corregir errores en el mensaje transmitido.
* Detección de Errores
  
  Fletcher Checksum: Calcula una suma de verificación para detectar errores en los mensajes.

## ¿Cómo usar?

Emisor:

  * Solicita un mensaje en binario.
  * Ejecuta el algoritmo seleccionado para generar y concatenar la información de verificación al mensaje original.

Receptor:

  * Solicita un mensaje concatenado con la información de verificación.
  * Ejecuta el algoritmo para comprobar la integridad del mensaje.
  * Indica si el mensaje es correcto, se ha detectado un error, o se ha corregido un error, proporcionando detalles según sea necesario.