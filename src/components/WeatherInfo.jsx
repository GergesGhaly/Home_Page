import { useEffect, useState } from "react";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiFog } from "react-icons/wi";
import { egyptCities } from "../data/egyptCities";

export default function WeatherInfo({ textColor }) {
  const [temp, setTemp] = useState(null);
  const [condition, setCondition] = useState("clear");

  useEffect(() => {
    const fetchWeather = async () => {
      const selectedCity = localStorage.getItem("weatherCity") || "القاهرة";

      const city = egyptCities.find((c) => c.name === selectedCity);

      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`
        );

        const data = await res.json();
        setTemp(Math.round(data.current_weather.temperature));
        setCondition(data.current_weather.weathercode);
      } catch (err) {
        console.error("Failed to fetch weather:", err);
      }
    };

    // تشغيل عند أول تحميل
    fetchWeather();

    // 🔥 تشغيل فقط عند حفظ الإعداد من المودال
    window.addEventListener("weatherCityChanged", fetchWeather);

    return () => window.removeEventListener("weatherCityChanged", fetchWeather);
  }, []);

  // اختيار الأيقونة حسب حالة الطقس
  const getIcon = () => {
    if (condition === 0) return <WiDaySunny size={26} color="#fbc531" />;
    if ([1, 2, 3].includes(condition))
      return <WiCloud size={26} color="#95a5a6" />;
    if ([45, 48].includes(condition))
      return <WiFog size={26} color="#7f8c8d" />;
    if ([51, 61, 63, 80].includes(condition))
      return <WiRain size={26} color="#3498db" />;
    if ([71, 73, 75].includes(condition))
      return <WiSnow size={26} color="#74b9ff" />;
    return <WiDaySunny size={26} color="#fbc531" />;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "14px",
        fontWeight: "bold",
        color: textColor,
      }}
    >
      {getIcon()}
      {temp !== null ? `${temp}°C` : "--"}
    </div>
  );
}
