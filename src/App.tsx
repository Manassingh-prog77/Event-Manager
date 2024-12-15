import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import EventCalendar from "./components/Calendar";
import Layout from "./layout"; // Import the Layout component
import EventList from './components/List';
import DownloadEventPage from './components/Download';

function App() {
  return (
    <Router>
    <Layout>
      {/* Main content wrapped in Layout */}
     
   
    <Routes>
    <Route path='/' element={<EventCalendar />} />
    <Route path='/List' element={<EventList />} />
    <Route path='/download' element={<DownloadEventPage />} />
    </Routes>
    </Layout>
    </Router>

  );
}

export default App;