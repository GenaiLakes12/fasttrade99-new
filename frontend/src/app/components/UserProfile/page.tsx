// userprofile/page.tsx
'use client';

import React from 'react';
import ErrorTable from './error'; // Adjust the import as necessary
import UserProfileHeader from './userprofileheader'; // Import the UserProfileHeader component
import GraphOne from './GraphOne'; // Import GraphOne
import GraphTwo from './GraphTwo'; // Import GraphTwo
import GraphThree from './GraphThree'; // Import GraphThree
const Page = () => {
    
    return (
        <div>
            <UserProfileHeader />

            {/* Render MyComponent below Table */}
            

             {/* Add grid layout for graphs */}
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0px', marginTop: '20px' }}>
                <GraphOne />
                <GraphTwo />
                <GraphThree />
            </div>
            {/* Dashed separator line */}
            <div style={{ borderTop: '2px solid #B2BEB5', margin: '20px 0' }}></div>

            
            {/* Render the ErrorTable component */}
            <ErrorTable />

           
        </div>
    );
};

export default Page;