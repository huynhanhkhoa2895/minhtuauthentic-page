import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const user = getCookie('user', request.headers.get('cookie') || '');
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(process.env.ADMIN_URL || '');
  }
  if (request.nextUrl.pathname === '/gio-hang/thanh-toan') {
    if (!user) {
      return NextResponse.redirect(
        process.env.APP_URL +
          '/tai-khoan/dang-nhap?redirectUrl=/gio-hang/thanh-toan',
      );
    }
    return NextResponse.next();
  }
}
function getCookie(name: string, cookie: string) {
  const value = `; ${cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return (parts.pop() || '').split(';').shift();
}
