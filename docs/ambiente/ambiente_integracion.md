#  Ambiente de Integración – Proyecto Grupo 5

Este documento describe cómo configurar y validar el ambiente de integración entre el Frontend (Grupo 5) y los Backends (G1–G4).

---

##  1. Variables necesarias (.env)
El archivo `.env` debe crearse a partir de `.env.example`.
VITE_API_BASE_URL=https://<backend>/api
VITE_AUTH_URL=https://<backend>/api/auth
VITE_CATALOG_URL=https://<backend>/api/libros
VITE_LOANS_URL=https://<backend>/api/prestamos


---

## ✅ 2. Validación del ambiente
Antes de integrar, probar:

1. `GET /libros`  
2. `POST /auth/login`  
3. `GET /libros/:id`  
4. `POST /prestamos`

---

## ✅ 3. Pruebas de comunicación FE → BE
Desde el frontend:

- Login funciona  
- Catálogo carga libros  
- Detalle muestra datos reales  
- Crear préstamo funciona  
- Mostrar préstamos funciona

---

## ✅ 4. Contratos API confirmados
Ver sección “Integración” del README principal.

---

## ✅ 5. Checklist previo a conectar Backends
- Backend desplegado  
- Swagger disponible  
- Corregido CORS  
- Rutas confirmadas  
- Datos de prueba cargados  

---

Este documento asegura que toda integración entre equipos sea clara y reproducible.
