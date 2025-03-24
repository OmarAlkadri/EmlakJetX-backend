# Real Estate Listings Backend

## Project Overview

This is the backend application for the **Real Estate Listings** project, built with **NestJS** and **Fastify**. It provides a GraphQL API using **MongoDB** as the database.

## Features

- **User Authentication** (Register/Login using JWT)
- **Role-based Access Control** (Admin, User, etc.)
- **Property Listings** (Create, View, Update, Delete)
- **Search & Filtering** (Location, Price, Number of Rooms, etc.)
- **Favorites System** (Save and manage favorite listings)
- **GraphQL API** for optimized data fetching
- **Fastify Integration** for improved performance

## Technologies Used

- **NestJS** (Node.js framework)
- **Fastify** (High-performance HTTP server)
- **GraphQL** (Apollo Server for API communication)
- **MongoDB** (Database for storing listings and users)
- **Mongoose** (ODM for MongoDB)
- **JWT Authentication** (Token-based authentication)
- **pnpm** (Package manager for efficiency and speed)

## Installation & Setup

### Prerequisites

Make sure you have the following installed:

- Node.js (>= 16.x)
- pnpm (>= 8.x)
- MongoDB (local or cloud instance)

### Clone the Repository

```sh
git clone https://github.com/yourusername/real-estate-backend.git
cd real-estate-backend
```

### Install Dependencies

```sh
pnpm install
```

### Environment Variables

Create a `.env` file in the root directory and configure the following:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/real-estate
JWT_SECRET=your_jwt_secret
```

### Running the Development Server

```sh
pnpm run start:dev
```

The API will be available at [http://localhost:4000/graphql](http://localhost:4000/graphql).

## Project Structure

```bash
src/
├── config/ (Environment & Application Configurations)
├── domain/ (Entities, Value Objects, Aggregates, Repositories)
├── application/ (Use Cases, DTOs, Interfaces)
├── infrastructure/ (Database, Repositories, External Services)
├── presentation/ (GraphQL Resolvers, Controllers, Middlewares)
├── shared/ (Utilities, Constants, Types)
├── main.ts (Application Entry Point)
└── app.module.ts (Root Module)
```

## API Integration

The backend provides a **GraphQL API** with the following example query:

```graphql
query GetListings {
  listings {
    id
    title
    price
    location
  }
}
```

## Running Tests

```sh
# Unit tests
pnpm run test

# End-to-end tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov
```

## Deployment

For production deployment, use:

```sh
pnpm run build
pnpm run start:prod
```

You can deploy this app on **Docker**, **Railway.app**, or any cloud provider.

## License

This project is licensed under the MIT License.
