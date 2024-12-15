import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface Event {
  name: string;
  startTime: string;
  endTime: string;
  description: string;
  date: string;
}

const DownloadEventPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const storageKey = "dynamic_event_calendar";

  useEffect(() => {
    // Fetch events from localStorage
    const savedEvents = localStorage.getItem(storageKey);
    if (savedEvents) {
      const parsedEvents: Record<string, Event[]> = JSON.parse(savedEvents); // Explicitly cast the parsed JSON
      // Flatten events grouped by date into a single array
      const allEvents = Object.entries(parsedEvents).flatMap(([date, eventList]) =>
        eventList.map((event) => ({ ...event, date }))
      );
      setEvents(allEvents);
    }
  }, []);

  // Function to download events as JSON
  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(events, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "events.json";
    link.click();
  };

  // Function to download events as CSV
  const downloadCSV = () => {
    const headers = ["Event Name", "Date", "Start Time", "End Time", "Description"];
    const rows = events.map((event) => [
      event.name,
      event.date,
      event.startTime,
      event.endTime,
      event.description || "No description",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "events.csv";
    link.click();
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-center">Download Your Events</h1>

      {events.length > 0 ? (
        <div className="space-x-4">
          <Button className="mt-4" onClick={downloadJSON}>
            Download as JSON
          </Button>
          <Button className="mt-4" onClick={downloadCSV}>
            Download as CSV
          </Button>
        </div>
      ) : (
        <p className="text-gray-500">No events available to download.</p>
      )}
    </div>
  );
};

export default DownloadEventPage;
