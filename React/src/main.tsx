import React from 'react'
import ReactDOM from 'react-dom/client'
import 'leaflet/dist/leaflet.css';
import '@mantine/core/styles.css';
import '../src/App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Import the layouts
import RootLayout from './layouts/root-layout'
//import DashboardLayout from './layouts/dashboard-layout'

// Import the components
import SignInPage from './routes/sign-in'
import SignUpPage from './routes/sign-up'
import LineupHub from './routes/lineup-hub'
import PredictHub from './routes/predict-hub'
import LeafletMap from './ui/leaflet-map';
import WelcomeCards from './routes/welcomenav'
import LineupForm from './ui/lineup-form';
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <WelcomeCards /> },
      { path: "/lineupHub", element: <LineupHub /> },
      { path: "/mapTest", element: <LeafletMap /> },
      { path: "/predictHub", element: <PredictHub /> },
      { path: "/submitHub", element: <LineupForm /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)