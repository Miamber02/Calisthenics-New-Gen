# **Tutorial de Uso de la Web**

## **Introducción**
Esta aplicación es una plataforma web desarrollada para la gestión de entrenamientos de calistenia, aunque se puede usar para otros deportes. Está diseñada para facilitar la organización de los  entrenamientos, visualizar detalles y permitir una navegación intuitiva entre las diferentes funcionalidades.

---

## **Requisitos previos**
Antes de utilizar la aplicación, asegúrate de tener instalados:

- **Node.js** (para ejecutar la aplicación React).
- **JSON Server** (para simular el backend).

Puedes instalar JSON Server globalmente con el siguiente comando:
```bash
npm install -g json-server
```

---

## **Configuración e Instalación**

1. **Clona el repositorio**:
   ```bash
   git clone /url del repositorio/
   cd proyecto
   ```
2. **Instala las dependencias**:
   ```bash
   npm install
   ```
3. **Inicia JSON Server**:
   Ejecuta el servidor de base de datos:
   ```bash
   json-server --watch db.json --port 5000
   ```
4. **Inicia la aplicación React**:
   ```bash
   npm start
   ```
   La aplicación estará disponible en `http://localhost:3000`.

---

## **Inicio de sesión**
Para acceder a la plataforma:

Selecciona el usuario y procede con las credenciales correspondientes.

---

## **Navegación Principal**
Una vez iniciada la sesión, se accede a la **página principal** que muestra el dashboard correspondiente al rol del usuario.

### **Menú Lateral (Sidebar)**
Desde el menú lateral, puedes acceder a las siguientes opciones:

1. **Entrenamientos**: 
   - Visualizar la lista de entrenamientos asignados.
   - Seleccionar un entrenamiento para ver los detalles.

2. **Detalles de Ejercicios**:
   - Dentro de cada entrenamiento, puedes consultar los ejercicios asociados.

3. **Perfil**:
   - Acceder a la información personal del usuario.

4. **Cerrar sesión**:
   - Utiliza el botón **Cerrar sesión** para salir de la plataforma.

---

## **Flujo de trabajo para usuarios**

### **1. Visualizar entrenamientos**
- Selecciona la opción **Entrenamientos** en el sidebar.
- Se mostrará una lista con los entrenamientos asignados al usuario.
- Cada elemento incluye:
  - **Fecha del entrenamiento**
  - **Título del entrenamiento**
  - **Tipo de entrenamiento**

### **2. Detalles de entrenamiento**
- Al hacer clic sobre un entrenamiento, se muestran los ejercicios asignados.
- Desde aquí puedes consultar:
  - **Descripción** del entrenamiento.
  - **Tipo** (fuerza, cardio, etc.).
  - **Lista de ejercicios**.

### **3. Ejercicios**
- Cada ejercicio puede contener información adicional como:
  - Nombre del ejercicio.
  - Series y repeticiones.
  - Progreso del entrenamiento.

### **4. Cerrar sesión**
- Usa el botón de **Cerrar sesión** disponible en la barra lateral para salir de la plataforma.

## **Propuestas de Mejora**

- Añadir el uso de cookies para la sesión.
- Diseñar una base de datos real con un servidor como **Firebase**, **MongoDB** o **MySQL**.
- Agregar un sistema de notificación y recordatorios automáticos.
- Poder copiar / pegar rutinas, ejercicios y series.
- Añadir la barra de progreso % que estaba en desarrollo.
- Mejorar el diseño del cronómetro.
- Iniciar sesión con el correo electrónico.
- Y muchas más cosas por venir **;D**

---

## **Contacto**
Si tienes alguna duda o necesitas soporte, puedes contactar con el administrador:

- **Administrador**: miamber02@gmail.com

---

**Gracias por utilizar mi aplicación!! :D**
