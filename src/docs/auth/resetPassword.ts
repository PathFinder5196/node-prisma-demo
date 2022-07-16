
const resetPassword = {
    post: {
        tags: ['auth'],
        description: "Reset Password",
        operationId: "Reset Password API",
        parameters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/ResetPassword'
                    }
                }
            }
        },
        responses: {
            '201': {
                description: "Password set successfully"
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

export default resetPassword