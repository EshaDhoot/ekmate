// Simple test for authentication middleware
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

// Mock response and request objects
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (headers = {}) => ({
  headers
});

// Mock next function
const mockNext = jest.fn();

// Mock user and driver data
const mockUser = {
  _id: '60d0fe4f5311236168a109ca',
  name: 'Test User',
  email: 'test.user@jietjodhpur.ac.in',
  role: 'student'
};

const mockAdmin = {
  _id: '60d0fe4f5311236168a109cb',
  name: 'Admin User',
  email: 'admin@jietjodhpur.ac.in',
  role: 'admin'
};

// Mock jwt and models
const mockJwt = {
  verify: jest.fn()
};

const mockUserModel = {
  findById: jest.fn()
};

const mockDriverModel = {
  findById: jest.fn()
};

// Simple middleware functions
const authenticateJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        message: "No auth token provided",
        data: {},
        success: false,
        err: "Authentication required"
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        message: "Invalid auth token format",
        data: {},
        success: false,
        err: "Authentication required"
      });
    }
    
    const decoded = mockJwt.verify(token, 'test_secret_key');
    
    // Check if the token is for a user or a driver
    if (decoded.role === 'driver') {
      const driver = await mockDriverModel.findById(decoded.id);
      
      if (!driver) {
        return res.status(401).json({
          message: "Driver not found",
          data: {},
          success: false,
          err: "Authentication failed"
        });
      }
      
      req.user = driver;
      req.userType = 'driver';
    } else {
      const user = await mockUserModel.findById(decoded.id);
      
      if (!user) {
        return res.status(401).json({
          message: "User not found",
          data: {},
          success: false,
          err: "Authentication failed"
        });
      }
      
      req.user = user;
      req.userType = 'user';
    }
    
    next();
  } catch (error) {
    console.log("Authentication error: ", error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: "Token expired",
        data: {},
        success: false,
        err: "Authentication required"
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: "Invalid token",
        data: {},
        success: false,
        err: "Authentication required"
      });
    }
    
    return res.status(500).json({
      message: "Authentication error",
      data: {},
      success: false,
      err: error.message
    });
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (req.userType === 'driver') {
      return res.status(403).json({
        message: "Access denied. Drivers cannot perform this action.",
        data: {},
        success: false,
        err: "Authorization failed"
      });
    }
    
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: "Access denied. Admin role required.",
        data: {},
        success: false,
        err: "Authorization failed"
      });
    }
    
    next();
  } catch (error) {
    console.log("Authorization error: ", error);
    return res.status(500).json({
      message: "Authorization error",
      data: {},
      success: false,
      err: error.message
    });
  }
};

describe('Authentication Middleware', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    mockNext.mockClear();
    mockJwt.verify.mockClear();
    mockUserModel.findById.mockClear();
    mockDriverModel.findById.mockClear();
  });

  describe('authenticateJWT', () => {
    it('should authenticate a valid user token', async () => {
      req.headers = {
        authorization: 'Bearer valid-token'
      };

      mockJwt.verify.mockReturnValue({ id: '60d0fe4f5311236168a109ca', role: 'student' });
      mockUserModel.findById.mockResolvedValue(mockUser);

      await authenticateJWT(req, res, mockNext);

      expect(mockJwt.verify).toHaveBeenCalledWith('valid-token', 'test_secret_key');
      expect(mockUserModel.findById).toHaveBeenCalledWith('60d0fe4f5311236168a109ca');
      expect(mockNext).toHaveBeenCalled();
      expect(req.user).toEqual(mockUser);
      expect(req.userType).toBe('user');
    });

    it('should return 401 if no auth token is provided', async () => {
      req.headers = {};

      await authenticateJWT(req, res, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "No auth token provided",
        data: {},
        success: false,
        err: "Authentication required"
      });
    });
  });

  describe('isAdmin', () => {
    it('should allow admin users', () => {
      req.user = mockAdmin;
      req.userType = 'user';

      isAdmin(req, res, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should deny non-admin users', () => {
      req.user = mockUser;
      req.userType = 'user';

      isAdmin(req, res, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: "Access denied. Admin role required.",
        data: {},
        success: false,
        err: "Authorization failed"
      });
    });
  });
});
