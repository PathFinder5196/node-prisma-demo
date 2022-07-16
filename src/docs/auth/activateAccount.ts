
const activateAccount = {
    post: {
        tags: ['auth'],
        description: "activate-account",
        operationId: "activate-account",
        parameters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/ActivateAccount'
                    }
                }
            }
        },
        responses: {
            '201': {
                description: "Account activated successfully"
            },
            '401': {
                description: "Invalid Token"
            },
            '500': {
                description: 'Server error'
            }
        }
    }
}

export default activateAccount