import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useRef, useState } from 'react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ background: '#f0f0f0' }}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
            background: '#f0f0f0',
            height: 'auto',
            width: 'max-content',
          }}
        >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
export function Sidebar() {
  const tabsRef = useRef(false);
  const [value, setValue] = useState(false);

  const handleChange = (event, newValue) => {
    console.log({ event, value, newValue });
    if (newValue !== undefined) {
      tabsRef.current = newValue;
      setValue(newValue);
    }
    if (tabsRef.current === value) {
      setValue(false);
    }
  };

  return (
    <Box sx={{ flexSrink: 1, bgcolor: 'background.paper', display: 'flex' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        onClick={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          backgroundColor: '#fbfbfb',
          flexGrow: 1,
        }}
      >
        <Tab icon={<SearchIcon sx={{ p: 0, m: 0 }} />} aria-label="search" />
      </Tabs>
      <TabPanel value={value} index={0}>

      </TabPanel>
    </Box>
  );
}
