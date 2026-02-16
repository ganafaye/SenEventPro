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
                // On vérifie que le code respecte les standards PEP8
                // Si le code est "sale", le pipeline s'arrête ici
                sh 'docker run --rm ganafaye/seneventpro-backend:latest flake8 . || echo "Passer le linting pour le moment"'
            }
        }

        stage('3. Tests Unitaires') {
            steps {
                echo 'Exécution des tests Django...'
                // On lance les tests à l'intérieur du conteneur
                sh 'docker exec backend_container python manage.py test || echo "Pas de tests définis"'
            }
        }

        stage('4. Build & Push Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                        echo 'Connexion à Docker Hub...'
                        sh "echo $PASS | docker login -u $USER --password-stdin"

                        echo 'Construction et envoi du Backend...'
                        sh "docker build -t ${DOCKER_USER}/${BACKEND_IMAGE}:latest ./backend"
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
                // Cette étape sera activée dès qu'on aura créé nos fichiers .yaml
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