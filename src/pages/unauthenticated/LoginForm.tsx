import React, { useState } from "react";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onBack: () => void;
}

const LoginForm = ({ onLogin, onBack }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError(null);
    onLogin(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-4 bg-white/10 rounded-xl shadow-lg p-6 border border-blue-500/30"
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 rounded-lg border border-blue-400/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-blue-200 text-white"
        autoComplete="email"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-4 py-2 rounded-lg border border-blue-400/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-blue-200 text-white"
        autoComplete="current-password"
      />
      {error && <div className="text-red-300 text-sm text-center bg-red-900/30 p-2 rounded border border-red-500/50">{error}</div>}
      <button
        type="submit"
        className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 active:bg-blue-800 transition-colors duration-150"
      >
        Admin Login
      </button>
      <button
        type="button"
        onClick={onBack}
        className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-indigo-700 text-white font-semibold text-base hover:bg-indigo-800 active:bg-indigo-900 transition-colors duration-150 border border-indigo-500 mt-2"
      >
        Back
      </button>
    </form>
  );
};

export default LoginForm;
