# Kubernetes 

Is Container orchestration sytem/tool originally developed by Google and now supporteped by (Cloud Native Foundation)[https://www.cncf.io/]
-  Container Orchestration tool. Simply is a tool thats runs a batch of containers
-  We give it some configurations that describes how a container should run and interact with each other.
  
## How to Setup K8s

1. (Docker for mac or Windows)[https://docs.docker.com/desktop/] 
2. (Running Docker-Toolbox for linux)[https://kubernetes.io/fr/docs/tasks/tools/install-minikube/]

## Basics 

K8s manages `images` of docker /containerd

### Terminalogies
1.  Kubernetes Cluster  	 - A collection of nodes +  master to manage them
2.  Node					 - a Virtual Machine that will run our containers/pods
3.  Pod 					 - More or less a running container. Technically, one pod can run  multiple container, but usually use 1 - 1 relationsip. Building block of K8s. Group of one or more containers that can be started inside a cluster.
4.  Deployments 				 -  Monitors a set of pods, makes sure they are running and restarts them if the crash. Deployment controller provides declarative updates to Pod and replicaSets.
5.  Services  				 - Provides an easy to remember URL to access a running container inside a pod
6.  ReplicaSet 				 -  Ensures that a pod specification runs with the specified set numbers of replicas. They are allow starting several instances of pods and restart them automatically if they crashes.

### ConfigMaps

-  Tells Kubernetes about  the different Deployments, Pods , and Services (Referred to us `Objects`) that will be created.
-  They are usully written in `YAML` syntax.
-  Always store these files with project source - they are documentation!!!
-  `**DO NOT DO THIS**`  -  this `Objects` can be created without  a file i.e directly from the terminal. Not a good practice


- `Config files provides a precise defination of what your custer is running`
  

#### Creating Pod(s)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: posts
spec:
  containers:
    - name: posts
      image: domambia/simple-backend:0.0.2
```

Meaning
1. `apiVersion:  v1` 		-> K8s is extensible  -  we can our own custom objects. This specifies the set of obejcts we want our k8s to look at.
2. `kind: Pod` 				-> The type of object to be created
3. `metadata:` 				-> Config options for the object we are creating 
4. `  name: posts`			->  When pods are created, they are given a name e.g `posts`
5. `spec: `					-> The exact attributes we want to apply to object we are creating.
6. `  containers: `			-> We want to create a continer in a single pod
7. `    -name: posts`		-> Make a container with a name of `posts`
8. `      image: domambia/simple-backend:0.0.2` -> The exact tag applied to our image.



### Common Commands for `Pod(s)`

```bash
$ kubectl get pods
$ kubectl describe pod  [pod_name]
$ kubectl apply -f  [config_name_file_yaml]
$ kubectl delete pod [pod_name]
```


## Deployments
Deployment found inside the `apps/v1` Object. Note you can use your own `Objects`
- Sample of a deployment 

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <depl-depl>
spec:
  replicas: 5 # number of replicas
  selector: # which pod the deployment needs to manage
    matchLabels:
      app: <depl_pod_name>
  template: # creating a pod 
    metadata:
      labels:
        app: <depl_pod_name>
    spec:
      containers:
        - name: <depl_pod_name>
          image: <docker_hub_username>/<container_tag>
```

>  To apply this deployment use the command `kubectl apply -f config_yaml_file`.  This creates a deployment that manages your pods.

### Common Commands for `Deployment(s)`

```bash
$ kubectl get deployments
$ kubectl describe deployment  [depl_name]
$ kubectl apply -f  [config_name_file_yaml]
$ kubectl delete deployment [depl_name]
```

### Updating Deployment(s)

There are two different ways 
1. `Method 1` - Don`t use this method in a production ready application
   
	-  Make a chance to your project code 
	-  Rebuild your image by specifying new image version 
	-  In your deployment config file (YAML), update the version of your image
	-  Run command to recreate your deployment `kubectl apply -f [config_file]`



2. `Method 2` - Tell kubernetes to use the latest version of the images. To either pull the image automatically or not. The deployment must use the `latest` tag in your pod spec section
	> `This method is the preferred one`
Steps:
	- Make change to your code.
	- Build your image
	- Push your image to docker hub
	- Add the `:latest` tag tp your pod section inside your deployment
	- Apply your deployment config file `kubectl rollout restart deployment <depl_name>`


## Services

Kubernetes gives  Pods their own IP address and DNS name and load balance a cross them. Since a pod's is not static and cannot be accessible from outside the kubernetes. Services provides a way that gives human readable URl and its is static.

K8s Service is like a REST Object similar to a Pod. Like all the REST Objects, You can `POST` Service defination via Config Files and create a new Services

N/B The name of a service must be valid `RULE of DNS Name`
	- contain at most 63 characters
	- contain only lowercase alphanumeric characters or '-'
	- start with an alphanumeric character
	- end with an alphanumeric character

K8s Service is found in `v1` Object

Simply:
- a Service provides networking between pods or anytime we want to access our pod to the outside world.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: posts-srv
spec:
  type: NodePort
  selector:
    app: posts
  ports:
    - name: posts
      protocol: TCP
      port: 4000 # port unto which we are sending top SRV
      targetPort: 4000 # actual port our application is listening on
```


### Types of Services

1. Cluster IP

- Sets up an easy to remember URL to access a pod. It only exposes pods inside the cluster. Not accessible from the outside world.

MOST USED 


1. Node Port 
   - Makes a pod accessible from outside the cluser. Usually only used for development purposes.
  
2. Load Balancers
   - Makes a pod accessible from the outside a cluster. `This is the right way to exposes a pod to the outside world`

MOST USED

3. External Name
   - Redirects an in-cluster requests to a CNAME url. More advanced



#### Node Port Service

- Example of YAML FiLE

```yaml
apiVersion: v1
kind: Service
metadata:
  name: posts-srv
spec:
  type: NodePort
  selector:
    app: posts
  ports:
    - name: posts
      protocol: TCP
      port: 4000 # port unto which we are sending top SRV
      targetPort: 4000 # actual port our application is listening on
```


N/B:  To access the site via `NodePort/ Load Balances`  Service depends if you are using `Docker for Mac/Windows ->  http://localhost:3xxxx/posts` and for `Docker Toolbox with Minikube -> <som_ip>:3xxxx/posts`. To get `<some_ip>:  Run $ minikube ip`

#### Cluster IP Services
- Allows communication between Pods within a cluster






## Procedures to Use
1. Build and Images of <app e.g event-bus>
2. Push the image to docker hub
3. Create a deployment for <Event-Bus>
4. Create Cluster  IP Services for <Event-Bus-and-posts>
5. Apply the change to kubernetes


### LOAD BALANCERS
The right way to exposes  the service to outside the cluster.

> `Load Balance` - >Tells kubernetes to reach out to its provider and provision a load balancer. Gets traffic to a single pod.
> `Ingress or Ingress Controller` -> a pod with a set of routing rules to distribute  traffic to other services.


## Full Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: event-bus-depl
spec:
  replicas: 20
  selector:
    matchLabels:
      app: event-bus #linking with pod
  template:
    metadata:
      labels:
        app: event-bus #linking pod with selector
    spec:
      containers:
        - name: event-bus # container name
          image: domambia/simple-event #image from docker hub
---
# Service to allow communicatio within  the application
apiVersion: v1
kind: Service
metadata:
  name: event-bus-srv
spec:
  selector:
    app: event-bus

  ports:
    - name: event-bus
      protocol: TCP
      port: 4001
      targetPort: 4001
```



## Ingress Nginx Configurations
To setup ingress-nginx to to (Kubernetes Ingress Nginx)[https://kubernetes.github.io/ingress-nginx/]

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: ingress-service
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/use-regex: "true"
spec:
  rules:
    - host: ticketing.dev
      http:
        paths:
          - path: /api/users/?(.*)
            backend:
              serviceName: auth-srv
              servicePort: 3000
			path: /?(.*)
            backend:
              serviceName: ui-srv
              servicePort: 3000
```


## Skaffold

- Skaffold helps in development and 


```yaml
apiVersion: skaffold/v2alpha3
kind: Config
deploy:
  kubectl:
    manifests:
      - ./infra/k8s/*
build:
  local:
    push: false
  artifacts:
    - image: domambia/tickening-auth
      context: auth # folder contain all this files
      docker:
        dockerfile: Dockerfile
      sync:
        manual:
          - src: "src/**/*.ts" #find all files ending with .ts
            dest: .
```