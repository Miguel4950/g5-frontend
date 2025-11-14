Instrucciones de importación (copiar dentro de tu proyecto Vite existente):

1) Copia la carpeta `src/` de este paquete dentro de tu `frontend/` y mergea.
   - Si ya tienes `main.jsx` o `App.jsx`, sustituye por los incluidos o integra rutas y Provider.
2) Copia `tailwind.config.js`, `postcss.config.js` y asegúrate de tener en `src/index.css`:
   @tailwind base; @tailwind components; @tailwind utilities;
3) (Opcional) Copia `mock/db.json` y agrega en package.json:
   "scripts": { "mock": "json-server --watch mock/db.json --port 3001" }
   Instala:  npm i -D json-server
4) Crea `.env` con:
   VITE_API_BASE_URL=http://localhost:3001
5) Instala dependencias si faltan:
   npm i axios react-router-dom @reduxjs/toolkit react-redux
   npm i -D tailwindcss postcss autoprefixer
6) Run:
   npm run dev   (y opcional en otra terminal: npm run mock)
