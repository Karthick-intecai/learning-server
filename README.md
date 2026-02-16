# New Learning Project

## Project Overview

This project is a backend API designed for managing products and files. It provides a robust set of endpoints for creating, reading, updating, and deleting products, as well as handling file uploads and deletions. The application is built using Node.js, Express, and TypeScript, with MongoDB as the database.

Key features include:
- **Product Management**: Sequential IDs, soft and hard deletes, and strict validation.
- **File Management**: Uploading and deleting files from both the database and the filesystem.
- **Validation**: Comprehensive input validation using Zod.

## Setup Steps

1.  **Clone the Repository**:
    ```bash
    git clone <repository_url>
    cd new-learning
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

## Environment Configuration

Create a `.env` file in the root directory with the following configuration:

```env
PORT=3500
MONGODB_URI=mongodb://localhost:27017/new-learning
```

- `PORT`: The port on which the server will run (default: 3500).
- `MONGODB_URI`: The connection string for your MongoDB instance.

## API Documentation

### Products

- **Get All Products**
    - `GET /products`
    - Returns a paginated list of active products.

- **Get Product by ID**
    - `GET /products/:id`
    - Returns details of a specific product.

- **Create Product**
    - `POST /products`
    - Body:
        ```json
        {
            "productName": "String (min 3 chars)",
            "productPrice": "Number (positive)",
            "image": "String (path from upload)",
            "description": "String (min 10 chars, required)"
        }
        ```

- **Update Product**
    - `PUT /products/:id`
    - Updates product details.

- **Soft Delete Product**
    - `DELETE /products/:id`
    - Marks a product as deleted without removing it from the database.

- **Hard Delete Product**
    - `DELETE /products/hard/:id`
    - Permanently removes a product from the database.

### Files

- **Upload File**
    - `POST /files`
    - Form-data: `file` (File object)
    - Returns: `{ "fileName": "...", "filePath": "..." }`

- **Delete File**
    - `DELETE /files/:fileName`
    - Deletes the file record and removes the file from the disk.
