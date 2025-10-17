// components/withAuth.tsx

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// 客户端权限校验 HOC
export function withAuth(Component: NextPage) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();

    useEffect(() => {
      // 从 localStorage 或 cookie 中获取登录状态
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      }
    }, [router]);

    return <Component {...props} />;
  };
}