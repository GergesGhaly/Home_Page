import { useEffect, useState } from "react";
import { images } from "./data/images";
import { titles } from "./data/titles";
import Header from "./components/Header";
import QuoteDisplay from "./components/QuoteDisplay";
import LinksSection from "./components/LinksSection";
import SettingsModal from "./components/SettingsModal";

export default function App() {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [links, setLinks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const styles = {
    app: {
      padding: "30px 50px",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      color: "white",
      textAlign: "center",
      fontFamily: "sans-serif",
      // overFlowe: "hidden",
    },
  };

  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const updateRandomContent = () => {
    setImage(getRandom(images));
    setTitle(getRandom(titles));
  };

  const updateDateTime = () => {
    const now = new Date();
    const formatted = now.toLocaleString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setDate(formatted);
  };

  useEffect(() => {
    updateRandomContent();
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    const storedLinks = localStorage.getItem("customLinks");
    if (storedLinks) {
      setLinks(JSON.parse(storedLinks));
    }

    return () => clearInterval(interval);
  }, []);

  const handleSaveLinks = (newLinks) => {
    setLinks(newLinks);
    localStorage.setItem("customLinks", JSON.stringify(newLinks));
  };

  return (
    <div
      style={{
        ...styles.app,
        backgroundImage: `url(${image})`,
      }}
    >
      <Header
        onRandom={updateRandomContent}
        date={date}
        onOpenSettings={() => setModalOpen(true)}
        background={image}
      />

      <QuoteDisplay title={title} />

      <LinksSection links={links} />

      <SettingsModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveLinks}
      />
    </div>
  );
}
