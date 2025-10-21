// src/utils/request.ts
import {getToken} from './auth'; // 假设你有获取token的工具函数

// 基础配置
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

// 请求选项类型定义（增强类型提示）
type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  headers?: Record<string, string>;
  // 可添加更多配置，如超时、是否携带token等
  withToken?: boolean;
};

/**
 * 封装的请求工具
 * @param url 请求路径（相对路径，会拼接 BASE_URL）
 * @param options 请求配置
 * @returns 响应数据
 */
export async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const {
    method = 'GET',
    data,
    headers = {},
    withToken = true,
  } = options;

  // 拼接完整URL
  const fullUrl = `${BASE_URL}${url}`;

  // 构建请求头
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // 如果需要携带token，添加到请求头
  if (withToken) {
    const token = getToken();
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(fullUrl, {
      method,
      headers: requestHeaders,
      // GET 请求不能有 body，这里做区分
      body: method !== 'GET' && data ? JSON.stringify(data) : undefined,
      // 可添加缓存、 credentials 等配置
      credentials: 'include', // 跨域请求携带cookie
    });

    // 处理 HTTP 错误状态（如 404、500）
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `Request failed with status ${response.status}`
      );
    }

    // 解析响应数据
    const result = await response.json();
    return result as T;
  } catch (error) {
    // 统一错误处理（如打印日志、提示用户）
    console.error('Request error:', error);
    throw error; // 抛出错误让调用方处理
  }
}

// 封装常用请求方法（简化调用）
export const api = {
  get: <T>(url: string, options?: Omit<RequestOptions, 'method' | 'data'>) =>
    request<T>(url, { ...options, method: 'GET' }),
  post: <T>(url: string, data?: any, options?: Omit<RequestOptions, 'method' | 'data'>) =>
    request<T>(url, { ...options, method: 'POST', data }),
  put: <T>(url: string, data?: any, options?: Omit<RequestOptions, 'method' | 'data'>) =>
    request<T>(url, { ...options, method: 'PUT', data }),
  delete: <T>(url: string, options?: Omit<RequestOptions, 'method' | 'data'>) =>
    request<T>(url, { ...options, method: 'DELETE' }),
};