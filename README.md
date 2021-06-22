# How to run tests

**Unit/Component test (supertest with Mocha)**  
To run integration tests for API, what you have to do is npm test under root directory

- `pwd` Check if you are in `...\project-t05-breakout-room-3`
- `npm test` to run the test, if this does not work, you can also `npx mocha`

To run functional tests for API, what you have to do is npm test under root directory

**Component test (Cypress)**

- `pwd` Check if you are in `...\project-t05-breakout-room-3\`
- `cd .\client\` to Move to Front-End project folder
- Run `npx cypress open` and select which ever test you like OR
- `npm run cy:run` to run the test, if this does not work, you can also `npm cypress run`

# Breakout Room 3 - Project (Frontend)

recommend to install plugins:

./node_modules/.bin/cypress run

# Breakout Room 3 - Project (Backend)

## Table of Contents

- [Breakout Room 3 - Project (Frontend)](#breakout-room-3---project-frontend)
- [Breakout Room 3 - Project (Backend)](#breakout-room-3---project-backend)
  - [Table of Contents](#table-of-contents)
  - [Background](#background)
  - [Running this Project Locally](#running-this-project-locally)
  - [MongoDB Access details](#mongodb-access-details)
  - [Postman Routes](#postman-routes)
  - [Front End](#front-end)

## Background

**Summary**  
For this project, we are hosting our live server hosted on Heroku with a valid URL with the features listed below.  
The backend of the app is connected with mongoDB using Mongoose. This will allow us to fetch data that we want from the database.  
Due to privacy and security, we have implemented such features to not disclose vendors/customer's details from a simple GET route.

**Design**  
Our backend design solution is based on Model-View-Controller pattern.  
In our model, we have defined our data structure so that we can distinguish how we update the data.
We have not specifically designed our view because we do not have our front end design at the moment,
but the controller for manipulating the data is implemented and the description to that can be viewed from [this](#postman-routes)

## Running this Project Locally

- **Clone this repo:**  
  `git clone https://github.com/INFO30005-2021-SM1/project-t05-breakout-room-3.git`

- **Install Dependencies:**  
  `npm install`

- **Start the project:**  
  `npm start`

## MongoDB Access details

| Field    | Details                                                                                     |
| -------- | ------------------------------------------------------------------------------------------- |
| URL      | mongodb+srv://admin:admin@br3.jdd2m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority |
| Username | admin                                                                                       |
| Password | admin                                                                                       |

## Postman Routes

1. **Get menu list**

   Under Menu/Get menu

   - GET route receives menu as JSON file displaying every item in menu with their name, price, image url and detail description

2. **View menu detail**

   Under Menu/Get menu item

   - GET specific menu item by adding item's name in route
   - e.g /menu/latte, which will display item's name, price, image url and detail description

3. **Customer adds new order by requesting a snack**

   Under Customer/Start new order

   - Example JSON in body:

   ```javascript
    {
        "CustomerId": ObjectId
        "VendorId": ObjectId
        "foodItems": {
        "latte": 2,
        "cappuccino": 1 },
    }
   ```

4. **Setting van status:**

   Under Vendor/Set van status

   - PUT route sends a json in the body
   - Example JSON in body:

   ```javascript
   {
       "location": "outside Flinders Station",
       "status":"open"
   }
   ```

5. **Show list of all outstanding orders:**

   Under Order/Get all outstanding orders

   - All orders with "status" that is not "fulfilled" will be displayed

6. **Mark an order as "fulfilled":**

   Under Order/Update order

   - The new order made has status set as "pending" by default. We take an order id param from the request, then update the status of the identified order. The status update request body contains:

   ```javascript
   {
       "status": "fulfilled"
   }
   ```

## Front End

Dummy Customer login:

-email address: john@gmail.com
-password: 1234567a

Dummy Vendor login:

-vanname: Coffee2Go
-password: hihi

