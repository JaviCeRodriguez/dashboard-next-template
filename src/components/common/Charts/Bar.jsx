import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const BarChart = (props) => {
  const { title, series, xaxis } = props;
  
  const options = {
    title: {
      text: title,
    },
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: xaxis,
    },
    theme: {
      palette: 'palette2',
    },
  };

  return (
    <Box bg="white" w="min-content" rounded="lg">
      <Chart options={options} series={series} type="bar" width="500" />
    </Box>
  );
};

export default BarChart;
