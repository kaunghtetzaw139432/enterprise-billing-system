# 🛒 Enterprise Billing & E-Commerce Management System

![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)

A full-stack billing and e-commerce management system built with **React.js** for the frontend and **Spring Boot** for the backend. The application provides category management, user management, shopping cart, order processing,item management, payment handling,order history and sales dashboard functionality.

The system implements role-based access control, allowing administrators to manage the entire system while regular users can browse explore pages and place orders.

## 📌 Project Overview

This project is designed to simplify billing and e-commerce operations by providing a centralized platform for managing items, categories, customers, orders, and payments.

The application consists of two main parts:

- **Frontend:** React.js
- **Backend:** Spring Boot REST API

The frontend communicates with the backend through REST APIs, and data is stored in a MySQL database.

---

## Project Demo
https://github.com/user-attachments/assets/e6bddb13-44ce-496b-bc4f-f1376f736003

## ✨ Features

### 🔐 Authentication & Authorization

- User login and authentication
- Role-based access control
- Admin and User roles
- Protected routes
- Secure access to administrative features
- User session management

Administrators have full access to system management functionalities.

- Dashboard with sales and order statistics
- Manage categories
- Add and delete categories
- Manage items
- Add and delete items
- Manage user accounts
- View registered users
- Manage customer information
- View all orders
- Monitor payment status
- View sales and order summaries

### 👤 User Features

Regular users can access customer-related functionalities.

- Browse category
- Explore items by category
- Search for items in categories
- Add orders to shopping cart
- Update cart quantities
- Remove orders from cart
- Place orders
- Select payment methods
- View order history
- View Dashboard

### 📦 Category Management

- Create categories
- Upload category images
- Delete categories
- Display categories

### 🛍️ Item Management

- Create new items
- Delete items
- Manage item prices
- Manage item descriptions
- Upload item images
- Display available items

### 🛒 Shopping Cart

- Add items to cart
- Update item quantities
- Remove items from cart
- Calculate subtotal
- Calculate total amount

### 💳 Payment Management

Supported payment methods:

- Cash
- UPI
- Stripe (for payment testing and online payment integration)

Payment statuses:

- Pending
- Completed
- Failed

### 📋 Order Management

- Create customer orders
- Generate order IDs
- Store order details
- Track order status
- View recent orders
- View order history
- Track payment information

### 📊 Dashboard

The admin dashboard provides an overview of business operations, including:

- Today's sales
- Today's orders
- Recent orders
- Customer information
- Order amount
- Payment method
- Order status
- Order date and time

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Axios
- React Router DOM
- Bootstrap

### Backend

- Java 21+
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- REST API
### Database

- MySQL

### Payment Integration

- Stripe

### Development Tools

- Visual Studio Code
- Maven
- npm
- Git
- GitHub

---

## 🏗️ System Architecture

```text
┌─────────────────────────────┐
│       React Frontend│
││
│  Explore           │
│  Login / Dashboard │
│  Item / Category│
│  Shopping Cart     │
│  Order History     │
│  User Management   │
└──────────────┬──────────────┘
               │
               │ REST API
               │ HTTP / JSON
               ▼
┌─────────────────────────────┐
│      Spring Boot Backend│
│      │
│  Controllers  │
│  Services     │
│  Repositories │
│  Entities     │
│  Security     │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│        MySQL Database       │
│                             │
│  Users                      │
│  Categories                 │
│  Items                      │
│  Orders                     │
│  Order_Items                │                   
└─────────────────────────────┘
```

---

## 📂 Project Structure

```text
Spring boot and reactjs project/
│
├── billingsoftware/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── freelance/
│   │       │       └── billingsoftware/
│   │       │           ├── config/
│   │       │           ├── controllers/
│   │       │           ├── entities/
│   │       │           ├── filter/
│   │       │           ├── impls/
│   │       │           ├── io/
│   │       │           ├── repositories/
│   │       │           ├── services/
│   │       │           ├── util/
│   │       │           └── BillingsoftwareApplication.java
│   │       │
│   │       └── resources/
│   │           └── application.properties
│   │
│   ├── pom.xml
│   └── mvnw
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CartItems/
│   │   │   ├── CartSummary/
│   │   │   ├── Category/
│   │   │   ├── CategoryForm/
│   │   │   ├── CategoryList/
│   │   │   ├── CustomerForm/
│   │   │   ├── DisplayCategory/
│   │   │   ├── DisplayItems/
│   │   │   ├── Item/
│   │   │   ├── ItemForm/
│   │   │   ├── ItemList/
│   │   │   ├── Menubar/
│   │   │   ├── NotFound/
│   │   │   ├── OrderHistory/
│   │   │   ├── ProtectedRoute/
│   │   │   ├── ReceiptPopup/
│   │   │   ├── UserForm/
│   │   │   └── UserList/
│   │   │
│   │   ├── context/
        │   ├── AppContext/
│   │   ├── pages/
│   │   │   ├── Dashboard/
│   │   │   ├── Explore/
│   │   │   ├── Login/
│   │   │   ├── ManageCategory/
│   │   │   ├── ManageItems/
│   │   │   ├── ManageUsers/
│   │   │   └── OrderHistory/
│   │   ├── SearchBox/
│   │   │   ├── SearchBox/
│   │   │
│   │   ├── Service/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🔑 User Roles & Permissions

| Feature | Admin | User |
|---|:---:|:---:|
| Login | ✅ | ✅ |
| Dashboard | ✅ | ✅  |
| View Items | ✅ | ✅ |
| Search Items | ✅ | ✅ |
| Manage Categories | ✅ | ❌ |
| Manage Items | ✅ | ❌ |
| Manage Users | ✅ | ❌ |
| Add to Cart | ✅ | ✅ |
| Place Orders | ✅ | ✅ |
| View Order History | ✅ | ✅ |
| Manage Payments | ✅ | ✅ |

---

## 🔒 Security

The system uses role-based authorization to restrict access to administrative functionality.

- Authentication required for protected routes
- Admin-only access to category management
- Admin-only access to item management
- Admin-only access to user management
- Protected frontend routes
- Backend authorization for restricted endpoints
- Password security
- Input validation

> Authorization is enforced on the backend. Frontend route protection is used for user experience but is not a replacement for backend security.

---

## ⚙️ Installation & Setup

### Prerequisites

Install the following software before running the project:

- Java 21 or higher
- Node.js 18 or higher
- npm
- MySQL Server
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/kaunghtetzaw139432/enterprise-billing-system.git
```

```bash
cd enterprise-billing-system
```

---

### 2. Configure MySQL Database

Create a MySQL database:

```sql
CREATE DATABASE billing_app;
```

Update the backend configuration in:

```text
backend/src/main/resources/application.properties
```

Example configuration:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/billing_app
spring.datasource.username=root
spring.datasource.password=your_password

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=3000
```

Update the database username and password according to your MySQL configuration.

---

### 3. Run the Backend

Navigate to the backend directory:

```bash
cd backend
```

Run the Spring Boot application using Maven:

```bash
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

Or run the application using IntelliJ IDEA.

Backend server:

```text
http://localhost:3000
```

---

### 4. Run the Frontend

Open another terminal:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend application:

```text
http://localhost:5173
```

---

## 🔌 API Endpoints

The backend provides REST APIs for authentication, users, categories, items, orders, and payments.

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/login` | User authentication |


### Category

| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/categories` | Get all categories |
| POST | `//admin/categories` | Create category |
| DELETE | `/admin/categories/{categoryId}` | Delete category |

### Items

| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/items` | Get all items |
| POST | `/admin/items/{itemId}` | Create item |
| DELETE | `/admin/items/{itemId}` | Delete item |

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/users` | Get users |
| POST | `/admin/register` | Create user |
| DELETE | `/admin/users/{id}` | Delete user |

### Orders

| Method | Endpoint | Description |
|---|---|---|
| POST | `/orders` | Create order |
| GET | `/orders` | Get orders |
| DELETE  | `/orders/{orderId}` | Delete Order |
| GET | `/orders/latest` | Get Lastest order history |

### Payment

| Method | Endpoint | Description |
|---|---|---|
| POST | `/payments/create-order` | Create Stripe Order |
| POST | `/payments/verify` | Verify Payment |

## 🗄️ Database Entities

The system uses relational database entities to store and manage application data.

### User

Stores user account information.
- Id
- UserId
- Email
- Password
- Role
- Name
- CreatedAt
- UpdatedAt

### Category

Stores product category information.
 - Id
- CategoryId
- Name
- Description
- BgColor
- ImgUrl
- CreatedAt
- UpdatedAt

### Item

Stores product information.
- Id
- ItemId
- Name
- Price
- Description
- ImgUrl
- Category
- CreatedAt
- UpdatedAt

### Order

Stores order information.
- Id
- OrderId
- CustomerName
- Phone Number
- Subtotal
- Tax
- GrandTotal
- CreatedAt
- Items 
- PaymentDetails 
- PaymentMethod 

### Order Item Details

Stores Items included in an order.

- Id
- ItemId
- Name
- Price
- Quantity

### Payment

Stores payment-related information.

- Order ID
- Payment method
- Payment status
- Amount

---

### Dashboard

Displays today's sales, today's orders, and recent order information.

### Explore Products

Allows users to browse available items and categories.

### Manage Categories

Admin interface for creating and deleting categories.

### Manage Items

Admin interface for managing items and item information.

### Manage Users

Admin interface for managing user accounts.

### Order History

Displays previous customer orders and payment information.

---

## 🚀 Future Improvements

- JWT-based authentication
- Improved role and permission management
- Advanced items search and filtering
- Improved payment integration

---

## 👨‍💻 Developer

Developed as a Full-Stack Web Application using React.js, Spring Boot, and MySQL.

---

## 📄 License

This project is developed for educational and portfolio purposes.
