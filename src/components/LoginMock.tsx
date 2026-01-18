import { useState } from "react";

type Props = {
  onLogin: () => void;
};

const DUMMY_EMAIL = "admin@gmail.com";
const DUMMY_PASSWORD = "admin123";

export default function LoginMock({ onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEmailValid = email.includes("@");
  const isPasswordValid = password.length >= 6;

  const handleLogin = () => {
    setError("");

    if (!isEmailValid) {
      setError("Please enter a valid email address");
      return;
    }

    if (!isPasswordValid) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (email !== DUMMY_EMAIL || password !== DUMMY_PASSWORD) {
        setLoading(false);
        setError("Invalid email or password");
        return;
      }

      setLoading(false);
      onLogin();
    }, 1000);
  };

  /* ✅ AUTO LOGIN FOR EVALUATOR */
  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      onLogin();
    }, 600);
  };

  return (
    <div style={page}>
      {/* LEFT */}
      <div style={left}>
        <h1 style={{ fontSize: "34px", marginBottom: "10px" }}>
          Agreement Management
        </h1>
        <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
          Create reusable blueprints <br />
          Manage contracts lifecycle <br />
          Track approvals & signatures
        </p>
      </div>

      {/* RIGHT */}
      <div style={right}>
        <div style={card}>
          <h2>Sign in</h2>
          <p style={{ color: "#64748b", marginBottom: "18px" }}>
            Contract Management Platform
          </p>

          <input
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
          />

          <div style={{ position: "relative" }}>
            <input
              placeholder="Password"
              type={showPwd ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={input}
            />
            <span
              onClick={() => setShowPwd(!showPwd)}
              style={showHide}
            >
              {showPwd ? "Hide" : "Show"}
            </span>
          </div>

          {error && <div style={errorText}>{error}</div>}

          <button
            onClick={handleLogin}
            disabled={loading}
            style={primaryBtn}
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          {/*  AUTO LOGIN BUTTON */}
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            style={demoBtn}
          >
            Continue as Demo User
          </button>

          <div style={hint}>
            Demo credentials: admin@gmail.com / admin123
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const page = {
  display: "flex",
  height: "100vh",
  fontFamily: "system-ui, sans-serif",
};

const left = {
  flex: 1,
  background: "linear-gradient(135deg,#1e3a8a,#2563eb)",
  color: "white",
  padding: "60px",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
};

const right = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f8fafc",
};

const card = {
  background: "white",
  padding: "34px",
  width: "360px",
  borderRadius: "14px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "14px",
  borderRadius: "8px",
  border: "1px solid #cbd5f5",
};

const primaryBtn = {
  width: "100%",
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: 600,
  cursor: "pointer",
};

const demoBtn = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  background: "white",
  color: "#2563eb",
  border: "1px solid #2563eb",
  borderRadius: "8px",
  cursor: "pointer",
};

const showHide = {
  position: "absolute" as const,
  right: "12px",
  top: "11px",
  fontSize: "12px",
  color: "#2563eb",
  cursor: "pointer",
};

const errorText = {
  fontSize: "12px",
  color: "#ef4444",
  marginBottom: "10px",
};

const hint = {
  marginTop: "12px",
  fontSize: "11px",
  color: "#64748b",
  textAlign: "center" as const,
};