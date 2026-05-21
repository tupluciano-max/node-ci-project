# Node.js CI Project

REST API con Express + Jest + GitHub Actions CI/CD.

## 🚀 Estructura del proyecto

```
├── src/
│   ├── app.js                    # Express app
│   ├── server.js                 # Entry point
│   ├── controllers/              # Request handlers
│   ├── services/                 # Business logic
│   ├── routes/                   # Route definitions
│   ├── middlewares/              # Express middlewares
│   └── utils/                   # Utilities / helpers
├── tests/
│   ├── unit/                     # Unit tests (services, utils)
│   └── integration/              # Integration tests (HTTP endpoints)
└── .github/
    └── workflows/
        └── ci.yml                # GitHub Actions CI pipeline
```

## 📦 Instalación

```bash
npm install
cp .env.example .env
```

## ▶️ Correr el servidor

```bash
npm start        # producción
npm run dev      # desarrollo con nodemon
```

## 🧪 Correr tests

```bash
npm test                  # todos los tests
npm run test:unit         # solo unit tests
npm run test:integration  # solo integration tests
npm run test:coverage     # todos + reporte de cobertura
npm run test:watch        # modo watch (desarrollo)
```

## 🔄 CI con GitHub Actions

El pipeline corre automáticamente en cada `push` o `pull_request` a `main` o `develop`:

| Job               | Descripción                              |
|-------------------|------------------------------------------|
| 🧪 Unit Tests     | Corre en Node 18.x y 20.x en paralelo   |
| 🔗 Integration    | Corre HTTP tests con Supertest           |
| 📊 Coverage       | Genera reporte y lo sube como artefacto  |

## 🔌 Endpoints disponibles

### Users `/api/users`
| Método | Ruta          | Descripción        |
|--------|---------------|--------------------|
| GET    | /             | Listar todos       |
| GET    | /:id          | Obtener por id     |
| POST   | /             | Crear usuario      |
| PUT    | /:id          | Actualizar usuario |
| DELETE | /:id          | Eliminar usuario   |

### Products `/api/products`
| Método | Ruta           | Descripción          |
|--------|----------------|----------------------|
| GET    | /              | Listar todos         |
| GET    | /?category=x   | Filtrar por categoría|
| GET    | /:id           | Obtener por id       |
| POST   | /              | Crear producto       |
| PATCH  | /:id/stock     | Actualizar stock     |
| DELETE | /:id           | Eliminar producto    |
