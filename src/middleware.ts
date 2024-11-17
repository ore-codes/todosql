import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const authToken = req.cookies.get('authToken')?.value || req.headers.get('authorization');

    if (!authToken) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
