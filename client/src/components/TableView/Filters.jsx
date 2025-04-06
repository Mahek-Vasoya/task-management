import { Button, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchQuery,
  setSelectedStatus
} from '../../store/dataSlice';

const Filters = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.data.searchQuery);
  const selectedStatus = useSelector((state) => state.data.selectedStatus);

  return (
    <div className="filters" style={{ display: 'flex', gap: '15px', alignItems: 'center', padding: '10px' }}>
      {/* Status Dropdown */}
      <Select
        value={selectedStatus}
        onChange={(e) => dispatch(setSelectedStatus(e.target.value))}
        variant="outlined"
        size="small"
        style={{ minWidth: '150px' }}
      >
        <MenuItem value="All">All Statuses</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
        <MenuItem value="Overdue">Overdue</MenuItem>
      </Select>

      {/* Search Input */}
      <TextField
        type="text"
        placeholder="Search tasks"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        variant="outlined"
        size="small"
        style={{ flex: 1 }}
      />

      {/* Edit Columns Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
      >
        Edit Columns
      </Button>
    </div>
  );
};

export default Filters;
