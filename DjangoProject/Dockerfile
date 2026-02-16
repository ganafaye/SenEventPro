# 1. Utiliser une image Python légère (C'est notre SEULE base)
FROM python:3.12-slim

# 2. Définir le dossier de travail dans le conteneur
WORKDIR /app

# 3. Empêcher Python de générer des fichiers .pyc et d'utiliser un buffer pour les logs
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 4. Installer les dépendances système pour PostgreSQL (libpq est crucial pour psycopg2)
RUN apt-get update && apt-get install -y libpq-dev gcc && rm -rf /var/lib/apt/lists/*

# 5. Installer les dépendances Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 6. Copier tout le code du projet
COPY . .

# 7. Lancer le serveur (0.0.0.0 permet d'écouter toutes les interfaces du conteneur)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]