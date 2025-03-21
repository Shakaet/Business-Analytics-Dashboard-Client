# DataPulse - Business Analytics Dashboard



## :rocket: Project Overview

**DataPulse** is a comprehensive business analytics dashboard designed to manage user transactions and revenue data. It offers two panels: **User** and **Admin**. The **User** panel allows individuals to add, view, and manage their transactions, while the **Admin** panel provides more advanced features such as managing user roles, deleting users, and managing revenue (adding, updating, and viewing revenue). Both user types can update their profiles, and they can view graphical representations of user, revenue, and transaction data in the dashboard's home section.

---

## :link: Live Link

[DataPulse Live Demo](https://melodious-treacle-a31ff2.netlify.app/) 

---

## :clipboard: Project Setup and Installation Steps

Follow these instructions to set up and run **DataPulse** locally.


##  API Documentation

  ### POST   https://business-dashboard-server.vercel.app/revenue
  ### POST   https://business-dashboard-server.vercel.app/transactions
  ### GET    https://business-dashboard-server.vercel.app/alltransection
  ### DELETE https://business-dashboard-server.vercel.app/revenue/id
  ### GET    https://business-dashboard-server.vercel.app/revenue
  ### PATCH  https://business-dashboard-server.vercel.app/revenue/id
  ### GET    https://business-dashboard-server.vercel.app/revenue/id
  ### DELETE https://business-dashboard-server.vercel.app/tansection/id
  ### PATCH  https://business-dashboard-server.vercel.app/transactions/id
  ### GET    https://business-dashboard-server.vercel.app/users/admin/email
  ### GET    https://business-dashboard-server.vercel.app/transection/email
  ### GET    https://business-dashboard-server.vercel.app/users/user/email
  ### DELETE https://business-dashboard-server.vercel.app/users/id
  ### PATCH  https://business-dashboard-server.vercel.app/users/id
  ### GET    https://business-dashboard-server.vercel.app/users
  ### POST   https://business-dashboard-server.vercel.app/users
 


  


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

run the backend https://business-dashboard-server.vercel.app/
