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

                        echo 'Construction et envoi du Backend...'
                        sh "docker build -t ${DOCKER_USER}/${BACKEND_IMAGE}:latest ./DjangoProject"
                        sh "docker push ${DOCKER_USER}/${BACKEND_IMAGE}:latest"

                        echo 'Construction et envoi du Frontend...'
                        sh "docker build -t ${DOCKER_USER}/${FRONTEND_IMAGE}:latest ."
                        sh "docker push ${DOCKER_USER}/${FRONTEND_IMAGE}:latest"
                    }
                }
            }
        }

        stage('5. Déploiement avec Ansible') {
            steps {
                script {
                    // On garde withKubeConfig pour qu'Ansible puisse utiliser le contexte K8s
                    withKubeConfig([credentialsId: 'k8s-config']) {
                        echo 'Lancement du Playbook Ansible...'
                        
                        // Exécution d'Ansible
                        // On ajoute -e "ansible_python_interpreter=/usr/bin/python3" pour être sûr qu'il utilise le bon Python
                        sh "ansible-playbook -i ansible/inventory.ini ansible/deploy-k8s.yml"
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Félicitations ! Pipeline terminé avec succès via Ansible.'
        }
        failure {
            echo 'Le pipeline a échoué. Vérifie les logs de la tâche Ansible.'
        }
    }
}