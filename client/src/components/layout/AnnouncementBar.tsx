import { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);
  const [text, setText] = useState("📦 Exclusive Amazon Luxury Deals — Handpicked Selection with Fast Prime Shipping | Best Reviews Guaranteed");

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/config/announcement_text");
        const data = await res.json();
        if (data && data.value) {
          setText(data.value);
        }
      } catch (err) {}
    };
    fetchAnnouncement();
  }, []);

  if (!visible) return null;

  return (
    <div className="gradient-gold relative py-2 text-center font-body text-sm font-medium tracking-wide text-primary-foreground">
      <div className="container mx-auto px-4">
        {text}
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground/80 transition-colors hover:text-primary-foreground"
        aria-label="Close announcement"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default AnnouncementBar;
