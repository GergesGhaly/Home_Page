import { useState } from "react";
import { motion } from "framer-motion";

export default function AddLinkModal({ onAdd, onClose }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const isDisabled = !name.trim() || !url.trim();

  const handleSubmit = () => {
    if (isDisabled) return;
    onAdd({ name, url, enabled: true });
    setName("");
    setUrl("");
  };

  return (
    <motion.div
      style={styles.addlinkOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        style={styles.addlinkModal}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <h4 style={styles.title}>إضافة رابط جديد</h4>

        <label style={styles.label}>اسم الرابط:</label>
        <input
          type="text"
          placeholder="مثال: LinkedIn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>رابط URL:</label>
        <input
          type="text"
          placeholder="مثال: https://linkedin.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
        />

        <div style={styles.actions}>
          <motion.button
            whileHover={!isDisabled ? { scale: 1.05 } : {}}
            whileTap={!isDisabled ? { scale: 0.95 } : {}}
            style={{
              ...styles.btn,
              ...styles.add,
              ...(isDisabled ? styles.disabled : {}),
            }}
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            إضافة
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ ...styles.btn, ...styles.cancel }}
            onClick={onClose}
          >
            إلغاء
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =============================
      ⭐ STYLES OBJECT BELOW
   ============================= */

const styles = {
  addlinkOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(5px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  addlinkModal: {
    background: "#fff",
    padding: "25px 30px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  title: {
    textAlign: "center",
    color: "#007bff",
    fontWeight: 600,
    marginBottom: "10px",
  },

  label: {
    fontSize: "0.9rem",
    color: "#333",
    marginTop: "5px",
  },

  input: {
    padding: "8px 10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    outline: "none",
    fontSize: "0.95rem",
    transition: "border-color 0.3s ease",
  },

  actions: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },

  btn: {
    border: "none",
    borderRadius: "6px",
    padding: "8px 14px",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "0.95rem",
    transition: "background 0.3s ease",
  },

  add: {
    background: "#007bff",
    color: "#fff",
  },

  cancel: {
    background: "#ddd",
    color: "#333",
  },

  disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
};
