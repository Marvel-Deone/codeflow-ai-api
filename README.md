# CodeFlow AI API

A production-ready REST API built with NestJS, Prisma, PostgreSQL, and JWT authentication. This project demonstrates clean architecture, scalable backend practices, and modern development workflows.

---

## Features

- JWT Authentication
- User Registration & Login
- User Management
- Role-Based Access Control (RBAC)
- Global Validation
- Global Exception Handling
- Standardized API Responses
- Prisma ORM
- PostgreSQL
- Swagger API Documentation
- Health Check Endpoint
- CI with GitHub Actions

---

## Architecture

The project follows a modular architecture inspired by Clean Architecture principles.

```
src/
├── common/
├── config/
├── infrastructure/
├── modules/
│   ├── auth/
│   ├── users/
│   └── health/
└── main.ts
```

Each feature is organized into its own module with a clear separation of:

- Controller
- Service
- Repository
- DTOs
- Mappers

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| NestJS | Backend Framework |
| Prisma | ORM |
| PostgreSQL | Database |
| JWT | Authentication |
| Passport | Authentication Strategy |
| Swagger | API Documentation |
| GitHub Actions | Continuous Integration |

---

## Folder Structure

```
src/
├── common/
├── config/
├── infrastructure/
├── modules/
│   ├── auth/
│   ├── users/
│   └── health/
└── main.ts
```

---

## Installation

```bash
git clone <repository-url>

cd codeflow-ai-api

npm install
```

---

## Environment Variables

Create a `.env` file from `.env.example`.

```env
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=1d
PORT=3000
```

---

## Running Locally

```bash
npm run start:dev
```

---

## API Documentation

After starting the application, Swagger is available at:

```
http://localhost:3000/docs
```

---

## Running Tests

```bash
npm run test
```

Coverage

```bash
npm run test:cov
```

---

## Future Improvements

- Refresh Token Authentication
- Email Verification
- Password Reset
- Redis Caching
- Rate Limiting
- Role & Permission Management
- Integration Tests
- Kubernetes Deployment

---

## License

MIT
