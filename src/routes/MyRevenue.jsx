import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Context } from "../provider/AuthProvider";



const MyRevenue = () => {

    let {user}=useContext(Context)


    const fetchUsers = async () => {
        const response = await axios.get(`https://business-dashboard-server.vercel.app/revenue/${user?.email}`);
        return response?.data;
      };
  const { data: revenue = [], refetch } = useQuery({
    queryKey: ["revenue"],
    queryFn: fetchUsers,
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://business-dashboard-server.vercel.app/revenue/${id}`)
          .then(() => {
            refetch();
            Swal.fire("Deleted!", "The item has been deleted.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "There was an issue deleting the item.", "error");
          });
      }
    });
  };

  if (revenue.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <FaExclamationTriangle className="text-yellow-500 text-5xl mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Oops! No revenue found here.</h2>
          <p className="text-gray-500 mt-2">It seems there are no revenue records available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Revenue</h2>
      <div className="hidden md:block overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 text-sm md:text-base">
          <thead className="border-2 border-black">
            <tr className="bg-gray-200 text-black text-base md:text-lg">
              <th className="px-3 py-2 border-2 border-r-2">#</th>
              <th className="px-3 py-2 border-2 border-r-2">Month</th>
              <th className="px-3 py-2 border-2 border-r-2">Income ($)</th>
              <th className="px-3 py-2 border-2 border-r-2">Expenses ($)</th>
              <th className="px-3 py-2 border-2 border-r-2">Actions</th>
            </tr>
          </thead>
          <tbody className=" border-b-2 border-l-2 border-r-2 border-black">
            {revenue.map((entry, index) => (
              <tr key={entry._id} className="border-b text-center text-black">
                <th className="px-3 py-2 border-2 border-r-2">{index + 1}</th>
                <td className="px-3 py-2 border-2 border-r-2">{entry.month}</td>
                <td className="px-3 py-2 border-2 border-r-2">{entry.income}</td>
                <td className="px-3 py-2 border-2 border-r-2">{entry.expense}</td>
                <td className="px-3 py-2 flex flex-wrap justify-center gap-2">
                  <Link
                    to={`/dashboard/updaterevenue/${entry._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded w-full md:w-auto"
                  >
                    Update
                  </Link>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded w-full md:w-auto"
                    onClick={() => handleDelete(entry._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden flex flex-col gap-4">
        {revenue.map((entry, index) => (
          <div key={entry._id} className="p-4 bg-amber-400 shadow-lg rounded-md">
            <h3 className="text-lg font-bold text-black">{entry.month}</h3>
            <p className=" text-black font-bold">Income: ${entry.income}</p>
            <p className="text-black font-bold">Expenses: ${entry.expense}</p>
            <div className="flex justify-between mt-2">
              <Link
                to={`/dashboard/updaterevenue/${entry._id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Update
              </Link>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(entry._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRevenue;
