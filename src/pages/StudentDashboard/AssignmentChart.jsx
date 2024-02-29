import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import Heading from "../../ui/Heading";

const ChartBox = styled.div`
  padding: 2.4rem 2.2rem;
  grid-column: 3 / span 2;
  background-color: var(--color-grey-0); // Adjust based on your theme or preference
  border-radius: 8px; // Optional, for visual appearance
  box-shadow: 0 4px 6px rgba(0,0,0,0.1); // Optional, for visual appearance

  & .recharts-pie-label-text {
    font-size: 0.5rem;
    font-weight: 600;
  }

  .recharts-legend-text {
    font-size: 12px; // Adjusted for readability
  }
`;

// Sample data for Homework Submission Status
const assignmentData = [
  { name: 'Submitted On Time', value: 40, color: '#07ff51' },
  { name: 'Late', value: 20, color: '#FFC107' },
  { name: 'Outstanding', value: 5, color: '#F44336' },
];

function AssignmentChart() { // Renamed from PieChart to AssignmentChart
  return (
    <ChartBox>
       <Heading as="heading1">Home Work Summary</Heading>
      <ResponsiveContainer width='100%' height={300}>
        <PieChart>
          <Pie
            data={assignmentData}
            dataKey='value'
            nameKey='name'
            cx='50%'
            cy='50%'
            outerRadius={100}
            fill='#8884d8'
            isAnimationActive={true} 
            animationBegin={0} 
            animationDuration={800} 
            label
            paddingAngle={3}
            startAngle={180}
            endAngle={-180}
          >
            {assignmentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default AssignmentChart;
