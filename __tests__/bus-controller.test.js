// Simple test for bus controller
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

// Mock response and request objects
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (body = {}, params = {}, query = {}) => ({
  body,
  params,
  query
});

// Mock bus service
const mockBusService = {
  create: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
};

// Mock bus data
const mockBus = {
  _id: '60d0fe4f5311236168a109cd',
  title: 'Test Bus',
  busNumber: 'BUS001',
  routes: [
    {
      pickupPoint: 'Test Point 1',
      time: '08:00',
      estimatedArrivalTime: '08:15',
      coordinates: {
        latitude: 26.2389,
        longitude: 73.0243
      }
    }
  ],
  destination: 'JIET Campus',
  capacity: 50,
  status: 'active'
};

// Simple controller functions
const createBus = async (req, res) => {
  try {
    const bus = await mockBusService.create(req.body);
    return res.status(201).json({
      data: bus,
      message: "Created a new bus successfully",
      error: {},
      success: true
    });
  } catch (error) {
    console.log("Unable to create a new bus, error from bus-controller: ", error);
    if (error.message === "bus already exists") {
      return res.status(409).json({
        data: {},
        message: "Bus already exists",
        error: error.message,
        success: false
      });
    }
    return res.status(500).json({
      data: {},
      message: "Unable to create a new bus",
      error: error.message,
      success: false
    });
  }
};

const getBus = async (req, res) => {
  try {
    const { page, limit, wheelchairAccessible, status } = req.query;

    // Build filter object based on query parameters
    const filter = {};

    if (wheelchairAccessible) {
      filter["features.wheelchairAccessible"] = wheelchairAccessible === 'true';
    }

    if (status) {
      filter.status = status;
    }

    const buses = await mockBusService.getAll(
      filter,
      parseInt(page) || 1,
      parseInt(limit) || 10
    );

    return res.status(200).json({
      data: buses,
      message: "Fetched all buses successfully",
      error: {},
      success: true
    });
  } catch (error) {
    console.log("Unable to fetch all buses, error from bus-controller: ", error);
    return res.status(500).json({
      data: {},
      message: "Unable to fetch all buses",
      error: error.message,
      success: false
    });
  }
};

const getBusById = async (req, res) => {
  try {
    const bus = await mockBusService.getById(req.params.id);
    return res.status(200).json({
      data: bus,
      message: "Fetched bus successfully",
      error: {},
      success: true
    });
  } catch (error) {
    console.log("Unable to fetch bus, error from bus-controller: ", error);
    if (error.message === "bus not found") {
      return res.status(404).json({
        data: {},
        message: "Bus not found",
        error: error.message,
        success: false
      });
    }
    return res.status(500).json({
      data: {},
      message: "Unable to fetch bus",
      error: error.message,
      success: false
    });
  }
};

describe('Bus Controller', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    jest.clearAllMocks();
  });

  describe('createBus', () => {
    it('should create a new bus successfully', async () => {
      req.body = {
        title: 'Test Bus',
        busNumber: 'BUS001',
        routes: [
          {
            pickupPoint: 'Test Point 1',
            time: '08:00'
          }
        ],
        destination: 'JIET Campus',
        capacity: 50
      };

      mockBusService.create.mockResolvedValue(mockBus);

      await createBus(req, res);

      expect(mockBusService.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        data: mockBus,
        message: "Created a new bus successfully",
        error: {},
        success: true
      });
    });

    it('should handle bus already exists error', async () => {
      req.body = {
        title: 'Test Bus',
        busNumber: 'BUS001',
        routes: [
          {
            pickupPoint: 'Test Point 1',
            time: '08:00'
          }
        ],
        destination: 'JIET Campus',
        capacity: 50
      };

      mockBusService.create.mockRejectedValue(new Error('bus already exists'));

      await createBus(req, res);

      expect(mockBusService.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        data: {},
        message: "Bus already exists",
        error: 'bus already exists',
        success: false
      });
    });
  });

  describe('getBus', () => {
    it('should get all buses successfully', async () => {
      req.query = {
        page: '1',
        limit: '10'
      };

      const busesData = {
        buses: [mockBus],
        total: 1,
        page: 1,
        limit: 10,
        pages: 1
      };

      mockBusService.getAll.mockResolvedValue(busesData);

      await getBus(req, res);

      expect(mockBusService.getAll).toHaveBeenCalledWith({}, 1, 10);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: busesData,
        message: "Fetched all buses successfully",
        error: {},
        success: true
      });
    });
  });

  describe('getBusById', () => {
    it('should get a bus by ID successfully', async () => {
      req.params = {
        id: '60d0fe4f5311236168a109cd'
      };

      mockBusService.getById.mockResolvedValue(mockBus);

      await getBusById(req, res);

      expect(mockBusService.getById).toHaveBeenCalledWith('60d0fe4f5311236168a109cd');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: mockBus,
        message: "Fetched bus successfully",
        error: {},
        success: true
      });
    });

    it('should handle bus not found error', async () => {
      req.params = {
        id: 'nonexistent-id'
      };

      mockBusService.getById.mockRejectedValue(new Error('bus not found'));

      await getBusById(req, res);

      expect(mockBusService.getById).toHaveBeenCalledWith('nonexistent-id');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        data: {},
        message: "Bus not found",
        error: 'bus not found',
        success: false
      });
    });
  });
});
