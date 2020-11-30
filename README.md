## Information

The following notes describe how to install **docker** on CentOS 8 running on a VM (Virtual Box), which can be optional. It also discusses how to dockerize a nodejs webapp.

## Content

- [Prerequisites](#prerequisites)
- [Docker Installation](#docker-installation)
- [Docker Post Installation](#post-installation)
- [Dockerize a NodeJS Web App](#dockerize-a-nodejs-web-app)
- [Run a NodeJS Web App Inside a Docker Container](#run-a-nodejs-web-app-inside-a-docker-container)
- [References](#references)

## Prerequisites

> See the related tutorials on [**Virtual Box - CentOS 8**](https://trello.com/c/yj4wPomj) for more information on setting up CentOS on VirtualBox.

1. (Optional) Virtual Box 6.14
2. CentOS 8.1

## Docker Installation

1. Add Docker CE yum repository using dnf command.  
`sudo dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo`
2. Build cache for Docker yum repository.  
`sudo dnf makecache`
3. Docker CE requires containerd.io-1.2.2-3 (or later) package, which is blocked in CentOS 8. Therefore, we have to use an earlier version of containerd.io package. Install docker-ce with an earlier version of containerd.io using following command.  
`sudo dnf -y install --nobest docker-ce --alowerasing`
4. Enable and start Docker service.  
`systemctl enable --now docker.service`
5. Check status of Docker service.  
`systemctl status docker.service`
6. Check Docker version.  
`docker version`
7. Verify that docker runs.  
`docker run hello-world`
8. View the list of docker containers.  
`docker container ls -a`
9. Stop and remove a docker container.
   - Get its `CONTAINER ID/s` from step #8.
   - Run: `docker container rm <CONTAINER_ID>, <CONTAINER_ID_2>, ...`

## Docker Post Installation

1. Add your user to the docker group.  
```
sudo usermod -aG docker $USER
id $USER
```
2. Disable firewalld on CentOS 8  
`sudo systemctl disable firewalld`
3. Reboot system.  
`sudo shutdown -r now`
4. Test: Pull the Alpine Linux image from Docker Hub.  

		docker search alpine --filter is-official=true
		docker pull alpine

4. List the locally available docker images.  
`docker images`
5. Create and run a container using Alpine Linux image.  

		docker run -it --rm alpine /bin/sh
		apk update



## Dockerize a NodeJS Web App

1. Create a basic express nodejs app. For reference, use the [**nodeapp**](https://github.com/weaponsforge/nodeapp) repository.
2. Create a `Dockerfile` file inside the project repository.  

		FROM node:12
		# app directory
		WORKDIR /usr/src/app
		# Install dependencies
		COPY package*.json ./
		RUN npm install
		# Bundle app source
		COPY . .
		EXPOSE 3000
		CMD ["node", "main.js"]

3. Create a `.dockerignore` file inside the project repository.  

		node_modules
		npm-debug.log


## Run a NodeJS Web App Inside a Docker Container

1. Clone this git repository, or create a working nodejs web app directory set-up for Docker.  
`git clone https://github.com/weaponsforge/nodeapp.git`
2. **cd** into the directory.  
`cd nodeapp`
3. Build the docker image locally.  
`docker build -t nodeapp .`
4. Confirm that the image is listed by docker.  
`docker images`
5. Run the image in detached mode.  
`docker run -p 49160:3000 -d nodeapp`
6. Print the output of your app.
   - Get the container id: `docker ps`
   - Print the app output: `docker logs <CONTAINER_ID>`
7. Go inside the running container.  
`docker exec -it <CONTAINER_ID> /bin/bash`
8. View the port mapping from inside the container (3000) to your machine's port (49160).  
`docker ps`
9. Test if it can be called outside using **curl**, or load the website from a web browser.  
`curl -i localhost:49160`
10. Stop the running container/s.
   - (stop 1) `docker container stop <CONTAINER_ID>`
   - (stop all) `docker container stop $(docker container ls -aq)`
11. Remove a container. Note: The container should first be stopped before it is removed. 
   - `docker container rm <CONTAINER_ID>`
   - `docker container rm <CONTAINER_ID#1>, <CONTAINER_ID#2>,...`


## References

[[1]](https://www.alibabacloud.com/blog/how-to-install-docker-ce-and-docker-compose-on-centos-8_595741) - install docker ce and docker-compose on centos 8  
[[2]](https://phoenixnap.com/kb/how-to-install-docker-on-centos-8) - install docker on centos 8  
[[3]](https://docs.docker.com/engine/install/centos/) - official docker installation on centos  
[[4]](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md) - docker and nodejs best practices  
[[5]](https://hub.docker.com/_/node/) - nodejs official docker images

@weaponsforge  
20201130