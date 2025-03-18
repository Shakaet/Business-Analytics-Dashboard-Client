import React from 'react'
import useRevenue from '../assets/hook/useRevenue'
import useUser from '../assets/hook/useUser'
import useTransection from '../assets/hook/useTransection'
import { FaMoneyBillWave, FaReceipt, FaUsers } from 'react-icons/fa'
import Card from '../shared/Card'
import RevenueGraph from '../component/RevenueGraph'
import UserRoleGraph from '../component/UserRoleGraph'
import TransactionGraph from '../component/TransactionGraph'

const DashboardHome = () => {

   
  let [revenue]=useRevenue()
  let [users] =useUser()
  let [transections]= useTransection()
  return (
    <div>

<div className="min-h-screen bg-gray-100 p-5">
      <div className="container mx-auto">
      
       

       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {/* Revenue Count Card */}
          <Card
            title="Total Revenue"
            count={`$${revenue.reduce((acc, rev) => acc + Number(rev.income), 0)}`}
            icon={<FaMoneyBillWave />}
          />
          
          {/* Users Count Card */}
          <Card
            title="Total Users"
            count={users.length}
            icon={<FaUsers />}
          />
          
          {/* Transactions Count Card */}
          <Card
            title=" Total Transactions"
            count={transections.length}
            icon={<FaReceipt />}
          />
        
        
        </div>


        <div className='grid md:grid-cols-2 mb-10 mt-10 gap-5'>
        <div>
            <RevenueGraph data={revenue}></RevenueGraph>
        </div>

        <div>
            <UserRoleGraph users={users}></UserRoleGraph>
        </div>
        </div>
        <div>
            <TransactionGraph transactions={transections}></TransactionGraph>
        </div>



      </div>
    </div>





        
    </div>
  )
}

export default DashboardHome