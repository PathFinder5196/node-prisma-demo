import { Request, Response } from 'express';
import prisma from '../client';

export const getPreferences = async (req: Request, res: Response) => {
    try {
        const prefereces = await prisma.preference.findMany()
        return res.status(200).json({ success: false, data: prefereces });
    } catch (e) {
        let message;
        if (e instanceof Error) message = e.message;
        else message = String(e);
        res.status(400).json({ success: false, message });
    }
};
