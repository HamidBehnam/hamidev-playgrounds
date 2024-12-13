import React from 'react';
import { Button, Typography, Box } from "@mui/material";
import useAppStore from '../../hooks/useAppStore';
import {AppState} from "../../types";

const EmptyList = () => {
    const clearAllFilters = useAppStore((state: AppState) => state.clearAllFilters);
    return (
        <Box
            sx={{
                textAlign: "center",
                padding: 3,
                marginTop: 2,
            }}
        >
            <Typography variant="h6" color="text.primary" gutterBottom>
                No items to display
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                Refine your filters or reset them to see more items.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => clearAllFilters()}
                sx={{ marginTop: 2 }}
            >
                Reset Filters
            </Button>
        </Box>
    );
};

export default EmptyList;