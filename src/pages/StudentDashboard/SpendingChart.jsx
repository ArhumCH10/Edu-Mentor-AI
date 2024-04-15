import { Bar } from 'react-chartjs-2';
import { Card, CardContent } from '@mui/material';

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Monthly Spending',
      data: [50, 100, 150, 200, 250, 300],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

const SpendingChart = () => (
    <Card sx={{ background: 'var(--color-grey-0)' }}>
    <CardContent>
    <h2>Spending Over Time</h2>
    <Bar data={data} options={options} />
    </CardContent>
    </Card>
);

export default SpendingChart;
