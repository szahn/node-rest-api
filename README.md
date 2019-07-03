# Node Rest API

A simple node rest API in Typescript.

## API

### Start

To start the server, run `make run`

### Endpoints

POST /users
GET /events
POST /events

### Consuming

To create a user, run:

```bash
curl -d '{"email":"stuart.zahn@gmail.com", "password":"123"}' -H "Content-Type: application/json" -X POST http://localhost:3000/users
```

To create an event:

```bash
curl -d '{"type":"LOGIN"}' -H "Content-Type: application/json" -X POST http://localhost:3000/events
```

To get all events:

```bash
curl http://localhost:3000/events
```

To get events by user:

```bash
curl http://localhost:3000/events?userId=abc
```

To get events in the last day:

```bash
curl http://localhost:3000/events?sinceDays=1
```
## Improvments

- Make data calls async
- Sanitize input data
- Add unit tests and mocks
- Configure with environment variables
- Secure with certs from Let's Encrypt
- Add proper OAuth authentication
- Persist data layer to sql
- Build to docker container
- Support additional content types (such as XML)
- Add gRPC endpoints for binary support
- Use logging library (such as Honeycomb)
