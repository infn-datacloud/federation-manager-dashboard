#!groovy
@Library('jenkins-libraries') _

pipeline {
    agent {
        node { label 'jenkins-node-label-1' }
    }

    environment {
        PROJECT_NAME = 'fed-mgr-dashboard'
        DOCKERFILE = './docker/Dockerfile'

        DOCKER_HUB_CREDENTIALS_NAME = 'docker-hub-credentials'
        DOCKER_HUB_CREDENTIALS = credentials("${DOCKER_HUB_CREDENTIALS_NAME}")
        DOCKER_HUB_ORGANIZATION = 'indigopaas'
        DOCKER_HUB_URL = 'https://index.docker.io/v1/'
        DOCKER_HUB_HOST = 'docker.io'

        HARBOR_CREDENTIALS_NAME = 'harbor-paas-credentials'
        HARBOR_CREDENTIALS = credentials("${HARBOR_CREDENTIALS_NAME}")
        HARBOR_ORGANIZATION = 'datacloud-middleware'
        HARBOR_URL = 'https://harbor.cloud.infn.it'
        HARBOR_HOST = 'harbor.cloud.infn.it'
    }

    stages {
        stage('Create and push images') {
            parallel {
                stage('Image published on Harbor') {
                    steps {
                        script {
                            dockerRepository.buildAndPushImage(
                                imageName: "${HARBOR_ORGANIZATION}/${PROJECT_NAME}",
                                dockerfile: "${DOCKERFILE}",
                                registryUrl: "${HARBOR_URL}",
                                registryCredentialsName: "${HARBOR_CREDENTIALS_NAME}",
                                registryUser: '${HARBOR_CREDENTIALS_USR}',
                                registryPassword: '${HARBOR_CREDENTIALS_PSW}',
                                registryHost: "${HARBOR_HOST}",
                                registryType: 'harbor2',
                            )
                        }
                    }
                }
                stage('Image published on DockerHub') {
                    steps {
                        script {
                            dockerRepository.buildAndPushImage(
                                imageName: "${DOCKER_HUB_ORGANIZATION}/${PROJECT_NAME}",
                                dockerfile: "${DOCKERFILE}",
                                registryUrl: "${DOCKER_HUB_URL}",
                                registryCredentialsName: "${DOCKER_HUB_CREDENTIALS_NAME}",
                                registryUser: '${DOCKER_HUB_CREDENTIALS_USR}',
                                registryPassword: '${DOCKER_HUB_CREDENTIALS_PSW}',
                                registryHost: "${DOCKER_HUB_HOST}",
                                registryType: 'dockerhub',
                            )
                        }
                    }
                }
            }
        }
    }
}
