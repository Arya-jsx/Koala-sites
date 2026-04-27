import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [startOpened, setStartOpened] = useState(false);
  const [forgive, setForgive] = useState(false);
  const [openSeal, setOpenSeal] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [typedLetter, setTypedLetter] = useState("");
  const [showMemoryPage, setShowMemoryPage] = useState(false);
  const [dateIdea, setDateIdea] = useState("");
  const [feedback, setFeedback] = useState("");
  const [likes, setLikes] = useState([]);
  const [showSentPopup, setShowSentPopup] = useState(false);

  const handleSend = () => {
    setShowSentPopup(true);

    setTimeout(() => {
      setShowSentPopup(false);
    }, 2500);
  };

  const spawnLike = () => {
    const newHeart = {
      id: Date.now() + Math.random(),
      x: Math.random() * 40 - 20,
    };

    setLikes((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setLikes((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1600);
  };

  // Floating hearts
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-40),
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 100,
          size: 18 + Math.random() * 18,
          icon: ["💖", "💕", "💗", "💘", "💓"][Math.floor(Math.random() * 5)],
        },
      ]);
    }, 320);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!startOpened) return;

    const fullLetter = `
To Zahra,

Aku tahu akhir-akhir ini kamu capek banget. Belajar terus sambil ngadepin takut dan overthinking itu hal yang gak mudah. Tapi aku mau kamu ingat satu hal, aku lihat seberapa kuat dan konsistennya kamu sampai sejauh ini, dan aku bangga banget sama kamu.

Jangan biarin progress atau nilai orang lain bikin kamu goyah. Ini perjalanan kamu, mimpi kamu, dan langkah kamu sendiri. Fokus sama diri kamu, percaya sama semua usaha yang udah kamu kasih.

Lakuin yang terbaik, tenangin hati, dan percaya sama diri sendiri walau kadang terasa susah. Aku percaya kamu bisa, selalu.

And one more thing, in the middle of all your stress and exhaustion, don’t forget that I’m here love you so much and supporting you with all my heart.

Semangat yaa zahra. You’ve got this.💖

Love, me 🐨
`;
    let index = 0;

    const interval = setInterval(
      () => {
        setTypedLetter(fullLetter.slice(0, index + 1));
        index++;

        if (index === fullLetter.length) {
          clearInterval(interval);
        }
      },
      40, // 20 + Math.random() * 60,
    );

    return () => clearInterval(interval);
  }, [startOpened]);

  const yesScale = Math.min(1 + noCount * 0.08, 1.6);
  const noScale = Math.max(1 - noCount * 0.07, 0.65);

  const isMobile = window.innerWidth < 768;

  const buttonBase = {
    border: "none",
    borderRadius: "18px",
    padding: isMobile ? "15px 18px" : "18px 30px",
    fontSize: isMobile ? "16px" : "20px",
    fontWeight: "700",
    cursor: "pointer",
    width: isMobile ? "240px" : "260px",
    height: isMobile ? "56px" : "62px",
    transition: "0.2s ease",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        background:
          "linear-gradient(135deg,#fbcfe8 0%, #fce7f3 45%, #ddd6fe 100%)",
        fontFamily: "Arial, sans-serif",
        padding: isMobile ? "14px" : "24px",
        boxSizing: "border-box",
      }}
    >
      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: 0, opacity: 0, scale: 0.7 }}
          animate={{
            y: -window.innerHeight - 150,
            opacity: [0, 1, 1, 0],
            x: [0, -10, 10, -6, 0],
            scale: [0.7, 1, 1, 0.9],
          }}
          transition={{
            duration: 6,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${heart.left}%`,
            bottom: "-30px",
            fontSize: `${heart.size}px`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {heart.icon}
        </motion.div>
      ))}

      {/* MAIN CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          minHeight: "calc(100vh - 30px)",
          margin: "0 auto",
          background: "#fffaf0",
          borderRadius: isMobile ? "26px" : "38px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.10)",
          position: "relative",
          zIndex: 5,
          overflow: "hidden",
          border: "4px solid #f9c6df",
        }}
      >
        {/* Intro Page */}
        {!startOpened ? (
          <div
            style={{
              minHeight: "calc(100vh - 30px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, -8, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              whileTap={{ scale: 1.25 }}
              onClick={() => {
                setTimeout(() => {
                  setStartOpened(true);
                }, 180);
              }}
              style={{
                fontSize: isMobile ? "78px" : "100px",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              🐨
            </motion.div>

            <h1
              style={{
                color: "#e11d48",
                fontSize: isMobile ? "34px" : "54px",
                marginTop: "12px",
              }}
            >
              Click the Koala
            </h1>

            <p
              style={{
                color: "#6b7280",
                fontSize: isMobile ? "20px" : "28px",
                marginTop: "10px",
              }}
            >
              It wants to show you something important...
            </p>
            <div
              style={{
                position: "absolute",
                bottom: "18px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: isMobile ? "12px" : "14px",
                color: "#888",
                letterSpacing: "0.5px",
                textAlign: "center",
                width: "100%",
                padding: "0 10px",
              }}
            >
              Created by Arya🐨 © 2026
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="letter"
              initial={{
                opacity: 0,
                scale: 0.55,
                rotateX: 35,
                y: 120,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateX: 0,
                y: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 110,
                damping: 12,
              }}
              style={{
                padding: isMobile ? "22px" : "50px",
              }}
            >
              {/* Header */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: isMobile ? "64px" : "82px" }}>🐨</div>

                <h1
                  style={{
                    color: "#e11d48",
                    fontSize: isMobile ? "34px" : "62px",
                    margin: "8px 0 0 0",
                    lineHeight: 1.1,
                  }}
                >
                  A Letter For You 💌
                </h1>

                <p
                  style={{
                    color: "#666",
                    fontStyle: "italic",
                    fontSize: isMobile ? "16px" : "28px",
                    marginTop: "8px",
                  }}
                >
                  This letter belong to you
                </p>
              </div>

              {/* Letter Body */}
              <div
                style={{
                  marginTop: "24px",
                  color: "#444",
                  lineHeight: 1.8,
                  fontSize: isMobile ? "16px" : "22px",
                  whiteSpace: "pre-line",
                  minHeight: isMobile ? "340px" : "460px",
                  fontFamily: "'Georgia', serif",
                }}
              >
                {typedLetter}
                <span
                  style={{
                    animation: "blink 1s infinite",
                    color: "#e11d48",
                    fontWeight: "bold",
                  }}
                >
                  |
                </span>
              </div>

              {/* Buttons */}
              <div
                style={{
                  marginTop: "28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  alignItems: "center",
                }}
              >
                <motion.div animate={{ scale: yesScale }}>
                  <button
                    onClick={() => setForgive(true)}
                    style={{
                      ...buttonBase,
                      background: "#e11d48",
                      color: "white",
                    }}
                  >
                    Next Letter💖
                  </button>
                </motion.div>
              </div>

              <p
                style={{
                  textAlign: "center",
                  marginTop: "14px",
                  color: "#777",
                  fontSize: isMobile ? "14px" : "18px",
                }}
              >
                Created and writed by Arya🐨 © 2026
              </p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Forgive Popup */}
      <AnimatePresence>
        {forgive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 50,
              padding: "20px",
            }}
          >
            <motion.div
              initial={{ scale: 0.6, rotateY: 90 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 12,
              }}
              style={{
                width: "100%",
                maxWidth: "560px",
                background: "#fffaf0",
                borderRadius: "28px",
                padding: isMobile ? "24px" : "34px",
                textAlign: "center",
              }}
            >
              {!openSeal ? (
                <>
                  <div style={{ fontSize: "62px" }}>💌</div>
                  <h2
                    style={{
                      color: "#e11d48",
                      fontSize: isMobile ? "30px" : "44px",
                      marginTop: "10px",
                    }}
                  >
                    A New Letter Arrived
                  </h2>

                  <button
                    onClick={() => setOpenSeal(true)}
                    style={{
                      ...buttonBase,
                      background: "#e11d48",
                      color: "white",
                      marginTop: "22px",
                    }}
                  >
                    Open The Seal ✨
                  </button>
                </>
              ) : (
                <>
                  <>
                    <div style={{ fontSize: "56px" }}>🐨</div>

                    <h2
                      style={{
                        color: "#e11d48",
                        fontSize: isMobile ? "30px" : "42px",
                      }}
                    >
                      Thank You, My Love
                    </h2>

                    <p
                      style={{
                        color: "#444",
                        lineHeight: 1.8,
                        fontSize: isMobile ? "16px" : "20px",
                      }}
                    >
                      Udah baca letter dari aku yang simple ini💞
                      <br />
                      Yang lain lagi aku buat hehe, tunggu yak.
                    </p>

                    {/* INPUT */}
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Kalau kamu ada yang mau di sampaikan, perasaan kamu, atau ide setalah utbk, tulis di sini dan klik tombol send nya yak!  "
                      style={{
                        width: "100%",
                        marginTop: "18px",
                        minHeight: "120px",
                        padding: "14px",
                        borderRadius: "18px",
                        border: "1px solid #ddd",
                        resize: "none",
                        fontSize: "16px",
                        outline: "none",
                      }}
                    />
                    <p
                      style={{
                        color: "#444",
                        lineHeight: 1.8,
                        fontSize: isMobile ? "16px" : "20px",
                      }}
                    >
                      Sebelum di send, tolong screen shoot dulu
                    </p>
                    {/* BUTTONS */}
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginTop: "16px",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        position: "relative",
                      }}
                    >
                      <button
                        onClick={handleSend}
                        style={{
                          ...buttonBase,
                          width: "160px",
                          background: "#e11d48",
                          color: "white",
                        }}
                      >
                        Send 💌
                      </button>

                      <button
                        onClick={spawnLike}
                        style={{
                          ...buttonBase,
                          width: "160px",
                          background: "#fff0f4",
                          color: "#e11d48",
                          border: "2px solid #f9a8d4",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        Like ❤️
                      </button>

                      {/* TikTok Hearts */}
                      {likes.map((heart) => (
                        <motion.div
                          key={heart.id}
                          initial={{
                            opacity: 0,
                            y: 0,
                            x: 0,
                            scale: 0.8,
                          }}
                          animate={{
                            opacity: [0, 1, 1, 0],
                            y: -140,
                            x: heart.x,
                            scale: [0.8, 1.2, 1],
                            rotate: [0, -15, 15, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            ease: "easeOut",
                          }}
                          style={{
                            position: "absolute",
                            bottom: "10px",
                            right: "20px",
                            fontSize: "28px",
                            pointerEvents: "none",
                          }}
                        >
                          ❤️
                        </motion.div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setForgive(false);
                        setOpenSeal(false);
                      }}
                      style={{
                        ...buttonBase,
                        background: "#fce7f3",
                        color: "#333",
                        marginTop: "18px",
                      }}
                    >
                      Close Letter
                    </button>
                  </>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showSentPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -30 }}
            transition={{ duration: 0.35 }}
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(0,0,0,0.35)",
              zIndex: 999,
              padding: "20px",
            }}
          >
            <div
              style={{
                background: "#fffaf0",
                padding: "28px",
                borderRadius: "24px",
                maxWidth: "420px",
                width: "100%",
                textAlign: "center",
                boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
              }}
            >
              <div style={{ fontSize: "52px" }}>🐨💌</div>

              <h2
                style={{
                  color: "#e11d48",
                  marginTop: "10px",
                  fontSize: "28px",
                }}
              >
                Terimakasih bb💖
              </h2>

              <p
                style={{
                  color: "#444",
                  marginTop: "10px",
                  lineHeight: 1.7,
                }}
              >
                Fokus lagi belajar nya yaah.. Love uu
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
