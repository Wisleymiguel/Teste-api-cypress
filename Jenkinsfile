pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                git branch: 'main', url: 'https://github.com/Wisleymiguel/Teste-api-cypress.git'
                bat 'npm install'
                bat 'npx cypress install' // Instala o binário do Cypress
            }
        }
        stage('Test') {
            steps {
                bat 'npx cypress run'
            }
        }
    }
}