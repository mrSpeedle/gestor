
# Gestor de Tareas 📋

Una aplicación web para crear, editar, eliminar y visualizar tareas personales. Ideal para organizar tus pendientes, con calendario, filtros y un diseño agradable y responsivo.

## 🚀 Demo

- Pantalla de inicio con formulario:
  ![Pantalla principal](frontend/gestor-tareas-frontend/assets/screenshots/form.png)
- Calendario responsivo con indicadores:
  ![Calendario](frontend/gestor-tareas-frontend/assets/screenshots/calendar.png)


## ⚙️ Tecnologías

- **Backend**: Python + FastAPI  
- **Frontend**: React.js  
- **Estilos**: Tailwind CSS  
- **Persistencia**: archivo JSON (`tasks.json`)  
- **Calendario**: `react-calendar`  
## 🛠️ Instalación

### 1. Clonar repositorio  
```bash
git clone https://github.com/tu-usuario/gestor-tareas.git
cd gestor-tareas
```   
### 2. Backend
```bash
cd backend
python -m venv venv
# Windows
source venv/Scripts/activate
pip install fastapi uvicorn pydantic
uvicorn main:app --reload

# mac/Linux
source venv/bin/activate
pip install fastapi uvicorn pydantic
uvicorn main:app --reload
```
El backend quedará disponible en http://127.0.0.1:8000

### 3. Frontend
```bash
cd ../gestor-tareas-frontend
npm install
npm start
```
Tu frontend arrancará en http://localhost:3000 y se conectará automáticamente con el backend.
## 💾 Uso de la aplicación

1. Crear tarea: Completa título, fecha futura y prioridad.

2. Visualizar calendario: Pulsa en un día para filtrar tareas.

3. Filtros: Desde el selector puedes ver tareas por estado o prioridad.

4. Editar: Pulsa “Editar” y ajusta los campos en el modal.

5. Completar o eliminar: Usa los botones de cada tarea.

Cada acción se actualiza en la interfaz y se guarda en tasks.json.


## ✅ Validaciones y UX

* Título obligatorio y fecha posterior al día actual.

* Modal responsivo con foco accesible y botones clicables.

* Formulario adaptado a móviles y pantallas grandes.

* Indicadores en calendario coloreados según prioridad.
## 🔧 Scripts Disponibles

En la carpeta /gestor-tareas-frontend, usa:

* npm start → levanta la app en modo desarrollo.

* npm run build → genera la versión lista para producción.

En /backend, usa:

* uvicorn main:app --reload → inicia el servidor con recarga automática.
