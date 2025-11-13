import React from 'react'
import {PieChart,Pie,Cell,Tooltip,ResponsiveContainer,Legend,} from "recharts";
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({data,label,totalAmount,colors,showTextAnchor,}) => {
  console.log('CustomPieChart received data:', data);
  console.log('CustomPieChart colors:', colors);
  
  // Add safety check for data
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.log('CustomPieChart: No data available');
    return (
      <div className="flex items-center justify-center h-[300px]">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return <ResponsiveContainer width='100%' height={300}>
    <PieChart>
        <Pie
        data={data}
        dataKey="amount"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={130}
        innerRadius={100}
        labelLine={false}
        >
            {data.map((entry,index)=>(
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
        </Pie>
        <Tooltip content={CustomTooltip}/>
        <Legend content={CustomLegend}/>

        {showTextAnchor && (
          <>
          <text x="50%" y="50%" dy={-25} textAnchor="middle" fill='#666' fontSize="14px">
            {label}
          </text>
          <text x="50%" y="50%" dy={8} textAnchor="middle" fill='#333' fontSize="24px" fontWeight="semi-bold">
            {totalAmount}
          </text>
          </>
        )}
    </PieChart>
  </ResponsiveContainer>
}

export default CustomPieChart
