# 🏦 BANKING-APP

A full-stack banking application built with **Django**, **React**, **MySQL**, and **Docker**. It supports secure user authentication, account management, and money transfers via a clean and responsive interface.

---

## 🚀 Technologies

- **Backend**: Django 5.2 + Django REST Framework + JWT
- **Frontend**: React + Tailwind CSS
- **Database**: MySQL 8
- **Deployment**: Docker Compose + Nginx + Gunicorn
- **Authentication**: JWT (access/refresh tokens)

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/acinox-it/banking-app.git
cd banking-app
```
### 2. Configure environment variables 

Create a **.env** file in the root directory:
````markdown
DJANGO_SECRET_KEY=your_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=banking_db
JWT_SECRET=your_jwt_secret
````
### 3. Backend setup (Django)

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 4. Frontend setup (React)

```bash
cd frontend
npm install
npm run dev
```
---

## ✅ Features

- Secure user authentication (JWT)
- Account creation and management
- Money transfers between accounts
- Transaction history
- Responsive dashboard with React + Tailwind

---

## 📄 License

Free to use for educational and personal projects.
