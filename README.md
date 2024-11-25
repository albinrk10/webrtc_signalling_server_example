# WebRTC Signalling Server

Este es un servidor de señalización para aplicaciones **WebRTC**, diseñado para facilitar la conexión entre pares mediante el intercambio de ofertas SDP, respuestas SDP y candidatos ICE. Implementado con **Node.js** y **Socket.IO**.

---

## Características

- **Intercambio de SDP:** Proporciona un canal para compartir ofertas y respuestas SDP entre pares.
- **Candidatos ICE:** Permite el intercambio de rutas de red necesarias para WebRTC.
- **Gestión de usuarios:** Identifica y gestiona a los clientes mediante un identificador único (`callerId`).
- **Escalabilidad:** Soporte ligero para aplicaciones pequeñas y grandes.

---

## Requisitos previos

- **Node.js** v12 o superior.
- **npm** (incluido con Node.js).

---

###  Clonar el repositorio

Clona este repositorio en tu entorno local:

```sh
git clone https://github.com/albinrk10/webrtc_signalling_server_example.git

```

## 1. Instalación
Instala las dependencias necesarias:
```
npm install
```

## 2. Ejecutar el servidor
Ejecuta el servidor de señalización:
```
npm run start
```
