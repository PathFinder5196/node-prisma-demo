
const forgotPassword = {
    post: {
        tags: ['auth'],
        description: "Forgot Password",
        operationId: "Forgot Password API",
        parameters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/ForgotPassword'
                    }
                }
            }
        },
        responses: {
            '201': {
                description: "Please check your mail for reset password link"
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

export default forgotPassword