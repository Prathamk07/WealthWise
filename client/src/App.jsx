import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import AddTransaction from "./pages/AddTransaction";
import { Toaster } from "react-hot-toast";
import ChatBot from "./pages/ChatbotPage.jsx";
import SmartDealPage from './pages/SmartDealPage';
import NotFound from "./pages/NotFound.jsx";
import RecentTransactions from "./pages/RecentTransactions.jsx";


function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/smart-deal" element={<SmartDealPage />} />
        <Route path="/chat" element={<ChatBot />} />
        <Route path="/recent-transactions/:userid?" element={<RecentTransactions />}></Route>
        <Route path="*" element={<NotFound />} />

      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;