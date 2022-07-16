
const signin = {
    post: {
        tags: ['auth'],
        description: "Signin",
        operationId: "Signin",
        parameters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/Signin'
                    }
                }
            }
        },
        responses: {
            '201': {
                description: "Signed In successfully"
            },
            '400': {
                description: "Invalid Credential"
            },
            '500': {
                description: 'Server error'
            }
        }
    }
}

export default signin