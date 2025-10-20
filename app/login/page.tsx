// app/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, Lock, Mail, Eye, EyeOff, AudioWaveform } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  // 主题切换逻辑
  const [isDark, setIsDark] = useState(false);
  // 表单状态
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  // 初始化主题
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    if (shouldBeDark) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // 切换主题
  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // 表单输入变化处理
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 清除对应字段的错误提示
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // 表单验证
  const validateForm = () => {
    const newErrors: typeof errors = { email: "", password: "" };
    let isValid = true;

    // 邮箱验证
    if (!formData.email) {
      newErrors.email = "请输入邮箱";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "请输入有效的邮箱地址";
      isValid = false;
    }

    // 密码验证
    if (!formData.password) {
      newErrors.password = "请输入密码";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "密码长度至少为6位";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 登录处理
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // 模拟登录请求（实际项目中替换为真实API调用）
      console.log("登录信息:", formData);
      
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 登录成功：存储token并跳转首页
      localStorage.setItem("token", "mock-jwt-token");
      document.cookie = "token=your-token; path=/";
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("登录失败:", error);
      alert("登录失败，请检查账号密码");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col">
      {/* 导航栏 */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex flex-row items-center">
            <AudioWaveform color="#2563EB" />相册日记
          </Link>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label={isDark ? "切换到亮色模式" : "切换到暗色模式"}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* 登录表单区域 */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">欢迎回来</h1>
            <p className="text-gray-600 dark:text-gray-400">
              登录你的账号，继续记录生活的美好瞬间
            </p>
          </div>

          {/* 登录表单 */}
          <form 
            onSubmit={handleLogin}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100 dark:border-gray-700"
          >
            {/* 邮箱输入 */}
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                邮箱
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                    errors.email 
                      ? "border-red-500 dark:border-red-500" 
                      : "border-gray-300 dark:border-gray-600"
                  } bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 outline-none transition-all`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>
              )}
            </div>

            {/* 密码输入 */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  密码
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  忘记密码？
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-lg border ${
                    errors.password 
                      ? "border-red-500 dark:border-red-500" 
                      : "border-gray-300 dark:border-gray-600"
                  } bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 outline-none transition-all`}
                  placeholder="请输入密码"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label={showPassword ? "隐藏密码" : "显示密码"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.password}</p>
              )}
            </div>

            {/* 登录按钮 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  登录中...
                </>
              ) : (
                "登录"
              )}
            </button>
          </form>

          {/* 注册引导 */}
          
        </div>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} 相册日记 - 保护你的每一段回忆</p>
        </div>
      </footer>
    </div>
  );
}