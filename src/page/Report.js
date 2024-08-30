import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../component/Header';
import ReportChart from '../component/ReportChart';
import { UserContext } from '../context/UserContext';
import '../css/report.css';

function Report() {
  const { transactions, getTransactions, monthlyBalances, getMonthlyBalances } = useContext(UserContext);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      getTransactions(userId);
      getMonthlyBalances(userId); // Gọi hàm lấy monthly balances
    }
  }, [userId, getTransactions, getMonthlyBalances]);

  return (
    <div className="grid-report-container">
      <Header />
      <div className="report">
        <h1>Report</h1>
        <div className="report-content">
          <div className="report-chart">
            <ReportChart transactions={transactions} monthlyBalances={monthlyBalances} />
          </div>
          <div className="report-table">
            {/* Bạn có thể thêm bảng hoặc các phần khác ở đây */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
