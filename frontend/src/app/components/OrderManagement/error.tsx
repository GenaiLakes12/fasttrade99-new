"use client"; // Ensure this component is treated as a Client Component

import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CloseIcon from '@mui/icons-material/Close'; // Import the close icon
import '@fortawesome/fontawesome-free/css/all.min.css';
import DeleteIcon from '@mui/icons-material/Delete'; 
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; 
import FileDownloadIcon from '@mui/icons-material/FileDownload'; 
interface LogRow {
  timeStamp: string;
  logType: string;
  user: string;
  strategy: string;
  portfolio: string;
  message: string;
}

const ErrorTable: React.FC = () => {
  const [isErrorMessageMinimized, setIsErrorMessageMinimized] = React.useState(false);
  const [isErrorMessageMaximized, setIsErrorMessageMaximized] = React.useState(false);
  const [isFullScreen, setIsFullScreen] = React.useState(false); // State for full-screen mode

  const rows: LogRow[] = [
    { timeStamp: '8/6/2024, 8:48:11 pm', logType: 'WARNING', user: 'PSEUDO123', strategy: '', portfolio: 'PSEUDO123', message: 'To start trading, at least one broker account should be logged...' },
    { timeStamp: '8/6/2024, 8:50:00 pm', logType: 'ERROR', user: 'PSEUDO456', strategy: '', portfolio: 'PSEUDO456', message: 'Trading session ended unexpectedly.' },
    { timeStamp: '8/6/2024, 8:55:00 pm', logType: 'WARNING', user: 'PSEUDO789', strategy: 'Strategy A', portfolio: 'PSEUDO789', message: 'Market conditions not favorable for trading.' },
    { timeStamp: '8/6/2024, 8:48:11 pm', logType: 'WARNING', user: 'PSEUDO123', strategy: '', portfolio: 'PSEUDO123', message: 'To start trading, at least one broker account should be logged...' },
    { timeStamp: '8/6/2024, 8:50:00 pm', logType: 'ERROR', user: 'PSEUDO456', strategy: '', portfolio: 'PSEUDO456', message: 'Trading session ended unexpectedly.' },
    { timeStamp: '8/6/2024, 8:55:00 pm', logType: 'WARNING', user: 'PSEUDO789', strategy: 'Strategy A', portfolio: 'PSEUDO789', message: 'Market conditions not favorable for trading.' },
  
  
  
  ];

  const handleMinimize = () => {
    setIsErrorMessageMinimized((prev) => !prev);
    if (!isErrorMessageMinimized) {
      setIsErrorMessageMaximized(false);
    }
  };

  const handleMaximize = () => {
    setIsErrorMessageMaximized(true);
  };

  const handleFullScreen = () => {
    setIsFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
    setIsErrorMessageMaximized(false); // Reset maximized state when closing full screen
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Header Section */}
      <div className="header">
        <ReportProblemIcon color="error" fontSize="large" />
        <h2 style={{ marginLeft: '10px', marginTop:'5px' }}>Error Messages</h2>
        <div style={{ flexGrow: 1 }} />
        <div className="actionButtons">
          {/* Minimize Button */}
          <IconButton color="primary" title="Minimize" onClick={handleMinimize}>
            <MinimizeIcon />
          </IconButton>
          {/* Full-Screen Button */}
          <IconButton color="primary" title="Full Screen" onClick={handleFullScreen}>
  <i className="fas fa-expand"></i> {/* Maximized icon like [ ] */}
</IconButton>

        </div>
      </div>

      {/* Button Group Section */}
      

      {/* Error Messages Section */}
      <div className={`errorMessages ${isErrorMessageMinimized ? 'minimized' : 'maximized'} ${isErrorMessageMaximized ? 'fullScreen' : ''} ${isFullScreen ? 'fullScreen' : ''}`}>
        {isErrorMessageMinimized ? (
          <p>Error messages are minimized.</p>
        ) : (
          <>
            {isFullScreen && (
              <div className="closeButton">
                <IconButton onClick={handleCloseFullScreen} style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}>
                  <CloseIcon />
                </IconButton>
              </div>
            )}
            <TableContainer component={Paper} style={{ maxHeight: isFullScreen ? '90vh' : 'auto', overflow: 'auto' , paddingTop: '0px',paddingLeft: '5px'}}>
            <div className={`buttonGroup ${isErrorMessageMinimized ? 'minimized' : 'maximized'}`} style={{ backgroundColor: '#e3f2fd',borderRadius: '8px' }}>
  <Button variant="text" startIcon={<NotificationsNoneIcon />} style={{ marginRight: '5px' }}>All Logs</Button>
  <Button variant="text" startIcon={<WarningAmberIcon />} style={{ marginRight: '5px' }}>0 Attention</Button>
  <Button variant="text" startIcon={<ErrorOutlineIcon />} style={{ marginRight: '5px' }}>1 Error</Button>
  <Button variant="text" startIcon={<WarningAmberIcon />} style={{ marginRight: '5px' }}>0 Warnings</Button>
  <Button variant="text" startIcon={<NotificationsNoneIcon />} style={{ marginRight: '5px' }}>0 Messages</Button>
  <Button variant="text" startIcon={<TrendingUpIcon />} style={{ marginRight: '5px' }}>0 Trading</Button>
  <Button variant="text" startIcon={<DeleteIcon />} style={{ marginRight: '5px' }}>Clear Logs</Button>
  <Button variant="text" startIcon={<ContentCopyIcon />} style={{ marginRight: '5px' }}>Copy All</Button>
  <Button variant="text" startIcon={<FileDownloadIcon />}>Export</Button>
</div>



              <Table stickyHeader>
                
                <TableHead>
                <TableRow>
    <TableCell sx={{ padding: '5px' }}><strong>TIME STAMP</strong></TableCell>
    <TableCell sx={{ padding: '5px' }}><strong>LOG TYPE</strong></TableCell>
    <TableCell sx={{ padding: '5px' }}><strong>USER</strong></TableCell>
    <TableCell sx={{ padding: '5px' }}><strong>STRATEGY</strong></TableCell>
    <TableCell sx={{ padding: '5px' }}><strong>PORTFOLIO</strong></TableCell>
    <TableCell sx={{ padding: '5px' }}><strong>MESSAGE</strong></TableCell>
  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                   <TableRow key={index}>
                   <TableCell sx={{ padding: '5px 10px' }}>{row.timeStamp}</TableCell>
                   <TableCell sx={{ padding: '5px 10px' }}>{row.logType}</TableCell>
                   <TableCell sx={{ padding: '5px 10px' }}>{row.user}</TableCell>
                   <TableCell sx={{ padding: '5px 10px' }}>{row.strategy}</TableCell>
                   <TableCell sx={{ padding: '5px 10px' }}>{row.portfolio}</TableCell>
                   <TableCell sx={{ padding: '5px 10px' }}>{row.message}</TableCell>
                 </TableRow>
                 
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </div>

      {/* Styled JSX */}
      <style jsx>{`
        .header {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .buttonGroup {
          display: flex;
          gap: 20px;
          margin-bottom: 10px;
          background-color: white;
          transition: all 0.3s ease;
        }

        .actionButtons {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .actionButtons > .MuiIconButton-root {
          margin-right: 10px;
        }

        .errorMessages {
          transition: all 0.3s ease;
        }

        .errorMessages.minimized,
        .buttonGroup.minimized {
          height: 60px;
          overflow: hidden;
          opacity: 0;
          margin: 0;
          padding: 0;
          transition: all 0.3s ease;
        }

        .errorMessages.maximized,
        .buttonGroup.maximized {
          height: auto;
          opacity: 1;
          transition: all 0.3s ease;
        }

        .errorMessages.fullScreen {
          position: fixed;
          height: 70%;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: white;
          z-index: 1000;
          overflow: auto;
          padding: 20px; /* Add padding for the full screen */
        }

        .closeButton {
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default ErrorTable;
