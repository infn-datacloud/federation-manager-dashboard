#!groovy
@Library('jenkins-libraries') _

pipeline {
    agent {
        node { label 'jenkins-node-label-1' }
    }

    environment {
        PROJECT_NAME = 'fed-mgr-dashboard'
        DOCKERFILE = './docker/Dockerfile'
    }

    triggers {
        cron("${dockerRepository.periodicTrigger(env.BRANCH_NAME)}")
    }

    stages {
        stage('Create and push images') {
            parallel {
                stage('Image published on Harbor') {
                    steps {
                        script {
                            dockerRepository.buildAndPushImage(
                                imageName: "${PROJECT_NAME}",
                                dockerfile: "${DOCKERFILE}",
                                registryType: 'harbor2',
                            )
                        }
                    }
                }
                stage('Image published on DockerHub') {
                    steps {
                        script {
                            dockerRepository.buildAndPushImage(
                                imageName: "${PROJECT_NAME}",
                                dockerfile: "${DOCKERFILE}",
                                registryType: 'dockerhub',
                            )
                        }
                    }
                }
            }
        }
    }
}
