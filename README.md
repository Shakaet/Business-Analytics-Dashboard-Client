# DataPulse - Business Analytics Dashboard

![DataPulse Logo]

## :rocket: Project Overview

**DataPulse** is a comprehensive business analytics dashboard designed to manage user transactions and revenue data. It offers two panels: **User** and **Admin**. The **User** panel allows individuals to add, view, and manage their transactions, while the **Admin** panel provides more advanced features such as managing user roles, deleting users, and managing revenue (adding, updating, and viewing revenue). Both user types can update their profiles, and they can view graphical representations of user, revenue, and transaction data in the dashboard's home section.

---

## :link: Live Link

[DataPulse Live Demo](#) *(Replace with your actual live link)*

---

## :clipboard: Project Setup and Installation Steps

Follow these instructions to set up and run **DataPulse** locally.


## : API Documentation

  # POST   http://localhost:3000/revenue
  # POST   http://localhost:3000/transactions
  # GET    http://localhost:3000/alltransection
  # DELETE http://localhost:3000/tansection/id
  # DELETE http://localhost:3000/revenue/id
  # GET    http://localhost:3000/revenue
  # PATCH  http://localhost:3000/revenue/id
  # GET    http://localhost:3000/revenue/id
  # DELETE http://localhost:3000/tansection/id
  # PATCH  http://localhost:3000/transactions/id

  


### 1. Clone the Repository
```bash
git clone <repository-url>
cd DataPulse
npm install
cd server # If your backend is in a separate folder
npm install

.env variable
MONGO_URI=<your-mongo-db-uri> (backend)

FIREBASE_API_KEY=<your-firebase-api-key> (frontend)

VITE_image_Hosting_key=<your-imgBB-api-key> (frontend)


For Frontend run:
npm run dev 

run the frontend http://localhost:5173/

For Backend run:

node index.js/nodemon index.js

run the backend http://localhost:3000/
