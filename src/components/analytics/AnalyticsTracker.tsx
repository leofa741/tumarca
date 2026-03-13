"use client";

import { useEffect } from "react";

export default function AnalyticsTracker() {

  useEffect(() => {

    let visitorId = localStorage.getItem("visitor_id");

    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem("visitor_id", visitorId);
    }

    fetch("/api/admin/analytics/track", {
      method: "POST",
      body: JSON.stringify({
        page: window.location.pathname,
        visitorId
      })
    });

  }, []);

  return null;
}