// GraphThree.tsx
'use client';

import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components with Chart.js
ChartJS.register(ArcElement, Title, Tooltip, Legend);

const GraphThree = () => {
    const [year, setYear] = useState(2024); // Initialize year state

    const handleDecreaseYear = () => setYear(prevYear => prevYear - 1); // Decrease year
    const handleIncreaseYear = () => setYear(prevYear => prevYear + 1); // Increase year

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green'],
        datasets: [
            {
                label: 'Votes',
                data: [12, 19, 3, 5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
            },
        ],
    };

    return (
        <div style={{ height: '300px', width: '100%', borderRight: '2px solid #B2BEB5', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h3 style={{ textAlign: 'center' }}>
                <strong>Capital Growth</strong> &nbsp;
                <button onClick={handleDecreaseYear} style={{ cursor: 'pointer' }}>&lt;</button>
                &nbsp; <strong>{year}</strong> &nbsp; 
                <button onClick={handleIncreaseYear} style={{ cursor: 'pointer' }}>&gt;</button>
            </h3> {/* Center the heading */}
            <Pie data={data} height={300} width={400} />
        </div>
    );
};

export default GraphThree;
