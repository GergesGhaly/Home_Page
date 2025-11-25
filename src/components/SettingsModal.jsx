import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTrash } from "react-icons/fa";
import AddLinkModal from "./AddLinkModal";
// import AddVerseModal from "./AddVerseModal";
import { egyptCities } from "../data/egyptCities";

const defaultLinks = [
  { name: "GoogleTranslate", url: "https://translate.google.com.eg/?hl=ar&tab=wT", enabled: true },
  { name: "LinkedIn", url: "https://www.linkedin.com/feed/", enabled: true },
  { name: "Front-end Mentor", url: "https://www.frontendmentor.io/home", enabled: false },
  { name: "GitHub", url: "https://github.com/", enabled: false },
  { name: "Gmail", url: "https://mail.google.com/mail/u/1/?ogbl#inbox", enabled: false },
  { name: "FaceBook", url: "https://www.facebook.com/", enabled: true },
  { name: "Youtube", url: "https://www.youtube.com/", enabled: true },
];

export default function SettingsModal({ isOpen, onClose, onSave }) {
  const [links, setLinks] = useState(defaultLinks);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showVersehModal, setShowVersehModal] = useState(false);

  const [selectedCity, setSelectedCity] = useState(
    localStorage.getItem("weatherCity") || "القاهرة"
  );

  useEffect(() => {
    try {
      const stored = localStorage.getItem("customLinks");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setLinks(parsed);
      }
    } catch {
      setLinks(defaultLinks);
    }
  }, []);

  const handleDeleteLink = (index) => {
    const updated = links.filter((_, i) => i !== index);
    setLinks(updated);
    localStorage.setItem("customLinks", JSON.stringify(updated));
  };

  const handleChange = (index, field, value) => {
    setLinks((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddLink = (newLink) => {
    const updated = [...links, newLink];
    setLinks(updated);
  };

  const handleSave = () => {
    localStorage.setItem("weatherCity", selectedCity);
    window.dispatchEvent(new Event("weatherCityChanged"));

    localStorage.setItem("customLinks", JSON.stringify(links));
    onSave(links);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      style={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        style={styles.modal}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h3> إعدادات الطقس </h3>

        <div style={styles.weatherSettings}>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={styles.weatherSelect}
          >
            {egyptCities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <h3> إعدادات الروابط</h3>

        <div style={styles.linksList}>
          {links.map((link, index) => (
            <div key={link.name} style={styles.linkItem}>
              <input
                type="checkbox"
                checked={link.enabled}
                onChange={(e) =>
                  handleChange(index, "enabled", e.target.checked)
                }
              />

              <span>{link.name}</span>

              <input
                type="text"
                value={link.url}
                onChange={(e) => handleChange(index, "url", e.target.value)}
                style={styles.urlInput}
              />

              <FaTrash
                onClick={() => handleDeleteLink(index)}
                style={{ color: "black", cursor: "pointer" }}
              />
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowAddModal(true)}
          style={styles.addBtn}
        >
          <FaPlus />
        </motion.button>

        <div style={styles.modalActions}>
          <button onClick={handleSave} style={styles.saveBtn}> حفظ</button>
          <button onClick={onClose} style={styles.cancelBtn}> إلغاء </button>
        </div>
      </motion.div>

      {showAddModal && (
        <AddLinkModal
          onAdd={(newLink) => {
            handleAddLink(newLink);
            setShowAddModal(false);
          }}
          onClose={() => setShowAddModal(false)}
        />
      )}

     
    </motion.div>
  );
}

/* ------------------------
   🔥 جميع الاستايلات هنا
-------------------------*/

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },

  modal: {
    background: "#fff",
    color: "#333",
    padding: "20px",
    borderRadius: "12px",
    width: "450px",
    maxHeight: "80vh",
    overflowY: "auto",
  },

  weatherSettings: {
    marginBottom: "10px",
  },

  weatherSelect: {
    padding: "5px 8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    outline: "none",
    fontSize: "1rem",
    width: "100%",
  },

  linksList: {
    marginTop: "10px",
  },

  linkItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "8px",
  },

  urlInput: {
    flex: 1,
    padding: "4px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },

  modalActions: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "15px",
  },

  saveBtn: {
    cursor: "pointer",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#007bff",
    color: "white",
  },

  cancelBtn: {
    cursor: "pointer",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#ccc",
  },

  addBtn: {
    background: "none",
    border: "none",
    color: "#007bff",
    fontSize: "1.5rem",
    marginTop: "10px",
    cursor: "pointer",
  },
};
