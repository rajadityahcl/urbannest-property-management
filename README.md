UrbanNest Property Management System
PostgreSQL + FastAPI + React + JWT Authentication
Project Overview

UrbanNest is a full-stack Property Management System designed to streamline the management of residential and commercial properties. The platform enables property administrators to manage properties, units, leases, rent payments, and maintenance requests while allowing tenants to interact with the system through a secure web portal.

The application utilizes:

PostgreSQL for relational database management
FastAPI for backend API development
React.js for frontend user interface
JWT Authentication for secure login and authorization
SQLAlchemy ORM for database interactions
Features
Property Administrator
User Management
Register and manage users
Assign roles (Admin / Tenant)
View tenant profiles
Property Management
Add properties
Update property information
Remove properties
View all managed properties
Unit Management
Add rental units
Update unit status
Track occupancy
Lease Management
Create lease agreements
Assign tenants to units
Manage lease lifecycle
Rent Management
Track rent payments
View payment history
Monitor overdue payments
Maintenance Management
Review maintenance requests
Update request status
Track issue resolution
Tenant Portal
Authentication
Secure registration
Secure login using JWT
Property Information
View assigned property
View unit information
Maintenance Requests
Submit maintenance requests
Track request status
Rent Tracking
View payment history
Monitor outstanding rent
Technology Stack
Layer	Technology
Frontend	React.js
Backend	FastAPI
Authentication	JWT
ORM	SQLAlchemy
Database	PostgreSQL
API Documentation	Swagger UI
Version Control	GitHub
Deployment	Render / Netlify / Neon
Project Architecture
React Frontend
      │
      ▼
FastAPI Backend
      │
      ▼
SQLAlchemy ORM
      │
      ▼
PostgreSQL Database
Project Structure
urbannest-postgres/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   ├── auth.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── Login.jsx
│       ├── Register.jsx
│       ├── Dashboard.jsx
│       ├── api.js
│       └── App.css
│
├── database/
│   ├── schema.sql
│   ├── seed_data.sql
│   └── queries.sql
│
├── docs/
│   ├── ERD.png
│   ├── DataDictionary.xlsx
│   ├── Project_Report.docx
│   └── Presentation.pptx
│
└── README.md
Database Schema
Core Tables
Users

Stores system users.

users

Fields:

user_id
full_name
email
password_hash
role
phone
created_at
Properties

Stores property information.

properties

Fields:

property_id
admin_id
property_name
address
city
state
zipcode
created_at
Units

Stores rental units.

units

Fields:

unit_id
property_id
unit_number
rent_amount
status
Leases

Stores lease agreements.

leases

Fields:

lease_id
tenant_id
unit_id
start_date
end_date
monthly_rent
status
Rent Payments

Stores payment records.

rent_payments

Fields:

payment_id
lease_id
amount
payment_date
payment_status
created_at
Maintenance Requests

Stores maintenance tickets.

maintenance_requests

Fields:

request_id
tenant_id
unit_id
issue_title
issue_description
priority
status
created_at
Entity Relationship Diagram
Users
  │
  ├── Properties
  │       │
  │       └── Units
  │              │
  │              └── Leases
  │                     │
  │                     └── Rent Payments
  │
  └── Maintenance Requests
JWT Authentication Flow
Registration
User
  ↓
Register
  ↓
Password Hashing (bcrypt)
  ↓
Store in PostgreSQL
Login
User Login
    ↓
Validate Credentials
    ↓
Generate JWT Token
    ↓
Return Token
Protected APIs
Client Request
      ↓
JWT Token
      ↓
Authorization Header
      ↓
FastAPI Middleware
      ↓
Access Granted
Installation Guide
Step 1: Clone Repository
git clone https://github.com/YOUR_USERNAME/UrbanNest-Property-Management.git

cd UrbanNest-Property-Management
Step 2: Setup PostgreSQL

Create database:

CREATE DATABASE urbannest_db;

Execute:

database/schema.sql

Load sample data:

database/seed_data.sql
Step 3: Configure Backend

Navigate:

cd backend

Install dependencies:

pip install -r requirements.txt

Configure .env

DATABASE_URL=postgresql://postgres:password@localhost:5432/urbannest_db

SECRET_KEY=urbannest_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60
Step 4: Start Backend
uvicorn main:app --reload

Backend URL:

http://localhost:8000

Swagger Documentation:

http://localhost:8000/docs
Step 5: Configure Frontend

Navigate:

cd frontend

Install packages:

npm install

Start application:

npm run dev

Frontend URL:

http://localhost:5173
API Endpoints
Authentication
Method	Endpoint	Description
POST	/register	Register User
POST	/login	User Login
GET	/me	Current User
Properties
Method	Endpoint
GET	/properties
POST	/properties
Maintenance
Method	Endpoint
GET	/maintenance-requests
POST	/maintenance-requests
Dashboard
Method	Endpoint
GET	/dashboard-summary
Sample Login Credentials
Admin
Email: admin@urbannest.com
Password: admin123
Role: Admin
Tenant
Email: tenant@urbannest.com
Password: tenant123
Role: Tenant
Future Enhancements
Phase 2
Role Based Access Control (RBAC)
Property Images Upload
Email Notifications
SMS Notifications
Payment Gateway Integration
Lease Document Upload
Real-Time Dashboard
WebSocket Notifications
Phase 3
AI Maintenance Prediction
Rent Price Forecasting
Occupancy Analytics
Tenant Churn Prediction
Power BI Dashboard Integration
