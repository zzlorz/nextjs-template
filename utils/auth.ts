const getToken = (): string | null => {
  // 从本地存储或其他地方获取 token
  return localStorage.getItem('token');
}
export {getToken};