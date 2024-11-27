// GraphTwo.tsx
'use client'; // Ensure this component is rendered on the client side

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GraphTwo = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Users',
                data: [20, 30, 50, 40, 60, 70],
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };

    return (
        <div style={{ height: '300px', width: '100%', borderRight: '2px solid #B2BEB5', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <h3 style={{ textAlign: 'center' }}>
        <strong>PNL Of Accounts</strong> {/* Center the heading in bold */}
    </h3>
    <Line data={data} height={300} width={400} />
</div>

    );
};

export default GraphTwo;
