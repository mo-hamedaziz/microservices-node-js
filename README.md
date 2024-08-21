# MicroShop API Project

<!---  ## Diagram 1
![image](https://github.com/user-attachments/assets/1a47e1e0-58df-4993-b933-301ae2a614ba) --->

This project is a demonstration of a microservices-based architecture for an e-commerce application. It includes three services: Authentication, Orders, and Products. The services communicate asynchronously using RabbitMQ, making the architecture event-driven.

## Table of Contents

- [MicroShop API Project](#microshop-api-project)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Architecture](#architecture)
    - [Why This Architecture?](#why-this-architecture)
  - [Technologies Used](#technologies-used)
  - [Services](#services)
    - [Authentication Service](#authentication-service)
    - [Orders Service](#orders-service)
    - [Products Service](#products-service)
  - [Event-Driven Communication](#event-driven-communication)
  - [Diagram](#diagram)

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


## Diagram
![image](https://github.com/user-attachments/assets/cd5883d0-5e4b-42bd-9a41-a70a55ca55f4)






