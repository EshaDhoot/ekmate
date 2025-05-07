# EKmate Backend

Backend API for the EKmate bus tracking and management system.

## Features

- User authentication and authorization
- Bus management
- Driver management
- Real-time bus tracking
- Feedback system
- User preferences
- Event management
- Maintenance scheduling
- Analytics

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ekmate_backend.git
cd ekmate_backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=4000
DB_URL=mongodb://localhost:27017/ekmate
SECRET_KEY=your_secret_key
EMAIL_ID=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
```

4. Start the server:

```bash
npm start
```

## API Documentation

The API is organized around RESTful principles. It uses standard HTTP response codes, authentication, and verbs.

### Base URL

```
http://localhost:4000/ekmate/api/v1
```

### Authentication

The API uses JWT (JSON Web Tokens) for authentication. To authenticate, include the JWT token in the Authorization header:

```
Authorization: Bearer your_jwt_token
```

### Endpoints

- `/auth/sign-up` - Register a new user
- `/auth/verify-otp` - Verify OTP for email verification
- `/auth/sign-in` - Sign in and get JWT token
- `/buses` - Bus management
- `/drivers` - Driver management
- `/feedback` - Feedback system
- `/user-preferences` - User preferences
- `/events` - Event management
- `/maintenance` - Maintenance scheduling
- `/analytics` - Analytics

## Testing

The project includes unit and integration tests using Jest.

### Running Tests

To run all tests:

```bash
npm test
```

To run tests in watch mode:

```bash
npm run test:watch
```

To generate test coverage report:

```bash
npm run test:coverage
```

### Test Structure

The tests are organized as follows:

- `__tests__/simple.test.js` - Simple tests to verify the testing setup
- `__tests__/bus-controller.test.js` - Tests for the bus controller
- `__tests__/contact-form.test.js` - Tests for the contact form controller
- `__tests__/user-controller.test.js` - Tests for the user controller
- `__tests__/auth-middleware.test.js` - Tests for the authentication middleware
- `__tests__/setup.test.js` - Tests for the testing setup

Each test file is self-contained and includes all the necessary mocks and utilities.

## Project Structure

```
ekmate_backend/
├── src/
│   ├── config/
│   │   ├── db-config.js
│   │   └── server-config.js
│   ├── controllers/
│   │   ├── bus-controller.js
│   │   ├── contact-form-controller.js
│   │   ├── driver-controller.js
│   │   ├── feedback-controller.js
│   │   ├── user-controller.js
│   │   └── ...
│   ├── helpers/
│   │   ├── OTP-helper.js
│   │   └── ...
│   ├── middlewares/
│   │   ├── auth-middleware.js
│   │   ├── validation-middleware.js
│   │   └── ...
│   ├── models/
│   │   ├── bus-model.js
│   │   ├── contact-form-model.js
│   │   ├── driver-model.js
│   │   ├── feedback-model.js
│   │   ├── user-model.js
│   │   └── ...
│   ├── repositories/
│   │   ├── bus-repository.js
│   │   ├── driver-repository.js
│   │   ├── feedback-repository.js
│   │   ├── user-repository.js
│   │   └── ...
│   ├── routes/
│   │   ├── v1/
│   │   │   ├── bus-routes.js
│   │   │   ├── contact-form-routes.js
│   │   │   ├── driver-routes.js
│   │   │   ├── feedback-routes.js
│   │   │   ├── user-routes.js
│   │   │   └── ...
│   │   └── index.js
│   ├── services/
│   │   ├── bus-service.js
│   │   ├── driver-service.js
│   │   ├── feedback-service.js
│   │   ├── user-service.js
│   │   └── ...
│   └── index.js
├── __tests__/
│   ├── simple.test.js
│   ├── bus-controller.test.js
│   ├── contact-form.test.js
│   ├── user-controller.test.js
│   ├── auth-middleware.test.js
│   ├── setup.test.js
│   └── README.md
├── .env
├── .gitignore
├── jest.setup.js
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
