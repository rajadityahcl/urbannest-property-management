# 🏢 UrbanNest Property Management System

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-ORM-red)

A full-stack Property Management System built using **PostgreSQL, FastAPI, React, and JWT Authentication**.

UrbanNest enables property administrators and tenants to manage rental properties, leases, rent payments, and maintenance requests through a secure web-based platform.

---

# 📋 Table of Contents

- Overview
- Features
- System Architecture
- Technology Stack
- Database Design
- Project Structure
- Installation Guide
- API Endpoints
- Authentication
- Screenshots
- Future Enhancements
- Author

---

# 🚀 Overview

UrbanNest is designed to simulate a real-world property management platform where:

### Property Administrators can:
- Manage properties
- Manage rental units
- Assign tenants
- Track lease agreements
- Monitor rent payments
- Manage maintenance requests

### Tenants can:
- Login securely
- View assigned properties
- Submit maintenance requests
- Track request status
- View lease information
- Monitor rent payment history

---

# ✨ Features

## Authentication & Security

- JWT Authentication
- Password Hashing using Bcrypt
- Protected API Endpoints
- Role-Based Access Control
- Secure Login & Registration

---

## Property Management

- Create Properties
- View Properties
- Update Properties
- Delete Properties

---

## Unit Management

- Add Units
- Track Unit Occupancy
- Update Unit Status

---

## Lease Management

- Create Lease Agreements
- Assign Tenants to Units
- Track Lease Status

---

## Rent Management

- Record Rent Payments
- Track Payment Status
- Generate Payment Reports

---

## Maintenance Requests

- Submit Requests
- Assign Priority
- Track Request Status
- Admin Resolution Workflow

---

# 🏗️ System Architecture

```text
┌───────────────────────┐
│      React Frontend   │
└──────────┬────────────┘
           │ REST API
           ▼
┌───────────────────────┐
│      FastAPI Backend  │
└──────────┬────────────┘
           │ SQLAlchemy ORM
           ▼
┌───────────────────────┐
│     PostgreSQL DB     │
└───────────────────────┘
```

---

# 💻 Technology Stack

| Layer | Technology |
|---------|------------|
| Frontend | React.js |
| Backend | FastAPI |
| Database | PostgreSQL |
| ORM | SQLAlchemy |
| Authentication | JWT |
| Password Security | Bcrypt |
| API Testing | Swagger UI |
| Version Control | GitHub |
| Deployment | Render + Netlify + Neon |

---

# 🗄️ Database Design

## Core Tables

### Users

Stores user information.

| Column |
|----------|
| user_id |
| full_name |
| email |
| password_hash |
| role |
| phone |
| created_at |

---

### Properties

Stores property details.

| Column |
|----------|
| property_id |
| admin_id |
| property_name |
| address |
| city |
| state |
| zipcode |

---

### Units

Stores rental unit information.

| Column |
|----------|
| unit_id |
| property_id |
| unit_number |
| rent_amount |
| status |

---

### Leases

Stores lease agreements.

| Column |
|----------|
| lease_id |
| tenant_id |
| unit_id |
| start_date |
| end_date |
| monthly_rent |
| status |

---

### Rent Payments

Stores payment records.

| Column |
|----------|
| payment_id |
| lease_id |
| amount |
| payment_date |
| payment_status |

---

### Maintenance Requests

Stores maintenance tickets.

| Column |
|----------|
| request_id |
| tenant_id |
| unit_id |
| issue_title |
| issue_description |
| priority |
| status |

---

# 📂 Project Structure

```text
UrbanNest-Property-Management/
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
│   ├── Project_Report.pdf
│   ├── API_Documentation.pdf
│   └── Screenshots/
│
├── screenshots/
│
├── README.md
│
└── .gitignore
```

---

# ⚙️ Installation Guide

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/UrbanNest-Property-Management.git

cd UrbanNest-Property-Management
```

---

## 2. Create PostgreSQL Database

```sql
CREATE DATABASE urbannest_db;
```

Execute:

```bash
database/schema.sql
```

Load Sample Data:

```bash
database/seed_data.sql
```

---

## 3. Configure Backend

Navigate:

```bash
cd backend
```

Install Dependencies:

```bash
pip install -r requirements.txt
```

Create `.env`

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/urbannest_db

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

## 4. Start Backend Server

```bash
uvicorn main:app --reload
```

Backend URL:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

---

## 5. Configure Frontend

```bash
cd frontend

npm install
```

Start React Application:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# 🔐 Authentication Workflow

## Registration

```text
User Registration
        │
        ▼
Password Hashing
        │
        ▼
Store in PostgreSQL
```

---

## Login

```text
User Login
      │
      ▼
Validate Credentials
      │
      ▼
Generate JWT Token
      │
      ▼
Return Access Token
```

---

## Protected APIs

```text
Frontend Request
       │
       ▼
Bearer Token
       │
       ▼
JWT Validation
       │
       ▼
Authorized Access
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint |
|----------|----------|
| POST | /register |
| POST | /login |
| GET | /me |

---

## Properties

| Method | Endpoint |
|----------|----------|
| GET | /properties |
| POST | /properties |

---

## Units

| Method | Endpoint |
|----------|----------|
| GET | /units |
| POST | /units |

---

## Leases

| Method | Endpoint |
|----------|----------|
| GET | /leases |
| POST | /leases |

---

## Rent Payments

| Method | Endpoint |
|----------|----------|
| GET | /rent-payments |
| POST | /rent-payments |

---

## Maintenance Requests

| Method | Endpoint |
|----------|----------|
| GET | /maintenance-requests |
| POST | /maintenance-requests |

---

## Dashboard

| Method | Endpoint |
|----------|----------|
| GET | /dashboard-summary |

---

# 📊 Future Enhancements

## Phase 2

- Property Image Upload
- Email Notifications
- SMS Alerts
- Payment Gateway Integration
- Document Upload
- Advanced Reporting

---

## Phase 3

- AI-Powered Maintenance Prediction
- Tenant Churn Analytics
- Rent Price Forecasting
- Occupancy Analytics Dashboard
- Predictive Property Insights

---

# 🎓 Academic Learning Outcomes

This project demonstrates:

- Database Design & Normalization
- PostgreSQL Administration
- SQL Query Development
- REST API Development
- Authentication & Authorization
- Full-Stack Application Development
- Cloud Deployment
- Software Engineering Best Practices

---

# 👨‍💻 Author

### Aditya Raj

MS Business Analytics & Project Management  
University of Connecticut

**GitHub:** https://github.com/rajadityahcl

**LinkedIn:** https://www.linkedin.com/in/rajaditya1992

---

# 📄 License

This project is developed for educational, portfolio, and research purposes.

© 2026 Aditya Raj. All Rights Reserved.
