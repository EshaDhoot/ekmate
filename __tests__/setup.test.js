// Test to verify the testing setup is working correctly
import { jest, describe, it, expect } from '@jest/globals';

describe('Testing Setup', () => {
  it('should work correctly', () => {
    expect(true).toBe(true);
  });

  it('should have mocked console.log', () => {
    console.log('This should be mocked');
    expect(console.log).toHaveBeenCalledWith('This should be mocked');
  });

  it('should have environment variables set', () => {
    expect(process.env.PORT).toBe('4001');
    expect(process.env.SECRET_KEY).toBe('test_secret_key');
  });
});
