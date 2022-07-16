
const getUser = {
    get: {
        tags: ['User'],
        description: "Get prefrentce list",
        operationId: "getPreference",
        parameters: [],
        security: [
            {
                "Bearer": []
            }
        ],
        responses: {
            '201': {
                description: "Success"
            },
            '500': {
                description: 'Server error'
            }
        }
    }
}

export default getUser