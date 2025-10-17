// // import { authMiddleware } from "@clerk/nextjs";
// const authMiddleware = (obj:any) => {};
// export default authMiddleware({
//   // publicRoutes: ["/dashboard"],
//   // ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/dashboard"],
//   // async afterAuth(auth, res, evt) {
//   //   console.log(auth, res, evt);
//   // }
// });

// export const config = {
//   matcher: ["/"],
// };
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. 获取用户登录状态（示例：从 cookie 中读取 token）
  const token = request.cookies.get('token')?.value;

  // 2. 定义受保护的路由（如 /dashboard、/profile 等）
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard');
  // 定义登录页路由
  const isLoginRoute = request.nextUrl.pathname === '/login';

  // 3. 未登录用户访问受保护路由 → 重定向到登录页
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. 已登录用户访问登录页 → 重定向到首页（可选）
  if (isLoginRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 5. 权限通过，允许访问
  return NextResponse.next();
}

// 配置需要拦截的路由（* 表示所有路由，可按需缩小范围）
export const config = {
  matcher: ['/dashboard/:path*', '/about', '/login'],
};