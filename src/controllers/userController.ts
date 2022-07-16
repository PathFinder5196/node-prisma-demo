import { Request, Response } from 'express';
import prisma from '../client';

export const getUser = async (req: Request, res: Response) => {
    try {
        const currentUser = req.currentUser;

        const user = await prisma.user.findFirst({
            where: {
                id: currentUser?.id
            },
            include: {
                preferences: {
                    include: {
                        preference: true,
                    },
                },
            },
        })

        res.status(201).json({ success: true, data: user });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
};

export const addUserPreference = async (req: Request, res: Response) => {
    try {
        const user = req.currentUser;
        const { preferenceId } = req.body;

        const prefrence = await prisma.preference.findFirst({
            where: { id: preferenceId }
        })

        if (!prefrence) {
            return res.status(401).json({ success: false, message: 'Prefrence not found' });
        }

        const currentPrefrence = await prisma.userPreferene.findFirst({
            where: { userId: user?.id, preferenceId }
        })

        if (currentPrefrence) {
            return res.status(401).json({ success: false, message: 'Prefrence already added' });
        }

        const userPrefrence = await prisma.userPreferene.create({
            data: {
                user: {
                    connect: {
                        id: user?.id
                    },
                },
                preference: {
                    connect: {
                        id: preferenceId
                    },
                },
            },
        })

        res.status(201).json({ success: true, data: userPrefrence });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
};
