import { NextResponse } from 'next/server';
import authConfig from '@/auth.config';

export async function GET() {
    return NextResponse.json({
        hasSecret: !!authConfig.secret,
        secretLength: authConfig.secret?.length || 0,
        envAuthSecret: !!process.env.AUTH_SECRET,
        sessionStrategy: authConfig.session?.strategy,
        providersCount: authConfig.providers?.length
    });
}
