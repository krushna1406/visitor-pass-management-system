import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";
import {
  ShieldCheck,
  QrCode,
  Mail,
  ClipboardCheck,
  Users,
  BarChart3,
} from "lucide-react";

const Home = () => {
  const { user } = useAuthContext();

  if (user?.role === "admin") return <Navigate to="/admin" />;
  if (user?.role === "security") return <Navigate to="/security" />;
  if (user?.role === "employee") return <Navigate to="/employee" />;

  const features = [
    {
      icon: ClipboardCheck,
      title: "Visitor Registration",
      description:
        "Visitors can register online by providing their details and visit purpose.",
    },
    {
      icon: Users,
      title: "Employee Approval",
      description:
        "Employees can review and approve or reject visitor requests instantly.",
    },
    {
      icon: Mail,
      title: "Email Notifications",
      description:
        "Approved visitors receive an email confirmation with their visitor pass attached.",
    },
    {
      icon: QrCode,
      title: "QR Verification",
      description:
        "Security staff can scan QR codes for quick and secure check-in/check-out.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Access",
      description:
        "Role-based authentication ensures only authorized users access the system.",
    },
    {
      icon: BarChart3,
      title: "Dashboard & Reports",
      description:
        "Track visitors, approvals and daily check-ins through dedicated dashboards.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-linear-to-r pt-30 from-indigo-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">

          <h1 className="text-5xl font-bold leading-tight">
            Smart Visitor Pass
            <br />
            Management System
          </h1>

          <p className="mt-6 text-lg text-indigo-100 max-w-3xl mx-auto">
            A secure and paperless solution for managing visitor registrations,
            approvals, QR-based check-ins, and visitor records efficiently.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <Link
              to="/login"
              className="px-7 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-7 py-3 border border-white rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition"
            >
              Register as Visitor
            </Link>
          </div>

        </div>
      </section>

      {/* Features */}
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

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6"
              >
                <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Icon className="text-indigo-600" size={28} />
                </div>

                <h3 className="text-xl font-semibold mt-5">
                  {feature.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </section>

      {/* How It Works */}
      <section className="bg-white py-20">

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center">
            <h2 className="text-3xl font-bold">
              How It Works
            </h2>

            <p className="mt-3 text-gray-600">
              A simple four-step visitor management process.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mt-16 text-center">

            <div>
              <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold mx-auto">
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
              <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold mx-auto">
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
              <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold mx-auto">
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
              <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold mx-auto">
                4
              </div>
              <h3 className="mt-5 font-semibold text-lg">
                QR Check-In
              </h3>
              <p className="mt-2 text-gray-600">
                Security scans the QR code for entry and exit.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* User Roles */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center">
          <h2 className="text-3xl font-bold">
            User Roles
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

          {[
            {
              title: "Visitor",
              items: [
                "Register for a visit",
                "Track request status",
                "Receive visitor pass",
              ],
            },
            {
              title: "Employee",
              items: [
                "Review visitor requests",
                "Approve or reject visits",
                "View upcoming visitors",
              ],
            },
            {
              title: "Security",
              items: [
                "Scan QR codes",
                "Check visitors in/out",
                "Monitor daily visitors",
              ],
            },
            {
              title: "Administrator",
              items: [
                "Manage users",
                "View visitor records",
                "Access dashboards",
              ],
            },
          ].map((role, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-indigo-600">
                {role.title}
              </h3>

              <ul className="mt-5 space-y-3 text-gray-600 list-disc list-inside">
                {role.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-indigo-700 text-gray-300 py-8 text-center">

        <h3 className="text-xl font-semibold text-white">
          Visitor Pass Management System
        </h3>

        <p className="mt-2">
          Secure • Fast • Paperless
        </p>

        <p className="mt-4 text-sm text-indigo-400">
          © 2026 Visitor Pass Management System. All Rights Reserved.
        </p>

      </footer>

    </div>
  );
};

export default Home;