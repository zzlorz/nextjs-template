"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


type FormState = {
    email: string;
    password: string;
    remember: boolean;
};

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState<FormState>({
        email: "",
        password: "",
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string; global?: string }>({});

    const validate = (): boolean => {
        const e: typeof errors = {};
        if (!form.email) e.email = "请输入邮箱";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "邮箱格式不正确";

        if (!form.password) e.password = "请输入密码";
        else if (form.password.length < 6) e.password = "密码至少6位";

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (field: keyof FormState) => (
        ev: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = field === "remember" ? (ev.target as HTMLInputElement).checked : ev.target.value;
        setForm((s) => ({ ...s, [field]: value }));
        // clear specific error while typing
        setErrors((prev) => ({ ...prev, [field === "remember" ? "" : (field as string)]: undefined }));
    };

    const handleSubmit = async (ev?: React.FormEvent) => {
        ev?.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setErrors({});

        try {
            // 调用后端登录接口（调整 URL/请求体以匹配你的后端）
            // const res = await fetch("/api/login", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({
            //         email: form.email,
            //         password: form.password,
            //         remember: form.remember,
            //     }),
            // });

            // if (!res.ok) {
            //     const data = await res.json().catch(() => ({}));
            //     setErrors({ global: data?.message || "登录失败，请重试" });
            //     setLoading(false);
            //     return;
            // }

            // 设置 cookie token
            document.cookie = "token=your-token; path=/";

            // 登录成功，跳转到首页（或其他页面）
            router.push("/dashboard");
        } catch (err) {
            console.error(err);
            setErrors({ global: "网络错误，请稍后重试" });
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.card} aria-labelledby="login-title">
                <h1 id="login-title" style={styles.title}>
                    登录
                </h1>

                {errors.global && <div style={styles.errorGlobal}>{errors.global}</div>}

                <label style={styles.label}>
                    邮箱
                    <input
                        type="email"
                        value={form.email}
                        onChange={handleChange("email")}
                        style={{ ...styles.input, borderColor: errors.email ? "#e53e3e" : "#d1d5db" }}
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                    />
                    {errors.email && <div style={styles.fieldError}>{errors.email}</div>}
                </label>

                <label style={styles.label}>
                    密码
                    <div style={{ position: "relative" }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={form.password}
                            onChange={handleChange("password")}
                            style={{ ...styles.input, paddingRight: 80, borderColor: errors.password ? "#e53e3e" : "#d1d5db" }}
                            placeholder="输入你的密码"
                            autoComplete="current-password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            style={styles.showBtn}
                            aria-label={showPassword ? "隐藏密码" : "显示密码"}
                        >
                            {showPassword ? "隐藏" : "显示"}
                        </button>
                    </div>
                    {errors.password && <div style={styles.fieldError}>{errors.password}</div>}
                </label>

                <label style={{ ...styles.label, ...styles.row }}>
                    <input type="checkbox" checked={form.remember} onChange={handleChange("remember")} />
                    <span style={{ marginLeft: 8 }}>记住我</span>
                </label>

                <div style={styles.actions}>
                    <button type="submit" disabled={loading} style={styles.submitBtn}>
                        {loading ? "登录中..." : "登录"}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            // 示例：打开找回密码页面，使用浏览器打开 host（若需要）
                            // 这里使用 router.push，若想在 host 浏览器打开请在容器里使用 "$BROWSER" <url>
                            router.push("/forgot-password");
                        }}
                        style={styles.linkBtn}
                    >
                        忘记密码？
                    </button>
                </div>
            </form>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg,#f8fafc,#fff)",
        padding: 24,
    },
    card: {
        width: "100%",
        maxWidth: 420,
        background: "#ffffff",
        borderRadius: 8,
        padding: 24,
        boxShadow: "0 6px 18px rgba(16,24,40,0.08)",
        boxSizing: "border-box",
    },
    title: { margin: 0, marginBottom: 16, fontSize: 22, color: "#111827" },
    label: { display: "block", marginBottom: 12, fontSize: 14, color: "#374151" },
    input: {
        width: "100%",
        boxSizing: "border-box",
        marginTop: 8,
        padding: "10px 12px",
        borderRadius: 6,
        border: "1px solid #d1d5db",
        fontSize: 14,
        outline: "none",
    },
    showBtn: {
        position: "absolute",
        right: 8,
        top: 12,
        height: 34,
        padding: "0 10px",
        borderRadius: 6,
        border: "none",
        background: "#eef2ff",
        cursor: "pointer",
    },
    row: { display: "flex", alignItems: "center" },
    actions: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 },
    submitBtn: {
        background: "#2563eb",
        color: "#fff",
        border: "none",
        padding: "10px 16px",
        borderRadius: 6,
        cursor: "pointer",
    },
    linkBtn: {
        background: "transparent",
        border: "none",
        color: "#2563eb",
        cursor: "pointer",
        textDecoration: "underline",
        padding: 8,
    },
    fieldError: { color: "#e53e3e", marginTop: 6, fontSize: 12 },
    errorGlobal: {
        background: "#fee2e2",
        color: "#9b1c1c",
        padding: "8px 12px",
        borderRadius: 6,
        marginBottom: 12,
        fontSize: 13,
    },
};