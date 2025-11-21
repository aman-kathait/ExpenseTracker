import React, { useEffect } from 'react'
import { useState } from 'react';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({data}) => {
    const [chartData,setChartData]=useState([]);
    
    useEffect(()=>{
        //console.log('Last30DaysExpenses - received data:', data);
        const result=prepareExpenseBarChartData(data);
        //console.log('Last30DaysExpenses - chart data result:', result);
        setChartData(result);
    },[data]);
  return (
    <div className='card col-span-1'>
        <div className="flex items-center justify-between">
            <h5 className='text-lg'>Last 30 Days Expenses</h5>
        </div>

        <CustomBarChart data={chartData} />
      
    </div>
  )
}

export default Last30DaysExpenses
