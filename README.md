# Web SDK Test App

This repo hosts a very basic test application to try and test out the full functionality of the [Web SDK](https://docs.loginid.io/).

## Requirements

- [NodeJS](https://nodejs.org/en/download/)
- npm (included with NodeJS)
- [Docker](https://docs.docker.com/get-docker/) (optional)

## Features

- Passkeys
- Email Verification (Magic Links)
- Credential Management

## Setup

Acquire a tenant `base URL` and `application ID` by creating a new [tenant](https://docs.loginid.io/Guides/Creating%20a%20New%20Tenant). Enter `http://localhost:3000` as the website URL since that is where the test app will be hosted on.

## How to Run

### NPM

The following commands will install the dependencies and run the test app.

```
npm install
npm start
```

### Docker

The following commands will build the app image and run it with Docker.

```
docker build -t web-example .
docker run -p 3000:3000 web-example
```

## How to Configure the Test App

After obtaining the tenant's `base URL` and `application ID`, follow these steps:

1. Enter the `application ID` in the `App ID` input field.
2. Enter the `base URL` in the `Base URL` input field.
3. Click the `Configure` button.
4. An alert box will display with the message: "New Web SDK Configured."

Your app is now configured. You can start using the SDK!
