//copied from documentation of nextAuth meddileware

import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware() {
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized({ req, token }) {
                const {pathname}= req.nextUrl
                if (pathname.startsWith ('/api/auth') ||
                    pathname === '/login'||
                    pathname === '/register'
                ) {
                    return true;
                }

                if (pathname === '/' || pathname.startsWith('/api/video')) {
                    return true;
                }
                
                return !!token // If there is a token, the user is authenticated
            }
        }
    }
)


export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}