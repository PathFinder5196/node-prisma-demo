import sendgrid from '@sendgrid/mail';
sendgrid.setApiKey(process.env.SENDGRID_API_KEY!)

export async function sendEmailToken(email: string, subject: string, body: string) {
    const msg = {
        to: email,
        from: 'demo@gmail.com',
        subject,
        text: body,
    }
    await sendgrid.send(msg)
}