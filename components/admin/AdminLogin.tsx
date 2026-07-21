import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ApiError, isLoggedIn, login } from "../../lib/adminApi";

export function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);
    try {
      await login(username.trim(), password);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-surface-base px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Drinkig Admin</h1>
          <p className="mt-2 text-sm text-zinc-400">관리자 계정으로 로그인하세요</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-surface-raised p-6 space-y-4"
        >
          <div>
            <label htmlFor="admin-username" className="block text-sm text-zinc-300 mb-1.5">
              아이디
            </label>
            <input
              id="admin-username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-sm text-zinc-300 mb-1.5">
              비밀번호
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "로그인 중..." : "로그인"}
          </Button>
        </form>
      </div>
    </main>
  );
}
