@Library('appswmjenkins@master')_

pipeline {
    agent {
        node { label 'docker' }
    }
    environment {
        gitCheckoutParams = checkout scm
        SLACK_CHANNEL = "apps-builds"
        SLACK_ICON = ":backend:"
        SERVICE_NAME = "wm-forms"
        DEPARTMENT = 'applications'
        CURR_COMMIT = "${gitCheckoutParams.GIT_COMMIT}"
        PREVIOUS_COMMIT ="${env.GIT_PREVIOUS_COMMIT}"
        REPO = getRepoName("${gitCheckoutParams.GIT_URL}")
        BRANCH = "${gitCheckoutParams.GIT_BRANCH}"
        COMMITER = sh (
            script: "git show -s --pretty=%an || true",
            returnStdout: true
            ).trim()
    }
    triggers {
        pollSCM '* * * * *'
    }
    options {
      timeout(time: 30, unit: 'MINUTES')
      disableConcurrentBuilds()
      ansiColor('xterm')
    }

    stages {
        stage('Initialize'){
            steps{
                script{
                    BRANCH_MAP = getEnvironmentNameFromFile("${env.BRANCH}".toString(), "./branch-mapping.json")
                    DEPLOY_DATA = readJSON file: "./deploy.json"
                    packageJSON = readJSON file: "./package.json"
                    packageVersion = packageJSON.version
                }
            }
        }
        stage('Build') {
            steps {
                script{
                    applicationsUtils.printColor("Running Build Step", "green")
                    docker.withRegistry('https://artifactory.walkmernd.com', 'docker-artifactory') {
                        docker.image('artifactory.walkmernd.com/docker/node:14.16.0-alpine').inside("-v ${PWD}:/usr/src/app -v ${HOME}/.npm:/root/.npm -w /usr/src/app ") {
                            withNPM(npmrcConfig:'npmrc-artifactory'){
                                sh "npm i --frozen-lockfile"
                                sh "npm run build -- --mode=production"
                            }
                        }
                    }
                    
                }
            }
        }
        stage('Test'){
            steps {
                script{
                    applicationsUtils.printColor("Running Tests Step", "green")
                    docker.withRegistry('https://artifactory.walkmernd.com', 'docker-artifactory') {
                        docker.image('artifactory.walkmernd.com/docker/node:14.16.0-alpine').inside("-v ${PWD}:/usr/src/app -v ${HOME}/.npm:/root/.npm -w /usr/src/app ") {
                            withNPM(npmrcConfig:'npmrc-artifactory'){
                                    sh "npm t"
                            }
                        }
                    }
                    
                }
            }

        }
        stage('Deploy') {
                when {
                    anyOf { branch 'master'; branch 'develop'}
                }
                steps {
                    script{
                        applicationsUtils.printColor("Run Deploy Step", "green")
                        mainS3Folder = "/apps/wm-forms/"
                        foldersArray = [["folderPath": "./dist/", "destPathSuffix": "${mainS3Folder}", "cacheControl": "max-age=31556926", "exclude": ["index.html", "styles/*"]]]
                        entryPointsArray  = [["filePath": "./dist/index.html", "destPathSuffix": "${mainS3Folder}"]]
                        applicationsUtils.uplodeToCdnS3(BRANCH_MAP, foldersArray, entryPointsArray, mainS3Folder)
                    }
                }
        }
    }

    post{
        always {
        sendNotifications(currentBuild.currentResult)
        cleanWs()
        }

    }
}
