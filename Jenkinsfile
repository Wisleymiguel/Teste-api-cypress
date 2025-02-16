pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                git branch: 'main', url: 'https://github.com/Wisleymiguel/Teste-api-cypress.git'
                bat 'npm install'
                bat 'npx cypress install'
            }
        }
        stage('Test') {
            steps {
                bat 'npm test'
            }
        }
    }
}
