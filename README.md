# MicroShop API Project

<!---  ## Diagram 1
![image](https://github.com/user-attachments/assets/1a47e1e0-58df-4993-b933-301ae2a614ba) --->

This project is a demonstration of a microservices-based architecture for an e-commerce application. It includes three services: Authentication, Orders, and Products. The services communicate asynchronously using RabbitMQ, making the architecture event-driven.

## Table of Contents


## Overview

This project is a proof-of-concept for implementing a scalable and maintainable microservices architecture using Node.js, Express.js, and MongoDB. The key idea is to separate concerns into different services that handle specific aspects of the application.

## Architecture

The architecture consists of three main services:

1. **Authentication Service**: Manages user authentication and authorization.
2. **Orders Service**: Manages order creation, tracking, and history.
3. **Products Service**: Handles product catalog management.

These services communicate asynchronously via RabbitMQ queues:

- **Product Queue**: Handles messages related to product updates or actions.
- **Orders Queue**: Handles messages related to order processing.

![image](https://github.com/user-attachments/assets/cd5883d0-5e4b-42bd-9a41-a70a55ca55f4)

### Why This Architecture?

- **Scalability**: Each service can be scaled independently based on load.
- **Maintainability**: Codebases are small and focused on a single responsibility.
- **Fault Tolerance**: Failure in one service does not bring down the entire system.
- **Flexibility**: New services can be added without impacting existing ones.

## Technologies Used

- **Node.js & Express.js**: Backend framework for building RESTful APIs.
- **MongoDB**: NoSQL database for data storage.
- **RabbitMQ**: Message broker for asynchronous communication between services.
- **Docker**: Containerization of services for consistent environments.
- **Docker Compose**: Tool for defining and running multi-container Docker applications.
- **Swagger**: API documentation and testing.

## Services

### Authentication Service

The Authentication Service handles:

- User registration and login.
- Token generation using JWT.
- Middleware for protecting routes in Orders and Products services.

### Orders Service

The Orders Service handles:

- Creating and managing orders.
- Listening to order-related events from RabbitMQ.
- Exposing API endpoints for order retrieval and management.

### Products Service

The Products Service handles:

- Managing product catalog (CRUD operations).
- Listening to product-related events from RabbitMQ.
- Exposing API endpoints for product information.

## Event-Driven Communication

The services use RabbitMQ for asynchronous communication. This decouples the services, allowing them to operate independently while still interacting through events.

- **Product Events**: 
  - Product created
  - Product updated
  - Product deleted
- **Order Events**:
  - Order created
  - Order updated
  - Order fulfilled

This setup ensures that services are only loosely coupled and can scale or fail independently without affecting the overall system.

## Docker and Containerization

Docker is used to containerize each service, ensuring consistency across different environments and simplifying deployment. Docker Compose manages the multi-container setup, allowing all services to be started with a single command.

### docker-compose.yml explanation:
- **Services**:

    - auth-db, products-db, and orders-db: MongoDB instances for each service, each in its own isolated network.
    - auth-service, products-service, and orders-service: The microservices responsible for authentication, product management, and order management, respectively. Each service has its own network and interacts with its corresponding MongoDB instance.
    - rabbitmq: The RabbitMQ broker used for handling the asynchronous communication between services.
- **Networks**:

    - Separate networks are created for each service, ensuring that communication is only allowed between services that need to interact directly.
    - queue-network is shared between RabbitMQ and services that need to publish or consume messages.
- **Volumes**:

    - Persistent storage is configured for the MongoDB instances to ensure data is retained even if the containers are restarted.
  
## Running the services
To build and run the services, simply use:
```bash
docker-compose up --build
```
This command will build the images, set up the containers, and start the entire application stack.

*Note: Make sure the ports are not allocated by other services on your OS.

### Accessing the services
Once the services are up, you can access them at the following URLs:

- **Authentication Service**: `http://localhost:${AUTH_SERVICE_PORT}`
- **Orders Service**: `http://localhost:${ORDER_SERVICE_PORT}`
- **Products Service**: `http://localhost:${PRODUCT_SERVICE_PORT}`
- **RabbitMQ Management Console (Web UI)**: `http://localhost:15672 (Default login: guest/guest)`

## Swagger Documentation
Each microservice has its own API documentation generated with Swagger. This allows you to test the API endpoints directly from the browser and see the available routes, request parameters, and responses.

- **Authentication Service**: `http://localhost:${AUTH_SERVICE_PORT}/api-docs`
- **Orders Service**: `http://localhost:${ORDER_SERVICE_PORT}/api-docs`
- **Products Service**: `http://localhost:${PRODUCT_SERVICE_PORT}/api-docs`

## Setup & Installation
To see the project in action, follow these steps:
1. Clone the repository:
```bash
git clone <repository-url>
```
2. Navigate to the project directory:
```bash
cd <project-directory>
```
3. Create a .env file for each service based on the provided .env.sample files.
4. Run the services using Docker Compose:
```bash
docker-compose up --build
```
5. Access the services through the URLs provided above, and try to send some requests.






