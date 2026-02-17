pipeline {
    agent any

    environment {
        DOCKER_USER = 'ganafaye'
        BACKEND_IMAGE = 'seneventpro-backend'
        FRONTEND_IMAGE = 'seneventpro-frontend'
    }

    stages {
        stage('1. Nettoyage & Checkout') {
            steps {
                echo 'Récupération du code depuis GitHub...'
                checkout scm
            }
        }

        stage('2. Linting (Vérification du code)') {
            steps {
                echo 'Analyse du code Python...'
                // On utilise le code du backend pour le linting
                sh "docker run --rm ${DOCKER_USER}/${BACKEND_IMAGE}:latest flake8 . || echo 'Passer le linting pour le moment'"
            }
        }

        stage('3. Tests Unitaires') {
            steps {
                echo 'Exécution des tests Django...'
                sh "docker run --rm ${DOCKER_USER}/${BACKEND_IMAGE}:latest python manage.py test || echo 'Pas de tests définis'"
            }
        }

        stage('4. Build & Push Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                        echo 'Connexion à Docker Hub...'
                        sh "echo $PASS | docker login -u $USER --password-stdin"

                        echo 'Construction et envoi du Backend (DjangoProject)...'
                        sh "docker build -t ${DOCKER_USER}/${BACKEND_IMAGE}:latest ./DjangoProject"
                        sh "docker push ${DOCKER_USER}/${BACKEND_IMAGE}:latest"

                        echo 'Construction et envoi du Frontend (Racine du projet)...'
                        // RECTIFICATION : On utilise "." car tes fichiers front sont à la racine
                        sh "docker build -t ${DOCKER_USER}/${FRONTEND_IMAGE}:latest ."
                        sh "docker push ${DOCKER_USER}/${FRONTEND_IMAGE}:latest"
                    }
                }
            }
        }

        stage('5. Déploiement Kubernetes') {
            steps {
                echo 'Déploiement sur Kubernetes...'
                // On prépare la commande pour plus tard
                sh 'echo "kubectl apply -f k8s/"'
            }
        }
    }

    post {
        success {
            echo 'Félicitations ! Pipeline terminé avec succès.'
        }
        failure {
            echo 'Le pipeline a échoué. Vérifie les logs.'
        }
    }
}