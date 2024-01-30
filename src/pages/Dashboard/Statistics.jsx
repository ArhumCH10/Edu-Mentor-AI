import Header from "./header";
import './Dashboard.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Import ArcElement for the doughnut chart
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Registering the components necessary for the bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Register ArcElement here
);

export default function Statistics() {

  const chartData = {
    labels: ['Dec 31, 2023', 'Jan 3, 2024', 'Jan 6, 2024', 'Jan 9, 2024', 'Jan 13, 2024', 'Jan 17, 2024', 'Jan 21, 2024', 'Jan 25, 2024', 'Jan 29, 2024'],
    datasets: [
      {
        label: 'Lesson Taught',
        data: [2500, 3700, 2500, 6500, 5000, 3700, 5500, 7000, 3000], // Example data
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      // Add more datasets for other categories if necessary
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return 'PKR ' + value;
          },
        },
      },
    },
  };

  const doughnutData = {
    labels: ['Gigs', 'Custom Offers'],
    datasets: [
      {
        label: 'Completed (last 30 days)',
        data: [1, 3], // Example data
        backgroundColor: ['#56CCF2', '#2F80ED'],
        borderColor: ['#56CCF2', '#2F80ED'],
        borderWidth: 1,
        cutout: '80%',
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Completed (last 30 days)',
      },
    },
  };

  return (
    <>
      <Header />
      <h2 className="mx-4 mt-3">My Statistics</h2>

      <div className="container-fluid graph-msg-row">
        <div className="row justify-content-center">
          <div className="col-11 borderBox stat">
            
            {/* Combined rows into a single flex container */}
            <div className="d-flex flex-wrap justify-content-center align-items-start mt-3">
              
              {/* Individual stats-box now has consistent external margins */}
              <div className="stats-box">
                <h6 className="mb-0 fs-13 text-body-emphasis text-center">Earnings to date</h6>
                <h5 className="fw-bold mt-2 text-center">PKR 356,653.95</h5>
              </div>
              <div className="vertical-line"></div>
              
              <div className="stats-box">
                <h6 className="mb-0 fs-13 text-body-emphasis text-center">Avg. selling price</h6>
                <h5 className="fw-bold mt-2 text-center">PKR 9,398.84</h5>
              </div>
              <div className="vertical-line"></div>
              
              <div className="stats-box">
                <h6 className="mb-0 fs-13 text-body-emphasis text-center">Active Students</h6>
                <h5 className="fw-bold mt-2 text-center">20</h5>
              </div>
              <div className="vertical-line"></div>
              
              <div className="stats-box">
                <h6 className="mb-0 fs-13 text-body-emphasis text-center">Earned in January</h6>
                <h5 className="fw-bold mt-2 text-center">PKR 25,895.67</h5>
              </div>
              
              {/* Assuming there's a break between the rows */}
              <div className="w-100"></div>
              
              <div className="stats-box">
                <h6 className="mb-0 fs-13 text-body-emphasis text-center">Booked trial Lessons</h6>
                <h5 className="fw-bold mt-2 text-center">17</h5>
              </div>
              <div className="vertical-line"></div>
              
              <div className="stats-box">
                <h6 className="mb-0 fs-13 text-body-emphasis text-center">Lessons per Active Students</h6>
                <h5 className="fw-bold mt-2 text-center">15.2 hrs</h5>
              </div>
              <div className="vertical-line"></div>
              
              <div className="stats-box">
                <h6 className="mb-0 fs-13 text-body-emphasis text-center">Hourly Rate</h6>
                <h5 className="fw-bold mt-2 text-center">PKR 5000</h5>
              </div>
              <div className="vertical-line"></div>
              
              <div className="stats-box">
                <h6 className="mb-0 fs-13 text-body-emphasis text-center">Availability</h6>
                <h5 className="fw-bold mt-2 text-center">168.00 hrs</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chart-container">
      <Bar data={chartData} options={chartOptions} />
    </div>

    <div className="d-flex flex-row justify-content-around">

        <div className="stat-container" style={{ height: '300px' }}>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>

        <div className="stat-container" style={{ height: '300px' }}>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>

        <div className="stat-container" style={{ height: '300px' }}>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
    </div>
    </>
  );
}
