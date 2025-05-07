# EKmate Backend API Testing

This directory contains tests for the EKmate backend API. The tests are organized into unit tests and integration tests.

## Test Structure

- `__tests__/unit/`: Contains unit tests for individual components (controllers, services, middlewares)
- `__tests__/integration/`: Contains integration tests for API endpoints
- `__tests__/mocks/`: Contains mock data and mock implementations for testing

## Running Tests

To run all tests:

```bash
npm test
```

To run only unit tests:

```bash
npm run test:unit
```

To run only integration tests:

```bash
npm run test:integration
```

To run tests in watch mode (tests will re-run when files change):

```bash
npm run test:watch
```

To generate test coverage report:

```bash
npm run test:coverage
```

## Test Coverage

The test coverage report will be generated in the `coverage` directory. Open `coverage/lcov-report/index.html` in a browser to view the report.

## Writing Tests

### Unit Tests

Unit tests should test individual components in isolation. Dependencies should be mocked.

Example:

```javascript
// Unit test for a controller
import { someController } from '../../../src/controllers/some-controller.js';
import { mockRequest, mockResponse } from '../../testUtils.js';

// Mock the service
jest.mock('../../../src/services/some-service.js', () => {
  return jest.fn().mockImplementation(() => {
    return {
      someMethod: jest.fn().mockResolvedValue(someValue)
    };
  });
});

describe('Some Controller', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  it('should do something', async () => {
    // Setup
    req.body = { /* ... */ };

    // Execute
    await someController(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      // Expected response
    });
  });
});
```

### Integration Tests

Integration tests should test the API endpoints as a whole, including the request/response cycle.

Example:

```javascript
// Integration test for an endpoint
import request from 'supertest';
import express from 'express';
import { createTestApp } from '../../testUtils.js';

// Mock dependencies
jest.mock('../../../src/services/some-service.js', () => {
  // Mock implementation
});

// Create a test router with the routes
const router = express.Router();
import { someController } from '../../../src/controllers/some-controller.js';

router.post('/some-endpoint', someController);

const app = createTestApp(router);

describe('Some Endpoint', () => {
  it('should do something', async () => {
    const res = await request(app)
      .post('/ekmate/api/v1/some-endpoint')
      .send({
        // Request body
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      // Expected response
    });
  });
});
```
