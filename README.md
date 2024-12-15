# Dynamic Event Calendar

A simple and dynamic web application for managing events. This project allows users to create, view, and download events in both JSON and CSV formats. The events are stored locally using the browser's `localStorage`, ensuring persistence across sessions.

## Features

- **Event Management**: Users can add events with details such as name, date, start time, end time, and description.
- **Event List**: View a list of all events with details such as event name, start time, end time, and description.
- **Download Options**: Download a list of marked events in JSON and CSV formats.
- **Sidebar Navigation**: A sidebar navigation system that allows easy access to the event calendar, event list, and download section.
- **Persistent Data**: Events are saved in the browser's `localStorage`, ensuring data persists even after page refreshes or browser restarts.
- **ShadCN UI**: The application uses [ShadCN UI](https://github.com/shadcn/ui), a highly customizable React component library, to provide a sleek and modern user interface for a polished and responsive design.

## Technologies Used

- **React**: JavaScript library for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling the application.
- **ShadCN UI**: A React UI component library used for building the user interface with pre-designed components.
- **React Router**: For navigation between different pages.
- **localStorage**: For storing event data locally in the browser.
- **CSV Download**: Functionality to download events as CSV files.
- **JSON Download**: Functionality to download events as JSON files.

## Setup

To get started with the project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/dynamic-event-calendar.git
cd dynamic-event-calendar
2. Install Dependencies
Ensure you have Node.js installed. Then, install the necessary dependencies using:

bash
Copy code
npm install
3. Run the Application
Start the development server:

bash
Copy code
npm run dev
This will start the application on http://localhost:3000.

4. Build for Production (Optional)
To build the app for production, use:

bash
Copy code
npm run build
This will create an optimized build in the build/ directory.

Project Structure
The project is organized as follows:

bash
Copy code
/public
  └── index.html           # The main HTML file
/src
  ├── /components          # Contains all the React components
  ├── /pages              # Different pages (e.g., Event List, Download)
  ├── App.js              # Main React component
  ├── index.js            # Entry point for React
  └── /styles             # Tailwind CSS configurations and styles
/package.json             # Project dependencies and scripts
/tailwind.config.js       # Tailwind CSS configuration file
/postcss.config.js       # PostCSS configuration file
/shadcn.config.js        # ShadCN UI configuration file (if applicable)
Features Overview
Event Calendar
Create Events: Add new events with details such as event name, date, time, and description.
View Events: A calendar view displaying all events for a selected day.
Delete Events: Remove events directly from the calendar.
Event List
View all events stored in localStorage, including event name, date, start time, end time, and description.
Option to delete events directly from the event list.
Download Section
Download as JSON: Users can download a JSON file of the marked events.
Download as CSV: Users can download the event list in CSV format for use in other applications like Excel.
Usage
Add Event: Navigate to the event calendar, click "Add Event," fill in the details, and save.
View Event List: See all events in a table format, with options to delete events.
Download Events: Go to the download section to export the event list in either JSON or CSV formats.
Contributing
Feel free to open issues or create pull requests for any features or bug fixes. Contributions are welcome!

How to Contribute:
Fork the repository.
Clone your fork to your local machine.
Create a new branch for your feature or bug fix.
Make your changes.
Push your changes and open a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.