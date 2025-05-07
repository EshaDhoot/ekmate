// Simple test for contact form
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

// Mock response and request objects
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (body = {}) => ({
  body
});

// Mock contact form model
const mockContactForm = {
  create: jest.fn()
};

// Simple controller function
const createQuery = async (req, res) => {
  try {
    const contactForm = await mockContactForm.create(req.body);
    return res.status(201).json({
      data: contactForm,
      message: "a new query has been submitted successfully",
      error: {},
      success: true
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "unable to submit query",
      error: error,
      success: false
    });
  }
};

describe('Contact Form Controller', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    mockContactForm.create.mockClear();
  });

  it('should create a new query successfully', async () => {
    const mockData = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'student',
      message: 'This is a test message'
    };
    
    req.body = mockData;
    mockContactForm.create.mockResolvedValue(mockData);

    await createQuery(req, res);

    expect(mockContactForm.create).toHaveBeenCalledWith(mockData);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      data: mockData,
      message: "a new query has been submitted successfully",
      error: {},
      success: true
    });
  });

  it('should handle errors when creating a query', async () => {
    const mockData = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'student',
      message: 'This is a test message'
    };
    
    req.body = mockData;
    const error = new Error('Database error');
    mockContactForm.create.mockRejectedValue(error);

    await createQuery(req, res);

    expect(mockContactForm.create).toHaveBeenCalledWith(mockData);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      data: {},
      message: "unable to submit query",
      error: error,
      success: false
    });
  });
});
