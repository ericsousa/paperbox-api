# 📦 Paperbox API

A simple and functional RESTful API developed in **TypeScript** with **Express.js** for managing stationery products in memory.

This project was created as part of a Web Development assignment focused on CRUD operations, HTTP methods, JSON responses, TypeScript typing, error handling, and nested objects.

## 🚀 Features

- ✅ Complete CRUD for stationery products.
- ✅ Product listing and search by ID.
- ✅ Product creation with optional automatic ID generation.
- ✅ Product update and deletion.
- ✅ In-memory data storage using an array.
- ✅ Nested manufacturer and address structure.
- ✅ Validation for duplicated IDs, invalid prices, manufacturer data, city, and country.
- ✅ Optional seed mode with 10 sample stationery products.

## 🛠️ Technologies Used

- **TypeScript**: Main language with static typing.
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework used to build the REST API.
- **ts-node**: Runs TypeScript files during development.
- **cross-env**: Handles environment variables across operating systems.

## 📚 Product Structure

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

## ▶️ How to Run

Clone the repository:

```bash
git clone https://github.com/ericsousa/paperbox-api.git
cd paperbox-api
```

Install dependencies:

```bash
npm install
```

Start the API:

```bash
npm run dev
```

Start the API with sample products:

```bash
npm run dev:seed
```

The server runs at:

```txt
http://localhost:3000
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/` | API information |
| `GET` | `/api/products` | List all products |
| `GET` | `/api/products/:id` | Find a product by ID |
| `POST` | `/api/products` | Create a new product |
| `PUT` | `/api/products/:id` | Update a product |
| `DELETE` | `/api/products/:id` | Delete a product |

## 🧪 Example Request

```http
POST /api/products
Content-Type: application/json
```

```json
{
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

## 📌 Notes

- This project does not use a database.
- All products are stored in memory and are reset when the server restarts.
- A Postman collection can be used to test all CRUD routes.
- The API uses JSON for all request and response bodies.
