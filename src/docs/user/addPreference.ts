
const addPrefrence = {
    post: {
        tags: ['User'],
        description: "Add user prefrentce list",
        operationId: "addUserPreference",
        parameters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/AddPrefrence'
                    }
                }
            }
        },
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

export default addPrefrence