"use client";
import { useEffect, useRef, useState } from "react";
import { personalInfo } from "@/data";
import emailjs from "emailjs-com";

export default function ContactForm() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSending(true);
    setError(false);

    try {
      await emailjs.send(
        "service_mi788vf",
        "template_aje9g6f",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: personalInfo.email,
        },
        "_CAn5Nf07caT5EXEs"
      );

      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error(err);
      setError(true);
      setTimeout(() => setError(false), 4000);
    } finally {
      setSending(false);
    }
  };

  // ✅ MODERN INPUT STYLE (UPDATED)
  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${
      focused === field ? "var(--accent)" : "rgba(255,255,255,0.08)"
    }`,
    borderRadius: "14px",
    padding: "14px 16px",
    color: "var(--text)",
    fontFamily: "var(--font-display)",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.25s ease",
    backdropFilter: "blur(10px)",
    boxShadow:
      focused === field
        ? "0 0 0 4px rgba(100,200,255,0.12)"
        : "0 8px 20px rgba(0,0,0,0.15)",
  });

  const btnColor = sent
    ? "#22c55e"
    : error
    ? "#ef4444"
    : sending
    ? "#64748b"
    : "var(--accent)";

  const btnLabel = sending
    ? "Sending..."
    : sent
    ? "Message Sent!"
    : error
    ? "Failed — Try Again"
    : "Send Message";

  return (
    <section
      ref={ref}
      id="contact"
      style={{
        padding: "80px 5vw",
        background: "var(--bg-2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
          }}
        >
          {/* LEFT SIDE (unchanged) */}
          <div>
            <h2 style={{ fontSize: "48px", fontWeight: 800 }}>
              Let's build{" "}
              <span style={{ color: "var(--accent)" }}>together.</span>
            </h2>
          </div>

          {/* RIGHT SIDE FORM (UPDATED UI ONLY) */}
          <div>
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "40px",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* NAME */}
              <div style={{ marginBottom: "18px" }}>
                <label style={labelStyle}>Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  placeholder="Your name"
                  style={inputStyle("name")}
                />
              </div>

              {/* EMAIL */}
              <div style={{ marginBottom: "18px" }}>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  placeholder="your@email.com"
                  style={inputStyle("email")}
                />
              </div>

              {/* MESSAGE */}
              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  placeholder="Tell me about your project..."
                  style={{
                    ...inputStyle("message"),
                    resize: "none",
                    minHeight: "140px",
                    lineHeight: "1.6",
                  }}
                />
              </div>

              {/* BUTTON */}
              <button
                onClick={handleSubmit}
                disabled={sending}
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "14px",
                  border: "none",
                  fontFamily: "var(--font-display)",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: sending ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  background: btnColor,
                  color: "#fff",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                }}
              >
                {btnLabel}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LABEL STYLE */}
      <style>{`
        .contact-grid {
          grid-template-columns: 1fr 1fr;
        }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  letterSpacing: "0.12em",
  color: "rgba(255,255,255,0.6)",
  textTransform: "uppercase",
  display: "block",
  marginBottom: "8px",
};