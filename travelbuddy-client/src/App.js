import * as Reactstrap from "reactstrap"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import { Provider } from "react-redux"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Welcome from "./components/Welcome"
import UserType from "./components/UserType"
import Register from "./components/Register"
import Login from "./components/Login"
import DriverRegister from "./components/DriverRegister"
import DriverLogin from "./components/DriverLogin"
import ForgotPw from "./components/ForgotPw"
import AboutUs from "./components/AboutUs"
import SearchTrips from "./components/SearchTrips"
import Chat from "./components/Chat"
import PaymentMethod from "./components/PaymentMethod"
import CardPayment from "./components/CardPayment"
import Feedback from "./components/Feedback"
import Home from "./components/Home"
import travelBuddyStore from "./store/travelBuddyStore"
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import Booking from "./components/Booking"
import ConformBooking from "./components/ConformBooking"
import ResetPassword from "./components/ResetPassword"


function AppContent() {
  const location = useLocation()

  const hideHeaderOnThisPage = location.pathname === "/home"

  return (
    <Reactstrap.Container fluid>
      {/* Header appears on all pages except /home */}
      {!hideHeaderOnThisPage && (
        <Reactstrap.Row>
          <Header />
        </Reactstrap.Row>
      )}

      <Reactstrap.Row className="p-3">
        <Routes>
          {/* 1. Welcome */}
          <Route path="/" element={<Welcome />} />

          {/* 2. Choose user type */}
          <Route path="/user-type" element={<UserType />} />

          {/* 3. User auth */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/forgotPassword" element={<ForgotPw />} />
          <Route path="/resetPassword" element={<ResetPassword />} />

          <Route path="/home" element={<Home />} />


          {/* 4. Taxi driver auth */}
          <Route path="/driver-login" element={<DriverLogin />} />
          <Route path="/driver-register" element={<DriverRegister />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* 5. About and search companions */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/search" element={<SearchTrips />} />

          {/* 6. Chat */}
          <Route path="/chat" element={<Chat />} />

          <Route path="/booking" element={<Booking />} />

          <Route path="/conform-booking" element={<ConformBooking />} />

          {/* 7. Payment */}
          <Route path="/payment-method" element={<PaymentMethod />} />
          <Route path="/card-payment" element={<CardPayment />} />

          {/* 8. Feedback */}
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/reset-password" element={<ResetPassword />} />


        </Routes>
      </Reactstrap.Row>

      <Reactstrap.Row>
        <Footer />
      </Reactstrap.Row>
    </Reactstrap.Container>
  )
}

function App() {
  return (
    <Provider store={travelBuddyStore}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  )
}

export default App
