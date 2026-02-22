# 🌟 SenEventPro - Plateforme de Gestion d'Événements

Ce dépôt contient le **Frontend** de l'application SenEventPro, développé avec **React** et optimisé par **Vite**. Ce projet s'inscrit dans une architecture microservices orchestrée par **Kubernetes**.

## 🛠️ Stack Technique
- **Framework :** React 18+ (Vite)
- **Styling :** Style simple 
- **CI/CD :** Pipeline Jenkins & Automatisation Ansible
- **Orchestration :** Kubernetes (Minikube) & Docker

## 🚀 Fonctionnalités
- Consultation d'événements en temps réel.
- Interface simple qui affice les evenemts et une bouton crée un evenement.
- Communication avec l'API REST Django (Backend).

## 🐳 Conteneurisation & Déploiement
Pour lancer le frontend localement avec Docker :
```bash
docker build -t ganafaye/eventmaster-frontend:v1.0 .
docker run -p 5173:5173 ganafaye/eventmaster-frontend:v1.0
```

### 🚀 Interface Utilisateur
avant Orchestration ave Kubernetes : on l'adresse:localhost....
<img width="1920" height="1048" alt="Capture d’écran du 2026-02-16 16-29-24" src="https://github.com/user-attachments/assets/fb61d021-516b-4d50-baba-ec540daafd5e" />
Apres Orchestration avec Kubertes : On a l'adresse : 192.XXX.XX.XX qui est l'adresse du resaeu
<img width="1920" height="1048" alt="Capture d’écran du 2026-02-18 11-16-01" src="https://github.com/user-attachments/assets/d17ed5d1-24f3-4941-bc22-b20f61028e19" />
### Teste on vas modifier le projet et faire git psuh alors ça jenkins vas detetcter automatiquemet le changement de code et ansible vont mettre a jour le projet
<img width="1920" height="1048" alt="Capture d’écran du 2026-02-18 11-48-37" src="https://github.com/user-attachments/assets/4f656937-6d61-452d-b9b2-64befe81ace0" />
### Capture du pipeline jenkins
<img width="1920" height="1048" alt="Capture d’écran du 2026-02-18 16-59-46" src="https://github.com/user-attachments/assets/729d1acf-011f-4d13-8e28-dbbbd28ec93c" />



