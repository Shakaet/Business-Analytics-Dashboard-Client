import React from 'react';
import useRevenue from '../assets/hook/useRevenue';
import useUser from '../assets/hook/useUser';
import useTransection from '../assets/hook/useTransection';
import { FaMoneyBillWave, FaReceipt, FaUsers } from 'react-icons/fa';
import Card from '../shared/Card';
import RevenueGraph from '../component/RevenueGraph';
import UserRoleGraph from '../component/UserRoleGraph';
import TransactionGraph from '../component/TransactionGraph';
import ProfitLossGraph from '../component/ProfitLossGraph';
import IncomePieChart from '../component/IncomePieChart';
import ExpensePieChart from '../component/ExpensePieChart';
import AmountType from '../component/AmountType';
import AmountByStatus from '../component/AmountByStatus';

const DashboardHome = () => {
  let [revenue] = useRevenue();
  let [users] = useUser();
  let [transections] = useTransection();

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-5">
      <div className="container mx-auto">
        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-3">
          <Card
            title="Total Accounts Receivable"
            count={`$${revenue.reduce((acc, rev) => acc + Number(rev.income), 0)}`}
            icon={<FaMoneyBillWave />}
          />
            <Card
            title="Total Accounts Payable"
            count={`$${revenue.reduce((acc, rev) => acc + Number(rev.expense), 0)}`}
            icon={<FaMoneyBillWave />}
          />
          <Card title="Total Users" count={users.length} 
          icon={<FaUsers />} 
          />
          <Card title="Total Transactions" count={transections.length}
           icon={<FaReceipt />}
            />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-8'>
        <div className="bg-white p-4 rounded-lg shadow-md">
            <IncomePieChart data={revenue} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <ExpensePieChart data={revenue} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <AmountType transactions={transections} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <AmountByStatus transactions={transections} />
          </div>
        </div>

        {/* Graphs Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <RevenueGraph data={revenue} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <UserRoleGraph users={users} />
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2'>
        <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
          <TransactionGraph transactions={transections} />
        </div>
        <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
          <ProfitLossGraph data={revenue} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
