pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                git branch: 'main', url: 'https://github.com/Wisleymiguel/Teste-api-cypress.git'
                bat 'npm install -- force'
                bat 'npm install -g json-server' 
                bat 'npx cypress install' 
                 bat 'start json-server --watch db.json --port 3000'
            }
        }
        stage('Test') {
            steps {
                bat '''set NO_COLOR=1
                npm test''' 
                bat 'npx cypress run'
            }
        }
    }
}
