import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useParams } from "react-router-dom";


const RecentTransactions = () => {

  const userId = useParams().userid
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
    });

    const fetchTransactions = async () => {
      try {
        console.log(userId)
        const res = await axios.get(`/api/transaction/get-all/${userId}`);
        setTransactions(res.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
    
  }, [userId]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Recent Transactions Report", 14, 20);

    doc.autoTable({
      head: [["Description", "Amount", "Type", "Date"]],
      body: transactions.map((trans) => [
        trans.description,
        `₹${trans.amount}`,
        trans.type,
        new Date(trans.date).toLocaleDateString(),
      ]),
    });

    doc.save("transactions_report.pdf");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="container mx-auto px-6 py-10 bg-gradient-to-b from-purple-500 to-indigo-600 shadow-2xl rounded-3xl"
    >
      <div className="flex items-center justify-between mb-8">
        <motion.h2
          className="text-5xl font-extrabold text-white tracking-wide drop-shadow-lg"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          Recent Transactions
        </motion.h2>
        <motion.button
          onClick={generatePDF}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
          whileHover={{ scale: 1.1 }}
        >
          Generate PDF Report
        </motion.button>
      </div>

      <div className="overflow-hidden rounded-xl shadow-xl">
        <table className="w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
            <tr>
              <th className="p-5 font-semibold uppercase tracking-wider text-left text-sm">Description</th>
              <th className="p-5 font-semibold uppercase tracking-wider text-right text-sm">Amount</th>
              <th className="p-5 font-semibold uppercase tracking-wider text-left text-sm">Type</th>
              <th className="p-5 font-semibold uppercase tracking-wider text-left text-sm">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((trans, index) => (
              <motion.tr
                key={trans._id}
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
                className="bg-white border-b border-gray-200 hover:bg-gradient-to-r from-blue-50 to-purple-50 transition duration-300"
              >
                <td className="p-4 text-gray-700 font-medium">{trans.description}</td>
                <td className="p-4 text-right text-gray-700 font-medium">₹{trans.amount}</td>
                <td className="p-4 text-gray-700 font-medium">{trans.type}</td>
                <td className="p-4 text-gray-700 font-medium">{new Date(trans.date).toLocaleDateString()}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RecentTransactions;
