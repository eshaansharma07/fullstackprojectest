import { useState } from "react";
import toast from "react-hot-toast";
import api, { extractErrorMessage } from "../../api/http.js";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [resetUrl, setResetUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      setResetUrl(data.data?.resetUrl || "");
      toast.success("Reset instructions sent");
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-12">
      <form onSubmit={handleSubmit} className="glass-strong w-full space-y-5 rounded-[32px] p-8">
        <h1 className="font-display text-3xl font-semibold text-slate-900">Forgot password</h1>
        <input className="input" type="email" placeholder="Registered email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button className="btn-primary w-full" type="submit">Send reset link</button>
        {resetUrl ? <p className="rounded-2xl bg-emerald-500/10 p-3 text-xs text-emerald-300">Local demo reset URL: {resetUrl}</p> : null}
      </form>
    </div>
  );
}
