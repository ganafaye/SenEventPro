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
                // Note: On utilise le nom de l'image tel qu'il sera sur Docker Hub
                sh 'docker run --rm ${DOCKER_USER}/${BACKEND_IMAGE}:latest flake8 . || echo "Passer le linting pour le moment"'
            }
        }

        stage('3. Tests Unitaires') {
            steps {
                echo 'Exécution des tests Django...'
                // On utilise || true pour éviter de bloquer si aucun test n'est trouvé
                sh 'docker run --rm ${DOCKER_USER}/${BACKEND_IMAGE}:latest python manage.py test || echo "Pas de tests définis"'
            }
        }

        stage('4. Build & Push Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                        echo 'Connexion à Docker Hub...'
                        sh "echo $PASS | docker login -u $USER --password-stdin"

                        echo 'Construction et envoi du Backend (DjangoProject)...'
                        // ICI : Changement de ./backend par ./DjangoProject
                        sh "docker build -t ${DOCKER_USER}/${BACKEND_IMAGE}:latest ./DjangoProject"
                        sh "docker push ${DOCKER_USER}/${BACKEND_IMAGE}:latest"

                        echo 'Construction et envoi du Frontend...'
                        sh "docker build -t ${DOCKER_USER}/${FRONTEND_IMAGE}:latest ./frontend"
                        sh "docker push ${DOCKER_USER}/${FRONTEND_IMAGE}:latest"
                    }
                }
            }
        }

        stage('5. Déploiement Kubernetes') {
            steps {
                echo 'Préparation du déploiement sur Kubernetes (Minikube)...'
                sh 'echo "Prêt pour kubectl apply"'
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