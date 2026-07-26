import React, { useState } from 'react'
import QRScanner from './QRScanner';
import { checkOutVisitor, verifyPass } from '../../services/api';
import { format } from 'date-fns'
import { toast } from 'react-hot-toast'

const CheckIn = () => {

  const [visitor, setVisitor] = useState(null);
  const [activeLog, setActiveLog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScan = async (visitorId) => {

    const result = await verifyPass(visitorId);
    // console.log(result);
    if (result.success) {
      setVisitor(result.visitor);
      setActiveLog(result.activeLog);
    }
  }

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await checkOutVisitor(visitor._id);
      if (result.success) {
        toast.success(result.message);
        setVisitor(null);
        setActiveLog(null);
        setLoading(false);
        return;
      }
    } catch (error) {
      setError(error.response?.data?.message);
      setLoading(false);
    }
  }

  return (
    <div>
      {!visitor &&
        <div className='mt-30'>
          <QRScanner onScanSuccess={handleScan} />
        </div>
      }

      {visitor && (
        <div className="max-w-md mx-auto mt-5 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">

          <div className="bg-indigo-600 text-white p-5">
            <h2 className="text-2xl font-bold">{visitor.name}</h2>
            <p className="text-indigo-100">
              Visitor Pass Verified ✓
            </p>
          </div>

          <div className="p-6 space-y-4">

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{visitor.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Host</p>
              <p className="font-medium">{visitor.employee?.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-10">

              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">
                  {format(new Date(visitor.visitDate), "dd MMM yyyy")}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Checked in Time</p>
                <p className="font-medium">
                  {format(new Date(activeLog.checkIn), "hh:mm a")}
                </p>
              </div>

            </div>

            <div>
              <p className="text-sm text-gray-500">Purpose</p>
              <p className="font-medium capitalize">
                {visitor.purpose}
              </p>
            </div>

            <button
              onClick={handleClick}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
            >
              Check Out
            </button>

          </div>
        </div>
      )}

      {error &&
        <div className='text-center text-red-500 text-lg mt-2'>{error}</div>
      }
    </div>
  )
}

export default CheckIn