import Layout from "./layout/Layout";
import { IndianRupee, MessageSquareMore, UserCheck, Users } from "lucide-react";

const Dashboard = () => {
  return (
    <Layout>
      <div className="absolute sm:left-[20%] max-sm:left-[20%] grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:px-8">
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-green-400">
            <Users className="h-12 w-12 text-white" />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Users</h3>
            <p className="text-3xl">12,768</p>
          </div>
        </div>
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-blue-400">
            <UserCheck className="h-12 w-12 text-white" />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Volunteer</h3>
            <p className="text-3xl">39,265</p>
          </div>
        </div>
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-indigo-400">
            <MessageSquareMore className="h-12 w-12 text-white" />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Message</h3>
            <p className="text-3xl">142,334</p>
          </div>
        </div>
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-red-400">
            <IndianRupee className="h-12 w-12 text-white" />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Donation</h3>
            <p className="text-3xl">34.12%</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
