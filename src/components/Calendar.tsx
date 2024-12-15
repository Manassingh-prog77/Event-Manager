import { useState, useEffect } from "react";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";

interface Event {
  name: string;
  startTime: string;
  endTime: string;
  description: string;
}

const EventCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Record<string, Event[]>>({});
  const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Event>({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const storageKey = "dynamic_event_calendar";

  // Fetch events from localStorage when the component mounts
  useEffect(() => {
    const savedEvents = localStorage.getItem(storageKey);
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Persist events to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(events).length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(events));
    }
  }, [events]);

  // Add a new event to the selected date
  const handleAddEvent = () => {
    const { name, startTime, endTime } = newEvent;

    if (!name || !startTime || !endTime) {
      alert("Please fill in all required fields: Event Name, Start Time, and End Time.");
      return;
    }

    // Ensure start time is before end time
    if (startTime >= endTime) {
      alert("Start time must be before end time.");
      return;
    }

    const dayKey = date.toDateString();
    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };

      // Initialize array if no events exist for the day
      if (!updatedEvents[dayKey]) updatedEvents[dayKey] = [];

      // Check for overlap with existing events
      const overlap = updatedEvents[dayKey].some(
        (event) =>
          (startTime >= event.startTime && startTime < event.endTime) ||
          (endTime > event.startTime && endTime <= event.endTime)
      );

      if (overlap) {
        alert("Event times overlap with an existing event.");
        return prevEvents; // Return previous state without updating
      }

      // Append the new event
      updatedEvents[dayKey].push(newEvent);

      // Return updated events
      return updatedEvents;
    });

    // Reset the new event form
    setNewEvent({ name: "", startTime: "", endTime: "", description: "" });
    setDrawerOpen(false);
    alert("Event added successfully!");
  };

  // Delete an event
const handleDeleteEvent = (index: number) => {
  const dayKey = date.toDateString();
  const updatedEvents = { ...events };

  // Remove the event at the specified index
  updatedEvents[dayKey].splice(index, 1);

  // Remove the dayKey if no events are left for the day
  if (updatedEvents[dayKey].length === 0) delete updatedEvents[dayKey];

  // Update state
  setEvents(updatedEvents);

  // Update localStorage
  localStorage.setItem(storageKey, JSON.stringify(updatedEvents));

  alert("Event deleted successfully!");
};


  // Update the list of events for the selected date
  useEffect(() => {
    const dayKey = date.toDateString();
    setCurrentEvents(events[dayKey] || []);
  }, [date, events]);

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-center">Dynamic Event Calendar</h1>

      <div className=" mb-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(day) => day && setDate(day)}
          className="rounded-md border w-full p-2"
        />
      </div>

      <div className="mt-4 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%]">
        <h2 className="text-xl font-bold">Events on {date.toDateString()}</h2>
        <ul className="mt-2">
          {currentEvents.length > 0 ? (
            currentEvents.map((event, index) => (
              <li key={index} className="p-4 border-b flex justify-between items-center">
                <div>
                  <p className="font-bold">{event.name}</p>
                  <p>
                    {event.startTime} - {event.endTime}
                  </p>
                  <p>{event.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteEvent(index)}
                >
                  Delete
                </Button>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No events for this day. Add one using the button below!</p>
          )}
        </ul>
      </div>

      <Button className="mt-4" onClick={() => setDrawerOpen(true)}>
        Add Event
      </Button>

      <Dialog open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white p-4 rounded-lg shadow-lg">
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>
            Fill out the details of the new event below.
          </DialogDescription>

          <Input
            placeholder="Event Name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            className="mb-2"
          />
          <Input
            type="time"
            placeholder="Start Time"
            value={newEvent.startTime}
            onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
            className="mb-2"
          />
          <Input
            type="time"
            placeholder="End Time"
            value={newEvent.endTime}
            onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
            className="mb-2"
          />
          <Textarea
            placeholder="Description (Optional)"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            className="mb-2"
          />
          <div className="flex justify-between">
            <Button onClick={handleAddEvent}>Save Event</Button>
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventCalendar;
