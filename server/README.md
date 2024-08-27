# Softlets-Trail App Backend

>

## Table of Contents

- [Softlets-Trail App Backend](#softlets-trail-app-backend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation and Setup](#installation-and-setup)
    - [Prerequisites](#prerequisites)
    - [Environment Setup](#environment-setup)
    - [Running the Application](#running-the-application)
  - [Usage](#usage)
    - [API Endpoints](#api-endpoints)
      - [User Authentication and Profile Management](#user-authentication-and-profile-management)
    - [Postgress Schama Crate Table](#postgress-schama-crate-table)

## Features

- **User Authentication**: Secure registration and login for users.
- **Security**: Implemented with secure authentication and authorization to protect user data. cors protection use helmet and cors options

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Testing**: playwright for unit and integration tests.

## Installation and Setup

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- PostgreSQL installed and running

### Environment Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/abdulvahabaa/softlets-trail.git
   cd softlets-trail
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create an `.env` file in the root directory and add the following:

   ```env
   PORT=9002
   PG_USER=postgres
   PG_HOST=localhost
   PG_DATABASE=<Your DataBase Name>
   PG_PASSWORD=<Your Password>
   PG_PORT=5432
   JWT_SECRET=a7f8c4f56a8d4c3b9f7e2a9b7e0d2f3c5b4a6f7c8d1e2b3c4a5b6d7c8f9e0a1b

   ```

### Running the Application

1. Start the backend server:

   ```bash
   npm run devStart
   ```

2. The API should now be running on `http://localhost:9002`.

## Usage

### API Endpoints

Refer to the following sections for detailed information on each API endpoint.

#### User Authentication and Profile Management

- **Register a new user**: `POST /auth/signup`
- **Login a user**: `POST /auth/login`
- **LogOut a user**: `POST /auth/logout`
- **Get user profile**: `GET /user/:id`

### Postgress Schama Crate Table

```
CREATE TABLE IF NOT EXISTS public.users
(
   id serial PRIMARY KEY,
   name character varying(255) NOT NULL,
   email character varying(255) NOT NULL UNIQUE,
   password character varying(255) NOT NULL,
   userid character varying(255) NOT NULL UNIQUE,
   created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
```
