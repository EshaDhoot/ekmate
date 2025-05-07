// jest.setup.js
// This file will be executed before running tests
import { jest } from '@jest/globals';

// Set up environment variables for testing
process.env.PORT = '4001'; // Use a different port for testing
process.env.DB_URL = 'mongodb://localhost:27017/ekmate_test';
process.env.SECRET_KEY = 'test_secret_key';
process.env.EMAIL_ID = 'test@example.com';
process.env.EMAIL_PASSWORD = 'test_password';

// Silence console logs during tests
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
};

// Increase the default timeout for all tests
jest.setTimeout(30000);
