// // GraphOne.tsx
// 'use client'; // Ensure this component is rendered on the client side

// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // Register necessary components with Chart.js
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



// const GraphOne = () => {
//     const data = {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//         datasets: [
//             {
//                 label: 'Sales',
//                 data: [65, 59, 80, 81, 56, 55],
//                 backgroundColor: 'rgba(75, 192, 192, 0.6)',
//             },
//         ],
//     };

//     return (
//         <div style={{ height: '300px', width: '100%', borderRight: '2px solid #B2BEB5', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//         <h3 style={{ textAlign: 'center' }}>
//             <strong>Age Of Accounts</strong> {/* Center the heading in bold */}
//         </h3>
//         {/* <Bar data={data} height={300} width={400} /> */}
//         <img
//         src="https://geekyants.com/_next/image?url=https%3A%2F%2Fstatic-cdn.geekyants.com%2Fcustompagecomponent%2F67%2F2024-07-12%2F751735435-1720766834.png&w=3840&q=75"
//         alt="Revenue Overview"
//         className="rounded-lg"
//         style={{ maxWidth: '100%', height: '300px' }}
//       />
       
//     </div>
//     );
// };

// export default GraphOne;



'use client'; // Ensure this component is rendered on the client side

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraphOne = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales',
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div style={{ height: '300px', width: '100%', borderRight: '2px solid #B2BEB5', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h3 style={{ textAlign: 'center' }}>
            <strong>Age Of Accounts</strong> {/* Center the heading in bold */}
        </h3>
        <Bar data={data} height={300} width={400} />
    </div>
    
     );
};

export default GraphOne;
