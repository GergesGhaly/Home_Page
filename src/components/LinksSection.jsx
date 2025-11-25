import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
  FaGoogle,
  FaGlobe,
  FaEnvelope,
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const iconMap = {
  GitHub: <FaGithub />,
  LinkedIn: <FaLinkedin />,
  FaceBook: <FaFacebook />,
  Youtube: <FaYoutube />,
  Gmail: <FaEnvelope />,
  GoogleTranslate: <FaGoogle />,
  Portofolio: <FaGlobe />,
};

export default function LinksSection({ links = [] }) {
  const activeLinks = links.filter((link) => link.enabled);

  const [isMobile, setIsMobile] = useState(false);

  // 🔥 detect screen size
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 600);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <>
      {/* ⭐ DESKTOP MODE */}
      {!isMobile && (
        <div
          style={{
            display: "flex",
            gap: "1.2rem",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          {activeLinks.map((link) => (
            <div
              key={link.name}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <motion.a
                href={link.url}
                target="_blank"
                title={link.name}
                rel="noreferrer"
                whileHover={{ y: -8, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  fontSize: "2rem",
                  color: "white",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
              >
                {iconMap[link.name] || <FaGlobe />}
              </motion.a>
              <p style={{ fontSize: "10px", color: "white" }}>{link.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* ⭐ MOBILE MODE (SWIPER) */}
      {isMobile && (
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          style={{ marginTop: "30px", width: "90%" }}
        >
          {activeLinks.map((link) => (
            <SwiperSlide key={link.name}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <motion.a
                  href={link.url}
                  target="_blank"
                  title={link.name}
                  rel="noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    fontSize: "2rem",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  {iconMap[link.name] || <FaGlobe />}
                </motion.a>
                <p style={{ fontSize: "10px", marginTop: "4px", color: "white" }}>
                  {link.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
