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