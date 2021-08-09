node {
    stage('SCM') {
        checkout scm
    }
    stage('SonarQube Analysis') {
        withSonarQubeEnv() {
            sh "./gradlew sonarqube"
        }
    }
}