# Ejemplo de uso del endpoint de creación de usuarios

## Crear usuario exitosamente

```bash
POST /users
Content-Type: application/json
Authorization: Bearer <tu-jwt-token>

{
  "firstName": "Juan",
  "secondName": "Carlos",
  "lastName": "Pérez",
  "secondLastName": "García",
  "cedula": "12345678",
  "email": "juan.perez@ejemplo.com",
  "password": "miPassword123",
  "role": "estudiante"
}
```

**Respuesta exitosa (201):**
```json
{
  "id": 1,
  "firstName": "Juan",
  "secondName": "Carlos",
  "lastName": "Pérez",
  "secondLastName": "García",
  "cedula": "12345678",
  "email": "juan.perez@ejemplo.com",
  "password": "$2b$10$...",
  "role": "estudiante"
}
```

## Intentar crear usuario con email duplicado

```bash
POST /users
Content-Type: application/json
Authorization: Bearer <tu-jwt-token>

{
  "firstName": "María",
  "secondName": "Elena",
  "lastName": "López",
  "secondLastName": "Martínez",
  "cedula": "87654321",
  "email": "juan.perez@ejemplo.com",  // Mismo email que el usuario anterior
  "password": "otroPassword456",
  "role": "bibliotecario"
}
```

**Respuesta de error (409):**
```json
{
  "statusCode": 409,
  "message": "El email 'juan.perez@ejemplo.com' ya está registrado",
  "error": "Conflict",
  "code": "EMAIL_ALREADY_EXISTS"
}
```

## Buscar usuario que no existe

```bash
GET /users/999
Authorization: Bearer <tu-jwt-token>
```

**Respuesta de error (404):**
```json
{
  "statusCode": 404,
  "message": "Usuario con ID 999 no encontrado",
  "error": "Not Found",
  "code": "USER_NOT_FOUND"
}
```

## Códigos de estado HTTP utilizados

- **201 Created**: Usuario creado exitosamente
- **409 Conflict**: Email ya existe (EMAIL_ALREADY_EXISTS)
- **404 Not Found**: Usuario no encontrado (USER_NOT_FOUND)
- **500 Internal Server Error**: Error interno del servidor (INTERNAL_ERROR)
- **401 Unauthorized**: Token JWT inválido o faltante
- **403 Forbidden**: Usuario sin permisos de bibliotecario
