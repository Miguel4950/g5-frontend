# ✅ Matriz de Riesgos – Integración

| Riesgo | Probabilidad | Impacto | Mitigación | Señal Temprana |
|--------|--------------|----------|--------------|----------------|
| Cambios tardíos del contrato API | Alta | Alto | Congelar 48h antes de demo | PRs modificando Swagger |
| CORS bloqueado | Media | Alto | Agregar FE al whitelist | Error CORS en consola |
| API caída | Media | Alto | Plan B: endpoint espejo | Status 500/timeout |
| Token inválido | Media | Medio | Refrescar token o redirigir | 401 repetitivos |
| Sin datos de prueba | Media | Medio | Crear “seed” para demo | Tablas vacías |
