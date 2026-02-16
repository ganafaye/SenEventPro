# Étape 1 : Build de l'application React
FROM node:20-alpine as build-stage

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./
RUN npm install

# Copie du code source et compilation
COPY . .
RUN npm run build

# Étape 2 : Serveur de production Nginx
FROM nginx:stable-alpine

# On copie notre config personnalisée faite à l'étape 1
COPY nginx.conf /etc/nginx/conf.d/default.conf

# On récupère le build de l'étape précédente (vérifie si ton dossier de build est 'dist' ou 'build')
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]