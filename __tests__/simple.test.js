// Simple test file
import { jest, describe, it, expect } from '@jest/globals';

describe('Simple Tests', () => {
  it('should add two numbers correctly', () => {
    expect(1 + 2).toBe(3);
  });

  it('should concatenate strings correctly', () => {
    expect('Hello ' + 'World').toBe('Hello World');
  });

  it('should work with arrays', () => {
    const arr = [1, 2, 3];
    expect(arr).toHaveLength(3);
    expect(arr).toContain(2);
  });

  it('should work with objects', () => {
    const obj = { name: 'Test', value: 42 };
    expect(obj).toHaveProperty('name', 'Test');
    expect(obj.value).toBe(42);
  });

  it('should work with mocks', () => {
    const mockFn = jest.fn();
    mockFn('test');
    expect(mockFn).toHaveBeenCalledWith('test');
  });
});
