import { Chart, registerables } from 'chart.js';
import React, { useMemo, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

const ReportChart = ({ transactions = [], monthlyBalances = [] }) => {
  // Đăng ký các thành phần cần thiết của Chart.js
  Chart.register(...registerables);

  // State để quản lý chế độ hiển thị: 'daily' hoặc 'monthly'
  const [mode, setMode] = useState('daily');

  // Tính toán số dư hàng ngày trong tháng từ transactions
  const dailyBalances = useMemo(() => {
    const balances = Array(31).fill(0); // Khởi tạo mảng số dư cho 31 ngày

    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const day = date.getDate() - 1; // Lấy chỉ số ngày (1-31, nhưng trừ 1 để phù hợp với mảng)

      if (transaction.type === 'income') {
        balances[day] += transaction.amount; // Cộng tiền vào ngày tương ứng nếu là thu nhập
      } else if (transaction.type === 'expense') {
        balances[day] -= transaction.amount; // Trừ tiền khỏi ngày tương ứng nếu là chi tiêu
      }
    });

    return balances; // Trả về mảng số dư theo ngày
  }, [transactions]);

  // Tính toán số dư theo tháng từ monthlyBalances
  const monthlyData = useMemo(() => {
    const labels = monthlyBalances.map(item => item.month); // Lấy nhãn là các tháng
    const data = monthlyBalances.map(item => item.balance); // Lấy dữ liệu số dư theo tháng
    return { labels, data }; // Trả về nhãn và dữ liệu
  }, [monthlyBalances]);

  // Cấu hình dữ liệu cho biểu đồ dựa trên chế độ hiển thị
  const chartData = useMemo(() => {
    return {
      labels: mode === 'daily'
        ? Array.from({ length: 31 }, (_, i) => i + 1) // Nhãn từ 1 đến 31 cho các ngày
        : monthlyData.labels, // Nhãn là các tháng
      datasets: [
        {
          label: mode === 'daily' ? 'Daily Balance' : 'Monthly Balance',
          backgroundColor: 'rgba(75,192,192,0.4)', // Màu nền của đường
          borderColor: 'rgba(75,192,192,1)', // Màu đường viền
          data: mode === 'daily' ? dailyBalances : monthlyData.data, // Dữ liệu dựa trên chế độ
          fill: false, // Không tô màu phía dưới đường
        },
      ],
    };
  }, [mode, dailyBalances, monthlyData]);

  // Cấu hình biểu đồ
  const options = {
    scales: {
      y: {
        beginAtZero: true, // Bắt đầu trục y từ 0
      },
    },
  };

  return (
    <div>
      <ButtonGroup>
        <Button onClick={() => setMode('daily')} active={mode === 'daily'}>
          Daily
        </Button>
        <Button onClick={() => setMode('monthly')} active={mode === 'monthly'}>
          Monthly
        </Button>
      </ButtonGroup>

      <Line data={chartData} options={options} />
    </div>
  );
};

export default ReportChart;
