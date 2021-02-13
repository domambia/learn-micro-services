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


### Common Commands

| Docker World  |  K8s World |   |
|---|---|---|---|---|
|docker ps   | kubectl get pods  |   |
|docker exec -it [container_id] [cmd]  | kubectl exec -it [pod_name] [cmd]   |   |
|docker logs [container_id]   | kubectl logs [pod_name]  |   |
|   |kubectl delete [pod_name]   |   |
|   |kubectl apply -f [config_file_name]   |   |
|   |kubectl describe pod [pod_name]   |   |
|   |kubectl describe service/deplolyment/node/pod [name]  |  |


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