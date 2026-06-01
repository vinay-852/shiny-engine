# StockPilot Control

Production-ready full-stack inventory and order management project with a modular React frontend, FastAPI backend, PostgreSQL database, and Docker Compose orchestration.

## Stack

- Frontend: React, Vite, JavaScript
- Backend: Python, FastAPI, SQLAlchemy
- Database: PostgreSQL
- Containers: Docker, Docker Compose

## Features

- Product CRUD with unique SKU validation and non-negative stock validation
- Customer create/list/detail/delete with unique email validation
- Order create/list/detail/delete
- Backend-calculated order totals
- Inventory reduction on order creation
- Inventory restoration when orders are cancelled
- Insufficient-stock protection
- Responsive dashboard showing total products, customers, orders, and low stock products

## Project Structure

```text
.
├── backend
│   ├── app
│   │   ├── api
│   │   ├── core
│   │   ├── db
│   │   ├── models
│   │   └── schemas
│   ├── Dockerfile
│   └── requirements.txt
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   └── hooks
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## Local Setup With Docker Compose

1. Create an environment file:

```bash
cp .env.example .env
```

2. Start all services:

```bash
docker compose up --build
```

3. Open the app:

- Frontend: `http://localhost:3000`
- Backend API docs: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/health`

## Backend API

### Products

- `POST /products`
- `GET /products`
- `GET /products/{id}`
- `PUT /products/{id}`
- `DELETE /products/{id}`

### Customers

- `POST /customers`
- `GET /customers`
- `GET /customers/{id}`
- `DELETE /customers/{id}`

### Orders

- `POST /orders`
- `GET /orders`
- `GET /orders/{id}`
- `DELETE /orders/{id}`

## Environment Variables

### Backend

- `DATABASE_URL`: SQLAlchemy PostgreSQL connection string
- `CORS_ORIGINS`: Comma-separated frontend origins allowed by the API

### Frontend

- `VITE_API_URL`: API base URL. Use `/api` for Docker Compose, or the deployed backend URL for static hosting.

### Database

- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`

## Deployment Guide

### Backend on Render

1. Create a PostgreSQL database on Render.
2. Create a Web Service from this repository.
3. Set root directory to `backend`.
4. Use Docker runtime.
5. Set environment variables:
   - `DATABASE_URL` from the Render PostgreSQL internal connection string
   - `CORS_ORIGINS` to the deployed frontend URL
6. Deploy and confirm `/health` returns `{"status":"ok"}`.

### Frontend on Vercel

1. Import the repository into Vercel.
2. Set root directory to `frontend`.
3. Set environment variable:
   - `VITE_API_URL` to the deployed backend URL, for example `https://your-api.onrender.com`
4. Deploy and confirm product/customer/order requests reach the backend.

## Submission Checklist

- GitHub repository link: add after pushing the project.
- Docker Hub backend image link: build and push `backend/Dockerfile`.
- Live frontend deployment URL: add after Vercel or Netlify deployment.
- Live backend API URL: add after Render, Railway, or Fly.io deployment.

## Build Backend Image

```bash
docker build -t your-dockerhub-user/stockpilot-backend:latest ./backend
docker push your-dockerhub-user/stockpilot-backend:latest
```
