# Paperbox API

![Node.js](https://img.shields.io/badge/Node.js-API-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-REST-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

Paperbox API is a RESTful API for managing stationery products in memory. It was built with Express.js and TypeScript as part of a Web Development assignment focused on CRUD operations, HTTP methods, JSON responses, error handling, and nested object manipulation.

## Features

- RESTful CRUD routes for stationery products
- In-memory data storage using a TypeScript array
- Nested manufacturer and address structure
- JSON request and response format
- Basic error handling with HTTP status codes
- Optional seed mode with sample stationery products

## Tech Stack

- Node.js
- Express.js
- TypeScript
- ts-node
- cross-env

## Product Model

Each product follows this structure:

```json
{
  "id": 1,
  "nome": "Caderno universitario 10 materias",
  "preco": 24.9,
  "fabricante": {
    "nome": "Tilibra",
    "endereco": {
      "cidade": "Bauru",
      "pais": "Brasil"
    }
  }
}
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/ericsousa/paperbox-api.git
cd paperbox-api
```

Install dependencies:

```bash
npm install
```

Run the API in development mode:

```bash
npm run dev
```

Run the API with sample products:

```bash
npm run dev:seed
```

The server will run at:

```txt
http://localhost:3000
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts the API with `ts-node` |
| `npm run dev:seed` | Starts the API with sample in-memory products |
| `npm run build` | Compiles TypeScript into JavaScript |
| `npm start` | Runs the compiled app from `dist/app.js` |

## API Overview

Base URL:

```txt
http://localhost:3000/api
```

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/` | Returns API information |
| `GET` | `/api/products` | Lists all products |
| `GET` | `/api/products/:id` | Finds a product by ID |
| `POST` | `/api/products` | Creates a new product |
| `PUT` | `/api/products/:id` | Updates an existing product |
| `DELETE` | `/api/products/:id` | Deletes a product |

## Example Requests

### Create Product

```http
POST /api/products
Content-Type: application/json
```

```json
{
  "id": 11,
  "nome": "Caneta gel preta",
  "preco": 7.9,
  "fabricante": {
    "nome": "Pilot",
    "endereco": {
      "cidade": "Sao Paulo",
      "pais": "Brasil"
    }
  }
}
```

### List Products

```http
GET /api/products
```

### Get Product By ID

```http
GET /api/products/1
```

### Update Product

```http
PUT /api/products/1
Content-Type: application/json
```

```json
{
  "nome": "Caderno universitario capa dura",
  "preco": 29.9,
  "fabricante": {
    "nome": "Tilibra",
    "endereco": {
      "cidade": "Bauru",
      "pais": "Brasil"
    }
  }
}
```

### Delete Product

```http
DELETE /api/products/1
```

## HTTP Status Codes

| Status | Meaning |
| --- | --- |
| `200` | Successful request |
| `201` | Product created successfully |
| `400` | Invalid request data |
| `404` | Product not found |
| `500` | Internal server error |

## In-Memory Storage

This project does not use a database. Products are stored in memory using an array, so all data is reset whenever the server restarts.

To start the API with 10 sample products, use:

```bash
npm run dev:seed
```

## Assignment Context

This project was created for a Web Development course activity about building REST APIs with Express.js and TypeScript.

The main goals are:

- Implement a complete CRUD API
- Use proper HTTP methods
- Return JSON responses
- Apply TypeScript typing
- Handle errors with appropriate status codes
- Work with nested objects
- Keep data in memory without using a database

## Author

Developed by [Eric Sousa](https://github.com/ericsousa).
