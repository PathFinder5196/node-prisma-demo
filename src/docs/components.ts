
const components = {
    components: {
        schemas: {
            id: {
                type: 'string',
                description: "An id of a todo",
                example: "tyVgf"
            },
            Signup: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: "Name of user",
                        example: "Jon Doe"
                    },
                    email: {
                        type: 'string',
                        description: "Email address of User",
                        example: "jondoe@gmail.com"
                    },
                    password: {
                        type: 'string',
                        description: "Password - Min 8 character",
                        example: "Test@123"
                    },
                    dob: {
                        type: "string",
                        format: 'date',
                        description: "Date of birth",
                        example: "07-14-2022"
                    }
                }
            },
            Signin: {
                type: 'object',
                properties: {
                    email: {
                        type: 'string',
                        description: "Email address of User",
                        example: "jondoe@gmail.com"
                    },
                    password: {
                        type: 'string',
                        description: "Password - Min 8 character",
                        example: "Test@123"
                    },
                }
            },
            ActivateAccount: {
                type: 'object',
                properties: {
                    email: {
                        type: 'string',
                        description: "Email address of User",
                        example: "jondoe@gmail.com"
                    },
                    token: {
                        type: 'number',
                        description: "Token you received in email",
                        example: "12345678"
                    },
                }
            },
            ResendActivationToken: {
                type: 'object',
                properties: {
                    email: {
                        type: 'string',
                        description: "Email address of User",
                        example: "jondoe@gmail.com"
                    },
                }
            },
            ForgotPassword: {
                type: 'object',
                properties: {
                    email: {
                        type: 'string',
                        description: "Email address of User",
                        example: "jondoe@gmail.com"
                    },
                }
            },
            ResetPassword: {
                type: 'object',
                properties: {
                    token: {
                        type: 'string',
                        description: "Token you get from query string",
                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqdW5lZEBtYWlsaW5hdG9yLmNvbSIsImlhdCI6MTY1Nzg4OTU1Nn0.Xzpb310lyqEyEe-XxYRNXrJpOKw_bMRjFsedZdrO5hI"
                    },
                    password: {
                        type: 'string',
                        description: "New password",
                        example: "Test@123"
                    },
                },
            },
            AddPrefrence: {
                type: 'object',
                properties: {
                    preferenceId: {
                        type: 'number',
                        description: "Id of prefrene",
                        example: "1"
                    },
                }
            },
            Error: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    },
                    internal_code: {
                        type: 'string'
                    }
                }
            }
        },
        securitySchemes: {
            Bearer: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },
    }
}

export default components;