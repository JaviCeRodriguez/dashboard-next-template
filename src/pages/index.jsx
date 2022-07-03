import MainLayout from "@components/layout/MainLayout";
import BarChart from "@components/common/Charts/Bar";

const barChart = {
  title: "Ventas y Compras",
  series: [
    {
      name: "Ventas",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    },
    {
      name: "Compras",
      data: [40, 10, 75, 50, 39, 50, 76, 93]
    }
  ],
  xaxis: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
}

const Home = () => {
  return (
    <MainLayout>
      <BarChart title={barChart.title} series={barChart.series} xaxis={barChart.xaxis} />
    </MainLayout>
  );
};

export default Home;
