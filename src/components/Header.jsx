import { FaCog, FaDiceFive } from "react-icons/fa";
import WeatherInfo from "./WeatherInfo";
import { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";

export default function Header({ onRandom, date, onOpenSettings, background }) {
  const [textColor, setTextColor] = useState("#fff");

  useEffect(() => {
    const fac = new FastAverageColor();

    // تحديد اللون بناءً على صورة الخلفية أو لون صلب
    if (background.startsWith("http") || background.startsWith("/")) {
      // صورة
      fac
        .getColorAsync(background)
        .then((color) => {
          const brightness =
            (color.value[0] * 299 +
              color.value[1] * 587 +
              color.value[2] * 114) /
            1000;
          setTextColor(brightness > 128 ? "#000000" : "#FFFFFF");
        })
        .catch(() => setTextColor("#fff"));
    } else {
      // لون صلب
      const hex =
        background.startsWith("rgba") || background.startsWith("rgb")
          ? rgbToHex(background)
          : background;
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      setTextColor(brightness > 128 ? "#000000" : "#FFFFFF");
    }
  }, [background]);

  // تحويل rgb/rgba إلى HEX
  const rgbToHex = (rgb) => {
    const nums = rgb.match(/\d+/g).map(Number);
    return (
      "#" +
      nums[0].toString(16).padStart(2, "0") +
      nums[1].toString(16).padStart(2, "0") +
      nums[2].toString(16).padStart(2, "0")
    );
  };

  return (
    <div
      className="head"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        justifyContent: "space-between",
        color: textColor, // ⬅ تطبيق اللون على كل العناصر
        background: background, // يمكن أن يكون لون أو صورة
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "10px",
        // fontSize: "24px",
      }}
    >
      <FaDiceFive
        size={19}
        style={{ cursor: "pointer", color: textColor }}
        onClick={onRandom}
        title="random"
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          color: textColor,
          // fontSize: "18px",
        }}
      >
        <h5 style={{ margin: 0, color: textColor }}>{date}</h5>
        <WeatherInfo textColor={textColor} />
      </div>

      <FaCog
        size={20}
        style={{ cursor: "pointer", color: textColor }}
        onClick={onOpenSettings}
        title="settings"
      />
    </div>
  );
}
