// src/components/DashboardView/DashboardV2.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { Box, Typography, CircularProgress, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CompletedTasksChart from './CompletedTasksChart';
import DueTasksChart from './DueTasksChart';
import EstimationHoursChart from './EstimationHoursChart';
import { getCompletedPerDay, getDueDatePerDay, getEstimationHoursBreakdown } from '../../utils/dashboardUtils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardTasks, selectDashboardTasks, selectDashboardLoading, selectDashboardError } from '../../store/dataSlice';
import { format } from 'date-fns';

const Dashboard = () => {
  const pieChartColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#ff6666'];

  const defaultEndDate = new Date();
  const defaultStartDate = new Date();
  defaultStartDate.setMonth(defaultStartDate.getMonth() - 1);

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [dateError, setDateError] = useState(null);

  const dispatch = useDispatch();
  const tasks = useSelector(selectDashboardTasks);
  const loading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);

  useEffect(() => {
    if (startDate && endDate && startDate <= endDate) {
      setDateError(null);
      dispatch(fetchDashboardTasks({ from: startDate.toISOString(), to: endDate.toISOString() }));
    } else if (startDate && endDate && startDate > endDate) {
      setDateError('End date cannot be earlier than start date');
    }
  }, [startDate, endDate, dispatch]);

  const completedTasksData = useMemo(() => getCompletedPerDay(tasks), [tasks]);
  const dueTasksData = useMemo(() => getDueDatePerDay(tasks), [tasks]);
  const estimationHoursData = useMemo(() => getEstimationHoursBreakdown(tasks), [tasks]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Dashboard
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>

      {dateError && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {dateError}
        </Typography>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3, flexWrap: 'wrap' }}>
          <CompletedTasksChart data={completedTasksData} />
          <DueTasksChart data={dueTasksData} />
          <EstimationHoursChart data={estimationHoursData} colors={pieChartColors} />
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;