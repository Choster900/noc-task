
# Proyecto NOC

Este proyecto implementa una serie de tareas utilizando **Arquitectura Limpia** con **TypeScript**. El objetivo es crear una aplicación modular, escalable y fácil de mantener mediante la separación de responsabilidades.

## Requisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Docker y Docker Compose
- MongoDB (local o remoto si no se usa Docker)

## Configuración del Entorno de Desarrollo

1. **Clonar el repositorio**:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
   ```

2. **Instalar las dependencias**:

   ```bash
   npm install
   # o si prefieres usar yarn
   yarn install
   ```

3. **Configurar el archivo de entorno**:

   Clona el archivo `.env.template` a `.env`:

   ```bash
   cp .env.template .env
   ```

4. **Configurar las variables de entorno**:

   Abre el archivo `.env` y configura las siguientes variables según tus necesidades:

   ```plaintext
   PORT=3000

   MAILER_EMAIL=<tu_email>
   MAILER_SECRET_KEY=<tu_secret_key>

   PROD=false

   MONGO_URL=<url_de_conexion_mongo>
   MONGO_DB_NAME=<nombre_de_tu_base_de_datos>
   MONGO_USER=<usuario_mongo>
   MONGO_PASS=<contraseña_mongo>
   ```

## Ejecución en Desarrollo

Para iniciar el servidor en modo de desarrollo:

```bash
npm run dev
# o si prefieres usar yarn
yarn dev
```

El servidor se iniciará en `http://localhost:3000` o en el puerto especificado en tu archivo `.env`.

## Ejecución con Docker Compose

Para ejecutar el proyecto utilizando Docker y Docker Compose, sigue estos pasos:

1. **Asegúrate de que Docker y Docker Compose estén instalados en tu sistema**.

2. **Levanta los contenedores**:

   En la raíz del proyecto, ejecuta el siguiente comando:

   ```bash
   docker-compose up -d
   ```

   Esto levantará el proyecto junto con todos los servicios definidos en el archivo `docker-compose.yml`. Asegúrate de que todas las configuraciones del archivo `.env` estén correctas.

3. **Verifica que los contenedores estén corriendo**:

   Puedes verificar que todo esté funcionando correctamente con el siguiente comando:

   ```bash
   docker-compose ps
   ```

4. **Detener y eliminar los contenedores**:

   Para detener los contenedores y limpiar los recursos asociados, ejecuta:

   ```bash
   docker-compose down
   ```

## Ejecución en Producción

Para ejecutar en modo producción:

1. Asegúrate de que la variable `PROD` en tu archivo `.env` esté configurada a `true`.
2. Construye el proyecto:

   ```bash
   npm run build
   # o si prefieres usar yarn
   yarn build
   ```

3. Ejecuta el servidor en producción:

   ```bash
   npm start
   # o si prefieres usar yarn
   yarn start
   ```

## Estructura del Proyecto

El proyecto sigue la **Arquitectura Limpia**, manteniendo una separación clara de las responsabilidades. A continuación, se describe brevemente la estructura del proyecto:

```
/src
  ├── application   # Lógica de negocio (casos de uso)
  ├── domain        # Entidades y reglas de negocio
  ├── infrastructure # Implementaciones tecnológicas (API, DB, etc.)
  ├── presentation  # Controladores, rutas y lógica relacionada con la UI
  └── shared        # Utilidades compartidas, tipos, helpers, etc.
```

## Comandos Disponibles

- `npm run dev` / `yarn dev`: Inicia el servidor en modo desarrollo.
- `npm run build` / `yarn build`: Compila el código TypeScript a JavaScript.
- `npm start` / `yarn start`: Inicia el servidor en modo producción.
- `npm test` / `yarn test`: Ejecuta las pruebas unitarias.
- `docker-compose up -d`: Levanta el entorno completo en contenedores.
- `docker-compose down`: Detiene y elimina los contenedores.

## Variables de Entorno

- `PORT`: Puerto en el que se ejecutará la aplicación.
- `MAILER_EMAIL`: Correo electrónico utilizado para el servicio de notificaciones.
- `MAILER_SECRET_KEY`: Clave secreta para la autenticación del servicio de correo.
- `PROD`: Configura el entorno de la aplicación (`true` para producción, `false` para desarrollo).
- `MONGO_URL`: URL de conexión a la base de datos MongoDB.
- `MONGO_DB_NAME`: Nombre de la base de datos MongoDB.
- `MONGO_USER`: Usuario de la base de datos MongoDB.
- `MONGO_PASS`: Contraseña del usuario de la base de datos MongoDB.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue estos pasos para contribuir:

1. Crea un fork del repositorio.
2. Crea una nueva rama para tu función (`git checkout -b feature/nueva-funcion`).
3. Haz commit de tus cambios (`git commit -am 'Agrega nueva función'`).
4. Haz push a la rama (`git push origin feature/nueva-funcion`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Contacto

Para cualquier consulta o problema relacionado con el proyecto, puedes contactarnos en:

- **Email**: [16adonaysergio@gmail.com](mailto:16adonaysergio@gmail.com)
- **GitHub**: [Choster900](https://github.com/Choster900)
