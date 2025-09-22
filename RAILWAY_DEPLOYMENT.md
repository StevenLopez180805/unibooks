# Guía de Despliegue en Railway

## Variables de Entorno Requeridas

Configura estas variables en el panel de Railway:

### Base de Datos
- `DATABASE_HOST` - Host de la base de datos PostgreSQL
- `DATABASE_PORT` - Puerto de la base de datos (5432)
- `DATABASE_USERNAME` - Usuario de la base de datos
- `DATABASE_PASSWORD` - Contraseña de la base de datos
- `DATABASE_NAME` - Nombre de la base de datos

### JWT
- `JWT_SECRET` - Clave secreta para firmar tokens JWT (usa una clave segura)
- `JWT_EXPIRES_IN` - Tiempo de expiración del token (ej: "24h")

### Aplicación
- `NODE_ENV` - Debe ser "production" en Railway
- `PORT` - Railway asigna automáticamente esta variable

## Comandos de Migración

### Desarrollo Local
```bash
# Generar nueva migración
npm run migration:generate -- src/migrations/NombreMigracion

# Ejecutar migraciones
npm run migration:run

# Revertir última migración
npm run migration:revert

# Ver estado de migraciones
npm run migration:show
```

### En Railway
Las migraciones se ejecutan automáticamente al desplegar gracias a la configuración `migrationsRun: true` en producción.

## Pasos para Desplegar

1. **Conectar con Railway:**
   - Instala Railway CLI: `npm install -g @railway/cli`
   - Inicia sesión: `railway login`
   - Inicializa proyecto: `railway init`

2. **Configurar Base de Datos:**
   - Añade un servicio PostgreSQL en Railway
   - Railway generará automáticamente las variables de entorno de la base de datos

3. **Configurar Variables de Entorno:**
   - Ve al panel de Railway
   - Configura las variables listadas arriba

4. **Desplegar:**
   - `railway up` o conecta tu repositorio de GitHub

## Notas Importantes

- Las migraciones se ejecutan automáticamente en producción
- No uses `synchronize: true` en producción
- Siempre prueba las migraciones en un entorno de desarrollo primero
- Railway proporciona automáticamente `DATABASE_URL` si usas su servicio PostgreSQL
