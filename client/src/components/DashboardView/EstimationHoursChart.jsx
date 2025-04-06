import { Box, Typography } from '@mui/material';
import React from 'react';
import { Cell, Pie, PieChart, Tooltip as PieTooltip, ResponsiveContainer } from 'recharts';

const EstimationHoursChart = ({ data, colors }) => {
    return (
        <Box width="30%" marginBottom={4} padding={2} border={1} borderRadius={2} height={'350px'} borderColor="gray.300" display="flex" justifyContent="space-between" alignItems="center">
            <Box width="70%">
                <Typography variant="h6" align="center" gutterBottom >
                    Estimation Hours Breakdown
                </Typography>
                <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                        <Pie data={data} dataKey="count" nameKey="range" outerRadius={60} fill="#8884d8">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index]} />
                            ))}
                        </Pie>
                        <PieTooltip />
                    </PieChart>
                </ResponsiveContainer>
            </Box>

            <Box alignContent={'center'}>
                <Typography variant="h6" align="center" gutterBottom>
                    Task Duration Ranges
                </Typography>
                {data.map((entry) => (
                    <Typography key={entry.range} variant="body1">
                        {entry.range}: {entry.count}
                    </Typography>
                ))}
            </Box>
        </Box>
    );
};

export default EstimationHoursChart;
