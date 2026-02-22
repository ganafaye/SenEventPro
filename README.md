# 🌟 SenEventPro - Plateforme de Gestion d'Événements

Ce dépôt contient le **Frontend** de l'application SenEventPro, développé avec **React** et optimisé par **Vite**. Ce projet s'inscrit dans une architecture microservices orchestrée par **Kubernetes**.

## 🛠️ Stack Technique
- **Framework :** React 18+ (Vite)
- **Styling :** CSS Modules / Tailwind (selon ton choix)
- **CI/CD :** Pipeline Jenkins & Automatisation Ansible
- **Orchestration :** Kubernetes (Minikube) & Docker

## 🚀 Fonctionnalités
- Consultation d'événements en temps réel.
- Interface responsive pour mobiles et tablettes.
- Communication avec l'API REST Django (Backend).

## 🐳 Conteneurisation & Déploiement
Pour lancer le frontend localement avec Docker :
```bash
docker build -t ganafaye/eventmaster-frontend:v1.0 .
docker run -p 5173:5173 ganafaye/eventmaster-frontend:v1.0
