# BIOX - Recipes

This project was developed as part of a technical assessment. It is a simple API for managing a recipe catalog, allowing adding and retrieving recipes. Built with Node.js, TypeScript, and NestJS.

## Prerequisites

Before you begin, ensure you have met the following requirements:
* Node.js (v22.10.7 or higher recommended)
* pnpm package manager

## Getting Started

To get a local copy up and running, follow these simple steps.

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/edcnogueira/biox-recipe.git
   ```
2. Navigate to the project directory:
   ```sh
   cd biox-recipe
   ```
3. Install NPM packages using pnpm:
   ```sh
   pnpm install
   ```

### Running the Project

1.  **Development Mode:**
    To run the application in development mode with hot-reloading:
    ```sh
    pnpm run start:dev
    ```
    The application will typically be available at `http://localhost:3000` (or the port you've configured).

2.  **Production Build:**
    To build the application for production:
    ```sh
    pnpm run build
    ```
    Then, to start the production build:
    ```sh
    pnpm run start:prod
    ```

3.  **Running Tests:**
    To execute the test suite:
    ```sh
    pnpm run test
    ```

## Deployment

The application is deployed and accessible at the following URL:

**https://biox-recipe.onrender.com**

### Platform Choice: Render

## API Routes

This section describes the available API endpoints.

*(Please replace the following examples with your actual routes, HTTP methods, expected request bodies, and example responses. Be as detailed as possible.)*

### Example: Get All Items

*   **URL:** `/recipes`
*   **Method:** `GET`
*   **Description:** Retrieves a list of all items.
*   **Success Response:**
    *   **Code:** 200 OK
    *   **Content:**
        ```json
        [
          { "id": "uuid-1", "name": "Item 1", "description": "Description for item 1" },
          { "id": "uuid-2", "name": "Item 2", "description": "Description for item 2" }
        ]
        ```

### Example: Create New Item

*   **URL:** `/recipes`
*   **Method:** `POST`
*   **Description:** Creates a new item.
*   **Request Body:**
    ```json
    {
      "name": "New Item",
      "description": "Description for the new item"
    }
    ```
*   **Success Response:**
    *   **Code:** 201 Created
    *   **Content:**
        ```json
        {
          "id": "new-uuid",
          "name": "New Item",
          "description": "Description for the new item"
        }
        ```
*   **Error Response:**
    *   **Code:** 400 Bad Request
    *   **Content:**
        ```json
        {
          "statusCode": 400,
          "message": ["name should not be empty", "description should not be empty"],
          "error": "Bad Request"
        }
        ```

### Example: Get Item by ID
*   **URL:** `/recipes/:id`
*   **Method:** `GET`
*  **Description:** Retrieves a specific item by its ID.
*  **URL Params:**
   *   `id=[string]` - The ID of the item to retrieve.
   * **Success Response:**
    *   **Code:** 200 OK
    *   **Content:**
        ```json
        {
          "id": "uuid-1",
          "name": "Item 1",
          "description": "Description for item 1"
        }
        ```

## Future Improvements

Here are some ideas for future enhancements and features:

- [ ] Add Swagger documentation for the API.
- [ ] Improve error handling and logging.
- [ ] Better TypeScript practices in the application
- [ ] Dockerize the application for easier deployment.
- [ ] Create more endpoints for updating and deleting recipes.
- [ ] Add more comprehensive input validation.
- [ ] Implement pagination for the list of recipes.
- [ ] Write more extensive unit and integration tests.