"use client";

import { useEffect } from "react";

export default function AnalyticsTracker() {

  useEffect(() => {

    let visitorId = localStorage.getItem("visitor_id");

    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem("visitor_id", visitorId);
    }

    const send = () => {
      fetch("/api/admin/analytics/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          page: window.location.pathname,
          visitorId
        })
      });
    };

    send();

    const interval = setInterval(send, 10000);

    return () => clearInterval(interval);

  }, []);

  return null;
}