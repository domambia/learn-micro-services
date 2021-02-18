# Ticketing App

## Auth-srv
Routes:
	1. /api/users/signup 		-> POST ->  {email, and password}
	2. /api/users/signin 		-> POST ->  {email, and password}
	3. /api/users/signout		-> POST -> 	{}
	4. /api/users/currentuser	-> GET	->  -

<!-- *thisisunsafe*  for dev -->



## Error Handling 
1. We must have a consitent structure response from all services not matter what went wrong -> `Solution =>`  Write an error handling middleware
2. A billion things can go wrong, not just validation of inputs to request handler. Each of these  need to be handled consistently. ->  `Solution =>` Capture all then errors and pass them to express

## User Authentication 

- This is `unsolved problem` in microservices

### Solutions
	1. Fundamental Option #1
		- a service needs to share information by syncing information from the authentication.
		- Errors:
          		- If the auth srv goes down then there will be no authentication


## Secret Keys

We create another `Object` called `Secret` that stores a `key-pair`

```bash
$ kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
```

## Testing Isolated Microservices

- How will our tests be done
  1. `Testing a single piece of code in isolation`  => Single middleware
  2. `Test how different pieces of code work together`. => Request following throw multiple middlewares to a request handler
  3. `Test how different components work together` => Make a request to a service ensure write to a database was completed.
  4. `Test how different service work together` =>  Creating a payment at the `payments` services should affect  the `orders` service


### Testing Goals
1. Basic Request Handling 
2. Some tests around models
3. Recieving and emitting Events

### How do run Test 
- We running test directly from our terminal without using docker
- This implies that our local environment is capable of running each service
- Simple enough, but more complex projects might make this hard!!


Note:
	- Add `npm run test`  to use `Jest` testing library
	- Start `in-memory` copy of mongodb
	- Start up our express app
	- User supertest library to make fake requests to our express app
	- Run assertions to make sure that our request did the right thing
	- 
domambia.azurecr.io