import {Route, Routes} from 'react-router-dom'
// import { useState } from 'react';
import 'antd/dist/antd.min.css'

import SharedLayout from './pages/SharedLayout';
import FleetPage from './pages/FleetPage';
import TrucksPage from './pages/TrucksPage';
import TruckPage from './pages/TruckPage';
import TripPage from './pages/TripPage';
import UsersPage from './pages/UsersPage';
import ZonesPage from './pages/ZonesPage';
import ZonePage from './pages/ZonePage'
// import LoginPage from './pages/LoginPage'
import ErrorPage from './pages/ErrorPage';

function App() {
  // const [username, setUsername] = useState({})

  return (
    <Routes>
      <Route path='/' element={<SharedLayout/>}>
        <Route index element={<FleetPage />}/>
        <Route path='trucks' element={<TrucksPage />}/>
        <Route path='trucks/:truckName' element={<TruckPage />}/>
        <Route path='trips/:tripId' element={<TripPage />} />
        <Route path='zones' element={<ZonesPage />}/>
        <Route path='zones/:zoneId' element={<ZonePage/>} />
        <Route path='users' element={<UsersPage />}/>
        {/* <Route path='login' element={<LoginPage  setUsername={setUsername} />}/> */}
        <Route path='*' element={<ErrorPage />}/>
      </Route>
    </Routes>
  );
}

export default App;
