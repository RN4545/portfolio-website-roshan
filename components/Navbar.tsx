
"use client";

import { personalInfo } from "@/data";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  const links: string[] = ["About", "Skills", "Experience", "Projects", "Contact"];

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Navbar Container */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "70px",
          padding: "0 5vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.4s ease",
          background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "inherit" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              border: "2px solid var(--accent)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-mono)",
              fontSize: "14px",
              color: "var(--accent)",
              fontWeight: "500",
            }}
          >
            R
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: "700", letterSpacing: "-0.02em" }}>
            {personalInfo.name}
          </span>
        </a>

        {/* Desktop Navigation */}
        <ul className="nav-links" style={{ display: "flex", gap: "40px", listStyle: "none", margin: 0, padding: 0 }}>
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "color 0.2s ease"
                }}
              >
                {link}
              </a>
            </li>
          ))}
          <li>
            <a
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                color: "var(--accent)",
                border: "1px solid var(--accent)",
                padding: "8px 18px",
                borderRadius: "6px",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.2s ease"
              }}
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Hamburger Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)", padding: "8px" }}
          aria-label="Toggle Menu"
        >
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="4" y1="7" x2="22" y2="7" />
            <line x1="4" y1="13.5" x2="22" y2="13.5" />
            <line x1="4" y1="20" x2="22" y2="20" />
          </svg>
        </button>
      </nav>

      {/* ==================== MOBILE MENU (Rendered via Portal) ==================== */}
      {mounted && menuOpen && createPortal(
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10, 10, 15, 0.98)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",
            padding: "20px",
            height: "100vh",
          }}
        >
          {/* Close Button */}
          <button
            onClick={closeMenu}
            style={{
              position: "absolute",
              top: "30px",
              right: "30px",
              background: "none",
              border: "none",
              fontSize: "52px",
              color: "#fff",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            &times;
          </button>

          {/* Nav Links */}
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={closeMenu}
              style={{
                color: "#ffffff",
                fontSize: "42px",
                fontWeight: 700,
                textDecoration: "none",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.025em",
                textAlign: "center",
              }}
            >
              {link}
            </a>
          ))}

          {/* Mobile Resume Button */}
          <a
            href={personalInfo.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            style={{
              marginTop: "20px",
              color: "var(--accent)",
              border: "2px solid var(--accent)",
              padding: "16px 40px",
              borderRadius: "8px",
              fontSize: "15px",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              textDecoration: "none",
            }}
          >
            Download Resume
          </a>
        </div>,
        document.body
      )}

      {/* Component Styles */}
      <style jsx>{`
        .hamburger {
          display: none;
        }

        .nav-links li a:hover {
           color: var(--text) !important;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none !important;
          }
          .hamburger {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}