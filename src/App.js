import { useContext } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import EditCategories from './component/EditCategory';
import EditTransaction from './component/EditTransaction';
import GroupDetail from './component/GroupDetail';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { GroupProvider } from './context/GroupContext'; // Import GroupProvider
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import './index.css';
import AccountSettings from './page/AccountSetting';
import AdminDashboard from './page/AdminDashboard';
import { default as Group } from './page/Group';
import History from './page/History';
import Intro from './page/Intro';
import Login from './page/Login';
import ManageExpense from './page/ManagementExpense';
import ManageIncome from './page/ManagementIncome';
import Register from './page/Register';
import Report from './page/Report';
import Setting from './page/Setting';
import Transaction from './page/Transaction';
import TransactionDetail from './page/TransactionDetail';
import UserDetail from './page/UserDetail';
import Profile from './page/UserProfile';
import Watting from './page/Watting';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <GroupProvider> {/* GroupProvider bao bọc bên ngoài các route */}
      <Router>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/transaction/user/:userId" element={<Transaction />} />
          <Route path="/report/user/:userId" element={<Report />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/watting" element={<Watting />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/history/user/:userId" element={<History />} />
          <Route path="/edit-categories/user/:userId" element={<EditCategories />} />
          <Route path="/edit-transaction/:transactionId" element={<EditTransaction />} />
          <Route path="/transaction-detail/:transactionId" element={<TransactionDetail />} />
          <Route path="/profile/user/:userId" element={<Profile />} />
          <Route path="/account-settings/user/:userId" element={<AccountSettings />} />
          <Route path="/manage-expense/user/:userId" element={<ManageExpense />} />
          <Route path="/manage-income/user/:userId" element={<ManageIncome />} />
          <Route path="/admin/users/:userId" element={<UserDetail />} />
          <Route path="/groups/user/:userId" element={<Group />} />
          <Route path="/groups/user/:userId/:groupId" element={<GroupDetail />} /> {/* Route mới cho Group */}
        </Routes>
      </Router>
    </GroupProvider>
  );
}

function AppWrapper() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ user }) => (
          <ThemeProvider userId={user ? user.id : null}>
            <UserProvider>
              <App />
            </UserProvider>
          </ThemeProvider>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default AppWrapper;
