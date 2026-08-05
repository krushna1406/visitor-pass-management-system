import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";
import { ShieldCheck, QrCode, Mail, ClipboardCheck, Users, BarChart3 } from "lucide-react";

const Home = () => {
  const { user } = useAuthContext();

  if (user?.role === "admin") return <Navigate to="/admin" />;
  if (user?.role === "security") return <Navigate to="/security" />;
  if (user?.role === "employee") return <Navigate to="/employee" />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="bg-linear-to-r pt-24 md:pt-30 from-sky-500 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">

          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Smart Visitor Pass
            <br />
            Management System
          </h1>

          <p className="mt-6 text-lg text-blue-100 max-w-3xl mx-auto">
            A secure and paperless solution for managing visitor registrations,
            approvals, QR-based check-ins, and visitor records efficiently.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <Link
              to="/login"
              className="px-7 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-7 py-3 border border-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Register as Visitor
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Key Features
          </h2>

          <p className="mt-3 text-gray-600">
            Everything you need to efficiently manage visitor access.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <ClipboardCheck className="text-blue-600" size={28} />
            </div>

            <h3 className="text-xl font-semibold mt-5">
              Visitor Registration
            </h3>

            <p className="text-gray-600 mt-3">
              Visitors can register online by providing their details and visit purpose.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="text-blue-600" size={28} />
            </div>

            <h3 className="text-xl font-semibold mt-5">
              Employee Approval
            </h3>

            <p className="text-gray-600 mt-3">
              Employees can review and approve or reject visitor requests instantly.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <Mail className="text-blue-600" size={28} />
            </div>

            <h3 className="text-xl font-semibold mt-5">
              Email Notifications
            </h3>

            <p className="text-gray-600 mt-3">
              Approved visitors receive an email confirmation with their visitor pass attached.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <QrCode className="text-blue-600" size={28} />
            </div>

            <h3 className="text-xl font-semibold mt-5">
              QR Verification
            </h3>

            <p className="text-gray-600 mt-3">
              Security staff can scan QR codes for quick and secure check-in/check-out.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <ShieldCheck className="text-blue-600" size={28} />
            </div>

            <h3 className="text-xl font-semibold mt-5">
              Secure Access
            </h3>

            <p className="text-gray-600 mt-3">
              Role-based authentication ensures only authorized users access the system.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <BarChart3 className="text-blue-600" size={28} />
            </div>

            <h3 className="text-xl font-semibold mt-5">
              Dashboard & Reports
            </h3>

            <p className="text-gray-600 mt-3">
              Track visitors, approvals and daily check-ins through dedicated dashboards.
            </p>
          </div>

        </div>

      </section>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-3 text-gray-600">A simple four-step visitor management process.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mt-16 text-center">
            <div>
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="mt-5 font-semibold text-lg">
                Register
              </h3>
              <p className="mt-2 text-gray-600">
                Visitor submits a visit request.
              </p>
            </div>

            <div>
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="mt-5 font-semibold text-lg">
                Approval
              </h3>
              <p className="mt-2 text-gray-600">
                Employee approves or rejects the request.
              </p>
            </div>

            <div>
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="mt-5 font-semibold text-lg">
                Email Pass
              </h3>
              <p className="mt-2 text-gray-600">
                Approved visitors receive their visitor pass by email.
              </p>
            </div>

            <div>
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto">
                4
              </div>
              <h3 className="mt-5 font-semibold text-lg">
                QR Check-In
              </h3>
              <p className="mt-2 text-gray-600">Security scans the QR code for entry and exit.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold">User Roles</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-blue-600">Visitor</h3>

            <ul className="mt-5 space-y-3 text-gray-600 list-disc list-inside">
              <li>Register for a visit</li>
              <li>Track request status</li>
              <li>Receive visitor pass</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-blue-600">Employee</h3>

            <ul className="mt-5 space-y-3 text-gray-600 list-disc list-inside">
              <li>Review visitor requests</li>
              <li>Approve or reject visits</li>
              <li>View upcoming visitors</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-blue-600">Security</h3>

            <ul className="mt-5 space-y-3 text-gray-600 list-disc list-inside">
              <li>Scan QR codes</li>
              <li>Check visitors in/out</li>
              <li>Monitor daily visitors</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-blue-600">Administrator</h3>

            <ul className="mt-5 space-y-3 text-gray-600 list-disc list-inside">
              <li>Manage users</li>
              <li>View visitor records</li>
              <li>Access dashboards</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="bg-blue-700 text-gray-300 py-8 text-center">
        <h3 className="text-xl font-semibold text-white">Visitor Pass Management System</h3>
        <p className="mt-2">Secure - Fast - Paperless</p>
        <p className="mt-4 text-sm text-blue-400">
          © 2026 Visitor Pass Management System. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;