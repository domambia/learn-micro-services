# Microservice Architecture

## Challenges of Microservices
   
1. Handling of data within the services
2. There are different ways of sharing data between service. (`Async and Sync Comm`). We are going to user focus on `Async Communication`.
3. Async Communication focuses on communicating changes using events sent to an event bus.
4. Async Communication encourages each service to be 100% self-sufficient. Relatively easy to handle tempory downtime or new service creation.
5. Docker makes it easy package up services
6. Kubernetes is a pain to setup, buts makes it really easy to deploy +  scale service.



# Painful Things Through App #1

- Losts of duplicate code -> `Solution =>` Build a central library as NPM module to share code betwen  our different service /apps
- Really hard to picture the flow of events between  events. -> `Solution =>` Precisely define all events in this shared library.
- Really hard to remember properties and event should have -> `Solution =>` Write everything in typescript.
- Really hard to test some of event flows ->  `Solution =>` Write test as much as possible /reasonable
- My machine is getting laggy running kubernetes and everything else ->  `Solution =>` Run k8s cluster in the cloud and develop on it almost as quickly as local.
- What if someone created a comment after editing 5 others after editing post while balancing on a tight rope -> `Solution =>` Introduce a lot of code to handle concurrency issues.


## Overview Of Ticketing App(e.g StubHub) 

> Some how similar to stubhub application. Ticketing application

### Business RULES

1. Users can list tickets for events(concert, sports) for sale.
2. Other user can purchase this tickets
3. Any user can list tickets for sale and pucharse tickets
4. When a user attempts to purchase a ticket, the ticket if locked for `15 minutes`.  The user has 15 minutes to enter their payment information.
5. While locked, no other user can purchase the ticket. After 15 minutes the ticket should unlock. If locked will no be listed to user
6. Ticket prices can be edited if they are not locked.


### Resource Type

> User[email: string , password: string]
> Ticket[title: string, price: number, userId: Ref to User, OrderId: Ref to Order, ]
> Order [userId: Ref to User, status: [created| Cancelled|Awaiting Payment | completed], ticketId: Ref to Ticket, expiresAt: Date]
> Charge: [orderId: Ref to Order, status: [Created |  Failed |  Completed], amount:  number, stripeId: string,*stripedRefundId: string  ]


### Service Types

1. `auth`  -> srv to handle everything related to user signup/signin/signout and etc
2. `tickects` ->  srv for creation/editing. Knows whether  a ticket can be updated.
3. `orders` -> srv for Order creation/editing.
4. `expiration` -> srv watches for orders to be created, cancels them after 15 minutes.
5. `payments` -> Handle credit cards payments. Cancels orders if payment fails, completes if payments succeeds   


### EVENTS IN APP(Ticketing)

User 	-> UserCreated, 
Order 	-> OrderCreated, OrderCancelled, OrderExpired 
Ticket	-> TicketUpdated, TickedCreated
Charge 	-> ChargeCreated

