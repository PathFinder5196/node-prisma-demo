import { Request, Response } from 'express';
import { add } from 'date-fns'
import prisma from '../client';
import { TokenType } from '@prisma/client';
import { Password } from '../utils/password';
import { sendEmailToken } from '../utils/sendEmail';
import { BadRequestError } from '../errors/bad-request-error';
import generateToken, { generateEmailToken } from '../utils/generateToken';

const EMAIL_TOKEN_EXPIRATION_MINUTES = 10

export const signUp = async (req: Request, res: Response) => {
    try {
        const { email, password: enteredPassword, name, dob } = req.body;

        const userExists = await prisma.user.findUnique({
            where: { email },
        });

        if (userExists) {
            throw new BadRequestError('Account already exists with same email');
        }

        const hash = await Password.toHash(enteredPassword);
        const user = await prisma.user.create({
            data: {
                password: hash,
                email,
                name,
                dob: new Date(dob)
            }
        });
        const tokenExpiration = add(new Date(), {
            minutes: EMAIL_TOKEN_EXPIRATION_MINUTES,
        })

        await prisma.token.create({
            data: {
                token: generateEmailToken(),
                type: TokenType.ACTIVATION,
                expiration: tokenExpiration,
                user: {
                    connect: {
                        email
                    },
                },
            },
        })

        const { password, ...newUser } = user;
        res.status(201).json({ success: true, data: newUser, message: 'Account is created succesfully' });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
};

export const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password: enteredPassword } = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new BadRequestError('Invalid Credentials');
        }

        // check for password match
        const isMatch = await Password.compare(user.password, enteredPassword);

        if (!isMatch) {
            throw new BadRequestError('Invalid Credentials');
        }

        const { password, createdAt, updatedAt, ...newUser } = user;

        const token = generateToken(user);

        res.status(200).json({ success: true, data: { ...newUser, token }, message: 'Signed in  succesfully' });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
};

export const activateAccount = async (req: Request, res: Response) => {
    try {
        const { email, token } = req.body
        const fetchedEmailToken = await prisma.token.findUnique({
            where: {
                token: token.toString(),
            },
            include: {
                user: true,
            },
        })

        if (!fetchedEmailToken?.valid) {
            return res.status(401).json({ success: false, message: 'Invalid Token' });
        }

        if (fetchedEmailToken.expiration < new Date()) {
            return res.status(401).json({ success: false, message: 'Token Expired' });
        }

        if (fetchedEmailToken?.user?.email === email) {
            await prisma.token.update({
                where: {
                    id: fetchedEmailToken.id,
                },
                data: {
                    valid: false,
                },
            })

            await prisma.user.update({
                where: {
                    email
                },
                data: {
                    isActive: true,
                },
            })
            const authToken = generateToken(fetchedEmailToken?.user);
            const { password, ...user } = fetchedEmailToken?.user
            return res.status(200).json({ success: true, data: { ...user, token: authToken } });
        } else {
            return res.status(400).json({ success: false, message: 'Account activated successfully' });
        }

    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
};

export const resendActivationToken = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const userExists = await prisma.user.findUnique({ where: { email } });

        if (!userExists) {
            throw new BadRequestError('User not found');
        }

        const tokenExpiration = add(new Date(), {
            minutes: EMAIL_TOKEN_EXPIRATION_MINUTES,
        })

        const token = generateEmailToken();

        await prisma.token.create({
            data: {
                token,
                type: TokenType.ACTIVATION,
                expiration: tokenExpiration,
                user: {
                    connect: {
                        email
                    },
                },
            },
        })

        await sendEmailToken(email, 'Activate Account', `The account activation token is: ${token}`);
        return res.status(200).json({ success: true, message: "Please check your mail for activation code" });

    } catch (e) {
        console.log(e)
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const userExists = await prisma.user.findUnique({ where: { email } });
        if (!userExists) {
            throw new BadRequestError('User not found');
        }

        const tokenExpiration = add(new Date(), {
            minutes: EMAIL_TOKEN_EXPIRATION_MINUTES,
        })

        const token = generateToken(userExists);
        await prisma.token.create({
            data: {
                token,
                type: TokenType.RESETPASSWORD,
                expiration: tokenExpiration,
                user: {
                    connect: {
                        email
                    },
                },
            },
        })

        await sendEmailToken(email, 'Reset Password', `http://localhost:8080/api/v1/auth/reset-password?token=${token}`);
        return res.status(200).json({ success: true, message: "Please check your mail for reset password link" });
    } catch (e) {
        console.log(e)
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token } = req.query;
        const { password } = req.body;

        if (!token) {
            throw new BadRequestError('Token not found');
        }

        const fetchedToken = await prisma.token.findUnique({
            where: {
                token: token.toString(),
            }
        })

        if (!fetchedToken) {
            throw new BadRequestError('Token not found');
        }

        if (!fetchedToken?.valid) {
            return res.status(401).json({ success: false, message: 'Invalid Token' });
        }

        if (fetchedToken.expiration < new Date()) {
            return res.status(401).json({ success: false, message: 'Token Expired' });
        }

        const hash = await Password.toHash(password);
        await prisma.user.update({
            where: {
                id: fetchedToken.userId
            },
            data: {
                password: hash,
            },
        })

        await prisma.token.update({
            where: {
                id: fetchedToken.id,
            },
            data: {
                valid: false,
            },
        })

        return res.status(200).json({ success: true, message: "Password set successfully" });
    } catch (e) {
        console.log(e)
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
};