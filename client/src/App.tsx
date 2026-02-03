import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

import photo1 from "./assets/photo1.jpeg";
import photo2 from "./assets/photo2.jpeg";
import photo3 from "./assets/photo3.jpeg";
import photo4 from "./assets/photo4.jpeg";
import photo5 from "./assets/photo5.jpeg";
import photo6 from "./assets/photo6.jpg";
import photo7 from "./assets/photo7.jpeg";
import photo8 from "./assets/photo8.jpeg";
import photo9 from "./assets/photo9.jpg";
import photo10 from "./assets/photo10.jpg";
import photo11 from "./assets/photo11.jpeg";
import photo12 from "./assets/photo12.jpeg";

const API_URL = "https://i-love-nikol.onrender.com";

type ToastType = "success" | "error" | "info";

const LETTER_PARAGRAPHS: string[] = [
  "My Nikol,",
  "I’m writing this with a calm heart and an honest mind. I know I’ve hurt you — not only with what happened today, but with moments in the past too. I’m not writing to excuse anything. I’m writing to own it.",
  "I’m sorry for every time I made you feel misunderstood, unheard, or alone. I’m sorry for the times my pride spoke louder than my love. I’m sorry for the stress, the tears, and the heaviness I brought into a place that should have always felt safe for you.",
  "The truth is: you matter to me in a way I can’t replace. You’re not just someone I love — you’re my favorite person, my comfort, my home. You’re the one I think about when something good happens and I want to share it. You’re the one I miss even when you’re near.",
  "I don’t want to be the kind of man who asks for love but doesn’t protect it. I want to be better — not with words, but with actions. I want to listen without defending myself. I want to speak with kindness even when I’m upset. I want to be patient, steady, and safe for your heart.",
  "If you allow me, I want to earn your trust again — step by step, day by day. I know trust doesn’t come back because of one letter or one apology. It comes back when you see consistency: respect, honesty, effort, and real change.",
  "I’m not asking you to forget anything. I’m asking you to let me learn from it and grow. I want to build something gentle with you — something that feels peaceful and warm, not heavy and uncertain.",
  "You are beautiful, kind, and rare. The way you care, the way you love, the way you are… it’s precious to me. And I don’t want to take you for granted for even a second.",
  "So here’s my simple promise: I will choose you with my behavior, not only with my feelings. I will choose calm over ego. I will choose respect over being right. I will choose us — every day.",
  "I love you. I’m sorry. And I’m here — not to pressure you, but to fight for us the right way.",
  "Yours, Vasil ❤️",
];

export default function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // “No” button movement state
  const [noPos, setNoPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [noMoves, setNoMoves] = useState(0);
  const [toast, setToast] = useState<{ type: ToastType; text: string } | null>(
    null
  );
  const [sending, setSending] = useState(false);
  const [showText, setShowText] = useState(false);

  const photos = useMemo(
    () => [
      { src: photo1, alt: "Us 1" },
      { src: photo2, alt: "Us 2" },
      { src: photo3, alt: "Us 3" },
      { src: photo4, alt: "Us 4" },
      { src: photo5, alt: "Us 5" },
      { src: photo6, alt: "Us 6" },
      { src: photo7, alt: "Us 7" },
      { src: photo8, alt: "Us 8" },
      { src: photo9, alt: "Us 9" },
      { src: photo10, alt: "Us 10" },
      { src: photo11, alt: "Us 11" },
      { src: photo12, alt: "Us 12" },
    ],
    []
  );

  useEffect(() => {
    // place "No" button initially (after layout)
    moveNoButton(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  function showToast(type: ToastType, text: string) {
    setToast({ type, text });
  }

  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function moveNoButton(initial = false) {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();

    // keep it within the container
    const padding = 12;
    const buttonW = 120;
    const buttonH = 44;

    const maxX = Math.max(padding, rect.width - buttonW - padding);
    const maxY = Math.max(padding, rect.height - buttonH - padding);

    const x = initial ? Math.min(40, maxX) : randomInt(padding, maxX);
    const y = initial ? Math.min(10, maxY) : randomInt(padding, maxY);

    setNoPos({ x, y });
  }

  function onNoAttempt() {
    // If it still has dodges left, dodge and increment
    if (noMoves < 3) {
      setNoMoves((m) => m + 1);
      moveNoButton();
      return;
    }

    // After 3 dodges: allow "No" click but it’s always "wrong answer"
    showToast("error", "Wrong answer! Try again! 😄");
    // You can keep it “stuck” or continue moving—your choice:
    // moveNoButton();
  }

  async function sendEmail() {
    if (sending) return;
    setSending(true);

    try {
      const res = await fetch(`${API_URL}/send-email`, { method: "POST" });
      const data = await res.json();

      if (data?.success) {
        showToast("success", "Sent! ❤️ Check your email");
      } else {
        showToast("error", "Failed to send email.");
      }
    } catch {
      showToast("error", "Server error.");
    } finally {
      setSending(false);
    }
  }

  async function onClickYes() {
    setShowText(true);
  }

  return (
    <div className="page">
      <div className="card" ref={containerRef}>
        <h1 className="title">My love letter for Nikol ❤️</h1>

        <div className="gallery">
          {photos.map((p) => (
            <img key={p.alt} className="photo" src={p.src} alt={p.alt} />
          ))}
        </div>

        <div className="letter">
          {LETTER_PARAGRAPHS.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </div>

        <div className="question">
          <h2>Do you still love me?</h2>
          <p className="small">
            (There is only one correct answer 😇)
          </p>
        </div>

        <div className="buttonsWrap">
          <button className="btn yes" onClick={sendEmail} disabled={sending}>
            {showText ? "Thank you with all my heart my dear Ninon ❤️. I am in the other room for a hug :)" : "Yes"}
          </button>

          {/* "No" is absolutely positioned & dodges */}
          <button
            className="btn no"
            style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}
            onClick={onNoAttempt}
            onPointerDown={(e) => {
              // on mobile, pointerdown happens before click. dodge early for the first 3 attempts.
              if (noMoves < 3) {
                e.preventDefault();
                onNoAttempt();
              }
            }}
            onMouseEnter={() => {
              // on desktop, hovering also dodges for the first 3 times
              if (noMoves < 3) onNoAttempt();
            }}
            aria-label="No button"
          >
            No
          </button>
        </div>

        {toast && (
          <div className={`toast ${toast.type}`} role="status">
            {toast.text}
          </div>
        )}
      </div>
    </div>
  );
}
