# machineTaskApi
The platform To Create task model.

## Description

This project is made in nodejs and mongoDB.

## Clone url

-- clone the repository

`https://github.com/nadeemabdul93/machineTaskApi.git`

## Installation process

Create project directory and clone the project. 
after cloning you need to create .env file.
.env
add environment variable in this file accordingly.

Now install the packages by running the below command

npm install

## Running the app
# To run at locally

node index.js

## api URL
htpp://localhost:3000/machineTestApi/

## use static token for register and login for api
qtPet#@swagger

# Note
 After running one of the above APIs, you need to update the static token from the token received in the response.
 If you try to call an API without logging in, you will get a "token not valid" message.

## Run unit tests
 npm test

# Test Directory Structure:
project-root/
├── debuglogs/
│   ├── api/          # Logs for API requests for each day
│   ├── exceptions/   # Logs for compile-time errors for each day
├── src/
│   ├── api/
│   │   ├── task/
│   │   │   ├── controller.js    # Controller logic for tasks
│   │   │   ├── index.js         # Routes for tasks
│   │   ├── user/
│   │   │   ├── controller.js    # Controller logic for users
│   │   │   ├── index.js         # Routes for users
│   │   │   ├── services.js      # Check if an email exists in the database
│   ├── helper/
│   │   ├── common/
│   │   │   ├── auth.js          # Validate static token
│   │   │   ├── helper.js        # Common functions like task status, and creating JWT tokens
│   │   │   ├── JWT.middleware.js # Validate authentication token
│   ├── config/
│   │   ├── db.js                # Database connectivity
│   ├── language/
│   │   ├── lang_en.js           # Localization
│   ├── models/
│   │   ├── task.js              # Task model definition for unit testing
│   │   ├── taskSchema.js        # Task model definition with Mongoose
│   │   ├── userSchema.js        # User model definition
│   ├── response/
│   │   ├── user.js              # Structured user response
├── test/
│   ├── integration/
│   │   ├── taskApi.spec.js      # Integration tests for Task API
│   ├── unit/
│   │   ├── taskModel.spec.js    # Unit tests for Task model
├── .env                         # Database, server, and key configurations
├── .gitignore                   # Files to ignore in the repository
├── index.js                     # Main file to run the application
├── logger.js                    # Logger response handling in catch blocks
├── package.json                 # All packages used in the project
├── swagger.json                 # API formatting

