import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import api, { extractErrorMessage } from "../../api/http.js";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      toast.success("Password reset successful");
      navigate("/login");
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-12">
      <form onSubmit={handleSubmit} className="glass w-full space-y-5 rounded-[32px] p-8">
        <h1 className="font-display text-3xl font-semibold text-white dark:text-white">Reset password</h1>
        <input className="input" type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn-primary w-full">Update password</button>
        <Link to="/login" className="block text-center text-sm text-slate-400">Back to login</Link>
      </form>
    </div>
  );
}
