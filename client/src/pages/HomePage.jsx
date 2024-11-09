import React, { useState, useEffect } from "react";
import {
  BarChart2,
  IndianRupee,
  PieChart,
  LogOut,
  TrendingUp,
  AlertTriangle,
  CreditCard,
  Users,
  Zap,
  Calendar,
  FileText,
  Bell,
  Check,
  X,
  SquareMinus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  // const [reload,setReload]=useState(0)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Payment of ₹200 received", type: "alert", read: false },
    {
      id: 2,
      message: "Payment request: ₹500 from Vendor",
      type: "paymentRequest",
      read: false,
    },
    {
      id: 3,
      message: "Your subscription will renew tomorrow",
      type: "reminder",
      read: false,
    },
    { id: 4, message: "Stock ABC up by 5%", type: "alert", read: false },
    {
      id: 5,
      message: "Investment update: New mutual fund available",
      type: "alert",
      read: false,
    },
    {
      id: 6,
      message: "Interest rate change for savings",
      type: "reminder",
      read: false,
    },
  ]);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  // const [autoClose, setAutoClose] = useState(true);
  const [income, setincome] = useState(0);
  const [expense, setexpense] = useState(0);
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState();
  const [recentTrans, setRecentTrans] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleNotificationPanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const toggleReadStatus = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: !notification.read }
          : notification
      )
    );
  };

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const handlePaymentAction = (id, action) => {
    console.log(`Payment request ${action}ed`);
    removeNotification(id);
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const getIncome = async () => {
    try {
      const res = await axios.get("/api/dashboard/get-income", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.data;
      setincome(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getExpense = async () => {
    try {
      const res = await axios.get("/api/dashboard/get-expense", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.data;
      setexpense(data);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTransaction = async () => {
    try {
      if (!loading) {
        const res = await axios.get(`/api/transaction/get-all/${user._id}`, {
          headers: { "Content-type": "application/json" },
        });
        const data = res.data;
        console.log(data);
        console.log(data.slice(-3));
        setTransactions(data);
        setRecentTrans(data.slice(-3));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRecentTrans = async () => {};

  const getUser = () => {
    // setUser(JSON.parse(localStorage.getItem('persist:root')).user || '')

    const currentUser = async () => {
      const res = await JSON.parse(localStorage.getItem("persist:root")).user;
      return JSON.parse(res);
    };
    currentUser()
      .then((res) => {
        console.log(res.currentUser);
        setUser(res.currentUser);
        setLoading(false);
        if (
          res.currentUser.name !== null &&
          res.currentUser.name !== undefined
        ) {
          setLoggedIn(true);
          console.log(res.currentUser.name);
          console.log("loggedIn");
        } else {
          setLoggedIn(false);
          console.log("notloggedin");
          navigate("/");
          window.alert("Please sign in to continue");
        }
      })
      .catch((error) => console.error(error));
    if (!loading) {
      window.location.reload();
      if (loggedIn == false) {
        navigate("/");
        window.alert("Please sign in to continue");
      } else {
        setUser(currentUser);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getTransaction();
    getIncome();
    getExpense();
    getRecentTrans;
  }, [loading]);
  return (
    <div className="min-h-screen bg-gray-100 relative">
      {!loading && (
        <div>
          <nav className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-indigo-600">WealthWise</h1>
              <div className="flex items-center">
                <button
                  onClick={toggleNotificationPanel}
                  className="mr-4 text-gray-600 hover:text-indigo-500 transition duration-300 relative"
                >
                  <Bell />
                  {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                4
              </span> */}
                  {notifications.filter((notification) => !notification.read)
                    .length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {
                        notifications.filter(
                          (notification) => !notification.read
                        ).length
                      }
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    console.log("Signout");
                    localStorage.clear();
                    localStorage.removeItem("persist:root");
                    setLoggedIn(false);
                    navigate("/");
                  }}
                  className="text-gray-600 hover:text-indigo-500 transition duration-300"
                >
                  <LogOut />
                </button>
              </div>
            </div>
          </nav>

          <main className="container mx-auto px-6 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Welcome back, User!
            </h2>
            {/* Revenue, Profit, Expenses, Growth */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {/* Revenue, Profit, Expenses, Growth Cards */}
              <div
                className="bg-white p-6 rounded-lg shadow-md"
                data-aos="fade-up"
              >
                <IndianRupee className="text-4xl text-indigo-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-700">
                  Total Revenue
                </h3>
                <p className="text-3xl font-bold text-gray-800">₹{income}</p>
              </div>
              <div
                className="bg-white p-6 rounded-lg shadow-md"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <BarChart2 className="text-4xl text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-700">
                  Profit
                </h3>
                <p className="text-3xl font-bold text-gray-800">
                ₹{income - expense}
                </p>
              </div>
              <div
                className="bg-white p-6 rounded-lg shadow-md"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <PieChart className="text-4xl text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-700">
                  Expenses
                </h3>
                <p className="text-3xl font-bold text-gray-800">₹{expense}</p>
              </div>
              <div
                className="bg-white p-6 rounded-lg shadow-md"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <TrendingUp className="text-4xl text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-700">
                  Growth
                </h3>
                <p className="text-3xl font-bold text-gray-800">
                  {expense !== 0
                    ? `₹${(((income - expense) / expense) * 100).toFixed(2)}%`
                    : "0"}
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Link to={`/recent-transactions/${user._id}`}>
              <div
                className="bg-white p-6 rounded-lg shadow-md"
                data-aos="fade-up"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Recent Transactions
                </h3>
                <div className="overflow-x-auto">
                  {recentTrans && (
                    <div>{console.log("recentTrans :", recentTrans)}</div>
                  )}
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-100">
                        {/* <th className="p-3">Date</th> */}
                        <th className="p-3">Description</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTrans &&
                        recentTrans.map((trans, index) => (
                          <tr key={index} className="border-b">
                            {/* <td className="p-3">{trans.}</td> */}
                            <td className="p-3">{trans.description}</td>
                            <td
                              className={`p-3 ${
                                trans.type == "income"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {trans.amount}
                            </td>
                            <td className="p-3">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                                Completed
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              </Link>

              <div
                className="bg-white p-6 rounded-lg shadow-md"
                data-aos="fade-up"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Financial Insights
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-green-100 rounded-lg">
                    <TrendingUp className="text-2xl text-green-500 mr-4" />
                    <div>
                      <h4 className="font-semibold">Positive Cash Flow</h4>
                      <p className="text-sm text-gray-600">
                        Your business is maintaining a healthy cash flow this
                        month.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-yellow-100 rounded-lg">
                    <AlertTriangle className="text-2xl text-yellow-500 mr-4" />
                    <div>
                      <h4 className="font-semibold">Upcoming Payment Due</h4>
                      <p className="text-sm text-gray-600">
                        You have a payment of ₹500 due in 3 days.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div
                className="bg-white p-6 rounded-lg shadow-md"
                data-aos="fade-up"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Upcoming Payments
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="text-indigo-500 mr-3" />
                      <div>
                        <p className="font-semibold">Vendor Invoice #1234</p>
                        <p className="text-sm text-gray-500">
                          Due: March 25, 2023
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-red-500">₹1,500</p>
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="text-indigo-500 mr-3" />
                      <div>
                        <p className="font-semibold">Utility Bill</p>
                        <p className="text-sm text-gray-500">
                          Due: March 30, 2023
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-red-500">₹250</p>
                  </li>
                </ul>
              </div>

              <div
                className="bg-white p-6 rounded-lg shadow-md"
                data-aos="fade-up"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/add-transaction">
                    <div className="flex flex-col items-center justify-center p-4 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition duration-300">
                      <CreditCard className="text-indigo-500 mb-2" />
                      <span className="text-sm font-semibold">Add Payment</span>
                    </div>
                  </Link>
                  <button className="flex flex-col items-center justify-center p-4 bg-green-100 rounded-lg hover:bg-green-200 transition duration-300">
                    <Users className="text-green-500 mb-2" />
                    <span className="text-sm font-semibold">
                      Manage Vendors
                    </span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 bg-purple-100 rounded-lg hover:bg-purple-200 transition duration-300">
                    <FileText className="text-purple-500 mb-2" />
                    <span className="text-sm font-semibold">
                      Generate Report
                    </span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition duration-300">
                    <Zap className="text-yellow-500 mb-2" />
                    <span className="text-sm font-semibold">Get Insights</span>
                  </button>
                </div>
              </div>
            </div>

            <div
              className="bg-white p-6 rounded-lg shadow-md mt-8 md:mt-8"
              data-aos="fade-up"
            >
              <Link to="/smart-deal">
                <div className="flex flex-col items-center justify-center p-4 bg-pink-100 rounded-lg hover:bg-pink-200 transition duration-300">
                  <Zap className="text-pink-500 mb-2" />
                  <span className="text-sm font-semibold">
                    Smart Deal Recommendation
                  </span>
                </div>
              </Link>
            </div>
            <button
              onClick={() => navigate("/chat")}
              className="fixed bottom-6 right-6 p-4 text-white bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-700 rounded-full shadow-lg hover:scale-110 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
            >
              🤖 Ask me!
            </button>
          </main>

          <AnimatePresence>
            {isPanelOpen && (
              <motion.div
                key="notificationPanel"
                initial={{ opacity: 0, y: "100%", x: "20%", rotate: -10 }}
                animate={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
                exit={{ opacity: 0, y: "100%", x: "20%", rotate: -10 }}
                transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
                className="fixed bottom-0 right-0 w-full max-w-md bg-white shadow-lg z-[1000] overflow-hidden rounded-t-lg"
              >
                <div className="p-6 bg-indigo-500 text-white rounded-t-lg flex justify-between items-center">
                  <h3 className="text-lg font-bold">Notifications</h3>
                  <button
                    onClick={toggleNotificationPanel}
                    className="text-white hover:opacity-75"
                  >
                    Close
                  </button>
                </div>

                <div className="flex justify-between items-center px-6 py-2 bg-gray-50">
                  <button
                    onClick={markAllAsRead}
                    className="text-indigo-500 hover:text-indigo-700 font-medium"
                  >
                    Mark All as Read
                  </button>
                  {/* <label className="text-gray-500 text-sm">
                Auto-close
                <input
                  type="checkbox"
                  checked={autoClose}
                  onChange={() => setAutoClose(autoClose)}
                  className="ml-2"
                />
              </label> */}
                </div>

                <ul className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <motion.li
                        key={notification.id}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`flex justify-between items-center p-4 rounded-lg shadow transition ${
                          notification.read ? "bg-gray-200" : "bg-blue-50"
                        }`}
                      >
                        <div
                          onClick={() => toggleReadStatus(notification.id)}
                          className="flex-1 cursor-pointer"
                        >
                          <p className="font-semibold">
                            {notification.type === "alert" && (
                              <span className="text-yellow-500 mr-2">⚠️</span>
                            )}
                            {notification.type === "paymentRequest" && (
                              <span className="text-green-500 mr-2">💸</span>
                            )}
                            {notification.type === "reminder" && (
                              <span className="text-purple-500 mr-2">🔔</span>
                            )}
                            {notification.message}
                          </p>
                        </div>
                        {notification.type === "paymentRequest" ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                handlePaymentAction(notification.id, "accept")
                              }
                              className="p-2 rounded-full bg-green-500 hover:bg-green-600 text-white"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() =>
                                handlePaymentAction(notification.id, "decline")
                              }
                              className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="ml-4 text-gray-600 hover:text-black transition"
                          >
                            <SquareMinus size={20} />
                          </button>
                        )}
                      </motion.li>
                    ))
                  ) : (
                    <p className="text-gray-500">No new notifications</p>
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default HomePage;
