# 🏦 Banking App

Une application bancaire full-stack sécurisée, développée avec **Django REST Framework (DRF)**, **React + TailwindCSS**, et **MySQL**.  
Elle permet aux utilisateurs de créer un compte, d'effectuer des transactions et de consulter leur solde en toute sécurité.

---

## 🚀 Stack technique

### 🖥️ Backend (`/backend`)
- **Django 5 + Django REST Framework**
- **JWT Authentication (SimpleJWT)**
- **MySQL** comme base de données
- **python-decouple** pour la gestion du `.env`
- **Gunicorn + Nginx** pour la production
- **Docker** pour la conteneurisation

### 💻 Frontend (`/frontend`)
- **React 18 + Vite**
- **TailwindCSS** pour le design rapide et responsive
- **Axios** pour les appels API
- **React Router** pour la navigation

---

## ⚙️ Fonctionnalités principales

- 🔐 Authentification sécurisée par **JWT**
- 👤 Gestion des utilisateurs (inscription, login, profil)
- 💸 Gestion des comptes bancaires (solde, historique, virements)
- 📊 Tableau de bord moderne et responsive
- 🐳 Environnement **Docker** complet prêt pour la prod

---

## 🧰 Installation locale (dev)

### 1️⃣ Cloner le dépôt
```bash
git clone https://github.com/<ton-username>/banking-app.git
cd banking-app
