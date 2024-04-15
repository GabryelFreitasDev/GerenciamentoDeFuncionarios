import Link from 'next/link'
import styles from './header.module.scss'
import { FiLogOut } from 'react-icons/fi'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext } from 'react'
import { Box, Typography } from '@mui/material'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }


export function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

export function a11yProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }