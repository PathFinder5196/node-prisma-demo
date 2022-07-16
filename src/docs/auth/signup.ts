
const signup = {
    post: {
        tags: ['auth'],
        description: "Signup",
        operationId: "signup",
        parameters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/Signup'
                    }
                }
            }
        },
        responses: {
            '201': {
                description: "Account created successfully"
            },
            '400': {
                description: "Account already exists with same email"
            },
            '500': {
                description: 'Server error'
            }
        }
    }
}

export default signup