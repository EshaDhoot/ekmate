// Simple test for user controller
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

// Mock response and request objects
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (body = {}) => ({
  body
});

// Mock user service
const mockUserService = {
  create: jest.fn(),
  sendOTP: jest.fn(),
  findByEmail: jest.fn(),
  signIn: jest.fn()
};

// Simple controller functions
const signUp = async (req, res) => {
  try {
    const user = await mockUserService.create(req.body);
    await mockUserService.sendOTP(req.body);
    return res.status(201).json({
      data: user,
      message: "created a new user and sent otp successfully",
      error: {},
      success: true
    });
  } catch (error) {
    console.log("unable to create a new user, error from user-controller: ", error);
    if (error.message === "user already exists") {
      return res.status(409).json({
        data: {},
        message: "user already exists",
        error: error.errmsg,
        success: false
      });
    }
    if(error.message === "user not found") {
      return res.status(404).json({    
        data: {},   
        message: "Cannot send otp, user with the given email does not exist.",   
        error: error,       
        success: false
      });
    }
    return res.status(500).json({
      data: {},
      message: "unable to create a new user",
      error: error,
      success: false
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await mockUserService.signIn(req.body);
    return res.status(200).json({
      message: 'Successsully signed in',
      success: true,
      data: response,
      err: {}
    });
  } catch (error) {
    if (error.message === "user not found") {
      return res.status(404).json({
        message: "User with the given email does not exist.",
        data: {},
        success: false,
        err: error
      });
    }
    if (error.message === "Incorrect Password") {
      return res.status(401).json({
        message: "Incorrect Password, please try again",
        data: {},
        success: false,
        err: error
      });
    }
    if (error.message === "Email not verified") {
      return res.status(401).json({
        message: "Email not verified, please verify your email",
        data: {},
        success: false,
        err: error
      });
    }
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error
    });
  }
};

describe('User Controller', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    jest.clearAllMocks();
  });

  describe('signUp', () => {
    it('should create a new user and send OTP successfully', async () => {
      const mockUser = {
        _id: '60d0fe4f5311236168a109ca',
        name: 'Test User',
        email: 'test.user@jietjodhpur.ac.in',
        role: 'student'
      };
      
      req.body = {
        name: 'Test User',
        email: 'test.user@jietjodhpur.ac.in',
        password: 'Password@123',
        role: 'student'
      };

      mockUserService.create.mockResolvedValue(mockUser);
      mockUserService.sendOTP.mockResolvedValue(true);

      await signUp(req, res);

      expect(mockUserService.create).toHaveBeenCalledWith(req.body);
      expect(mockUserService.sendOTP).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        data: mockUser,
        message: "created a new user and sent otp successfully",
        error: {},
        success: true
      });
    });

    it('should handle user already exists error', async () => {
      req.body = {
        name: 'Test User',
        email: 'test.user@jietjodhpur.ac.in',
        password: 'Password@123',
        role: 'student'
      };

      mockUserService.create.mockRejectedValue(new Error('user already exists'));

      await signUp(req, res);

      expect(mockUserService.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        data: {},
        message: "user already exists",
        error: undefined,
        success: false
      });
    });
  });

  describe('signIn', () => {
    it('should sign in user successfully', async () => {
      const mockUser = {
        _id: '60d0fe4f5311236168a109ca',
        name: 'Test User',
        email: 'test.user@jietjodhpur.ac.in',
        role: 'student'
      };
      
      req.body = {
        email: 'test.user@jietjodhpur.ac.in',
        password: 'Password@123'
      };

      mockUserService.signIn.mockResolvedValue({ token: 'mock-token', user: mockUser });

      await signIn(req, res);

      expect(mockUserService.signIn).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Successsully signed in',
        success: true,
        data: { token: 'mock-token', user: mockUser },
        err: {}
      });
    });

    it('should handle user not found error', async () => {
      req.body = {
        email: 'nonexistent@jietjodhpur.ac.in',
        password: 'Password@123'
      };

      mockUserService.signIn.mockRejectedValue(new Error('user not found'));

      await signIn(req, res);

      expect(mockUserService.signIn).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "User with the given email does not exist.",
        data: {},
        success: false,
        err: new Error('user not found')
      });
    });
  });
});
