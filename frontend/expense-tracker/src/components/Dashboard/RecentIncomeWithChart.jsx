import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);
  
  console.log('RecentIncomeWithChart - Raw data:', data);
  console.log('RecentIncomeWithChart - Total income:', totalIncome);
  
  const prepareChartData = () => {
    console.log('Preparing chart data from:', data);
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    console.log('Prepared chart data:', dataArr);
    setChartData(dataArr || []);
  };

  useEffect(() => {
    prepareChartData();
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
