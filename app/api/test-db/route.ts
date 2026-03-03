import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET(req: Request) {
    try {
        const users = await prisma.user.findMany({ select: { email: true } });
        return NextResponse.json({ success: true, count: users.length, users });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message, stack: e.stack });
    }
}
