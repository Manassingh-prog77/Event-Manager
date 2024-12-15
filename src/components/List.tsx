import { useEffect, useState } from "react";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";
import { Button } from "./ui/button";

interface Event {
  name: string;
  startTime: string;
  endTime: string;
  description: string;
  date: string;
}

const EventList = () => {
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

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-center">Event List</h1>

      {events.length > 0 ? (
        <div className="overflow-x-auto w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%]">
          <Table className="min-w-full table-auto mx-auto">
            <TableCaption>A list of all your events.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Event Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.startTime}</TableCell>
                  <TableCell>{event.endTime}</TableCell>
                  <TableCell>{event.description || "No description"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-gray-500">No events available. Add some events to view them here.</p>
      )}

      <Button className="mt-4" onClick={() => (window.location.href = "/")}>Add New Event</Button>
    </div>
  );
};

export default EventList;
