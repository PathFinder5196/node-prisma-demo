
const resendActivationToken = {
    post: {
        tags: ['auth'],
        description: "resend-activation-token",
        operationId: "resend-activation-token",
        parameters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/ResendActivationToken'
                    }
                }
            }
        },
        responses: {
            '201': {
                description: "Please check your mail for activation code"
            },
            '400': {
                description: "User not found"
            },
            '500': {
                description: 'Server error'
            }
        }
    }
}

export default resendActivationToken