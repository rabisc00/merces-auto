export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bus API',
      version: '1.0.0',
      description: 'API for managing buses in the system',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Access Denied'
                  }
                }
              }
            }
          }
        },
        InvalidToken: {
          description: 'Invalid or expired token',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Invalid token'
                  }
                }
              }
            }
          }
        },
        InternalServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'An unexpected error occurred. Please try again later.'
                  }
                }
              }
            }
          }
        },
        InvalidInput: {
          description: 'Invalid input data',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'object',
                    properties: {
                      fieldName: {
                        type: 'string',
                        example: 'Invalid input: expected string, received undefined'
                      }
                    }
                  }
                }
              }
            }
          }
        },
        ConflictError: {
          description: 'Conflict',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'object',
                    properties: {
                      fieldName: {
                        type: 'string',
                        example: 'Resource already exists'
                      }
                    }
                  }
                }
              }
            }
          }
        },
        NotFoundError: {
          description: 'Not Found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Resource not foundd'
                  }
                }
              }
            }
          }
        },
        CreatedSuccessfully: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Success'
                  },
                  id: {
                    type: 'string',
                    format: 'uuid',
                    example: '1a2b3c4d-5678-90ab-cdef-1234567890ab'
                  }
                }
              }
            }
          }
        }
      },
      schemas: {
        Bus: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            busNumber: { type: 'string' },
            model: { type: 'string' },
            inRepair: { type: 'boolean' }
          }
        },
        BusRoutes: {
          type: 'object',
          properties: {
            id: { 
              type: 'string',
              format: 'uuid'
            },
            distanceInKm: { type: 'integer' },
            averageTimeInMinutes: { type: 'integer' },
            lineNumber: { type: 'string' },
            origin: {type: 'string' },
            destination: { type: 'string' }
          }
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            documentNumber: { type: 'string' },
            name: { type: 'string' },
            picture: { type: 'string' },
            active: { type: 'boolean' }
          }
        },
        Timetable: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            arrivalTime: {
              type: 'string',
              format: 'date-time'
            },
            departureTime: {
              type: 'string',
              format: 'date-time'
            },
            routeId: {
              type: 'object',
              properties: {
                lineNumber: { type: 'string' },
                origin: { type: 'string' },
                destination: { type: 'string' }
              }
            }
          }
        }, 
        Trip: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            numberOfPassengers: { type: 'integer' },
            timetable: {
              type: 'object',
              properties: {
                arrivalTime: {
                  type: 'string',
                  format: 'date-time'
                },
                departureTime: {
                  type: 'string',
                  format: 'date-time'
                },
                busRoute: {
                  type: 'object',
                  properties: {
                    lineNumber: { type: 'string' },
                    origin: { type: 'string' },
                    destination: { type: 'string' }
                  }
                }
              }
            }
          }
        },
        WorkingHours: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            startTime: {
              type: 'string',
              format: 'date-time'
            },
            endTime: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        BusDetails: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            busNumber: { type: 'string' },
            model: { type: 'string', nullable: true },
            capacity: { type: 'integer', nullable: true },
            manufacturingYear: { type: 'integer', nullable: true },
            inRepair: { type: 'boolean', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        BusRouteDetails: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            lineNumber: { type: 'string' },
            distanceInKm: { type: 'integer' },
            averageTimeInMinutes: { type: 'integer' },
            origin: { type: 'string' },
            destination: { type: 'string'}
          }
        },
        UserDetails: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                format: 'uuid'
              },
              name: { type: 'string' },
              email: { type: 'string' },
              documentNumber: { type: 'string' },
              picture: { type: 'string' },
              active: { type: 'boolean' },
              createdAt: { 
                type: 'string',
                format: 'date-time'
              },
              updatedAt: {
                type: 'string',
                format: 'date-time'
              }
            }
        },
        TimetableDetails: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            arrivalTime: {
              type: 'string',
              format: 'date-time'
            },
            departureTime: {
              type: 'string',
              format: 'date-time'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        TripDetails: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            numberOfPassengers: { type: 'integer' },
            observations: { type: 'string' },
            bus: {
              type: 'object',
              properties: {
                busNumber: { type: 'string' },
                model: { type: 'string' },
                capacity: { type: 'integer' },
                manufacturingYear: { type: 'integer' }
              }
            },
            users: {
              type: 'object',
              properties: {
                email: { type: 'string' },
                documentNumber: { type: 'string' },
                name: { type: 'string' },
                picture: { type: 'string' },
                active: { type: 'boolean' }
              }
            },
            timetable: {
              type: 'object',
              properties: {
                arrivalTime: {
                  type: 'string',
                  format: 'date-time'
                },
                departureTime: {
                  type: 'string',
                  format: 'date-time'
                },
                busRoute: {
                  type: 'object',
                  properties: {
                    lineNumber: { type: 'string' },
                    origin: { type: 'string' },
                    destination: { type: 'string' },
                    distanceInKm: { type: 'integer' },
                    averageTimeInMinutes: { type: 'integer' }
                  }
                }
              }
            }
          }
        },
        WorkingHoursDetails: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid'
            },
            startTime: {
              type: 'string',
              format: 'date-time'
            },
            endTime: {
              type: 'string',
              format: 'date-time'
            },
            signature: { type: 'string' }
          }
        },
        BusInput: {
          type: 'object',
          required: ['busNumber'],
          properties: {
            busNumber: { type: 'string' },
            model: { type: 'string' },
            capacity: { type: 'integer' },
            manufacturingYear: { type: 'integer' },
          },
        },
        BusRouteInput: {
          type: 'object',
          required: ['lineNumber', 'origin', 'destination'],
          properties: {
            lineNumber: { type: 'string' },
            origin: { type: 'string' },
            destination: { type: 'string' }
          }
        },
        TimetableInput: {
          type: 'object',
          required: ['busRouteId', 'arrivalTime', 'departureTime', 'days'],
          properties: {
            busRouteId: {
              type: 'string',
              format: 'uuid'
            },
            arrivalTime: {
              type: 'string', 
              format: 'date-time'
            },
            departureTime: {
              type: 'string',
              format: 'date-time'
            },
            days: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        },
        UserInput: {
          type: 'object',
          required: ['email', 'password', 'name', 'documentNumber', 'active', 'isAdmin'],
          properties: {
            email: { 
              type: 'string',
              format: 'email'
            },
            password: {
              type: 'string',
              format: 'password'
            },
            documentNumber: { type: 'string' },
            name: { type: 'string' },
            isAdmin: { type: 'boolean' }
          }
        },
        TripInput: {
          type: 'object',
          required: ['numberOfPassengers', 'userId', 'busId', 'timetableId'],
          properties: {
            numberOfPassengers: { type: 'integer' },
            observations: { type: 'string' },
            userId: { 
              type: 'string',
              format: 'uuid'
            },
            busId: {
              type: 'string',
              format: 'uuid'
            },
            timetableId: {
              type: 'string',
              format: 'uuid'
            }
          }
        },
        WorkingHoursInput: {
          type: 'object',
          properties: {
            startTime: {
              type: 'string',
              format: 'date-time'
            },
            endTime: {
              type: 'string',
              format: 'date-time'
            },
            userId: {
              type: 'string',
              format: 'uuid'
            }
          }
        },
        BusUpdateInput: {
          type: 'object',
          properties: {
            model: { type: 'string' },
            capacity: { type: 'integer' },
            manufacturingYear: { type: 'integer' },
            inRepair: { type: 'boolean' },
          },
        },
        BusRouteUpdateInput: {
          type: 'object',
          properties: {
            lineNumber: { type: 'string' },
            origin: { type: 'string' },
            destination: { type: 'string' }
          }
        },
        TimetableUpdateInput: {
          type: 'object',
          properties: {
            arrivalTime: {
              type: 'string',
              format: 'date-time'
            },
            departureTime: {
              type: 'string',
              format: 'date-time'
            },
            days: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        },
        TripUpdateInput: {
          type: 'object',
          properties: {
            numberOfPassengers: { type: 'integer' },
            observations: { type: 'string' },
            userId: { 
              type: 'string',
              format: 'uuid'
            },
            busId: {
              type: 'string',
              format: 'uuid'
            },
            timetableId: {
              type: 'string',
              format: 'uuid'
            }
          }
        },
        WorkingHoursUpdateInput: {
          type: 'object',
          properties: {
            startTime: {
              type: 'string',
              format: 'date-time'
            },
            endTime: {
              type: 'string',
              format: 'date-time'
            }
          }
        }
      },
    },
    security: [{ bearerAuth: [] }],
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./src/routes/*.ts'], // Adjust to your actual file paths
};