import React, { useEffect ,useState} from 'react'
import {LuPlus} from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';
const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([]);
    
    useEffect(() => {
        console.log('IncomeOverview transactions:', transactions); // Debug log
        // transactions is already the income array
        const result = prepareIncomeBarChartData(transactions || []);
        console.log('IncomeOverview chart data:', result); // Debug log
        setChartData(result);
    }, [transactions]);
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <div>
                <h5 className='text-lg'>Income Overview</h5>
                <p className='text-xs text-gray-400 mt-0.5'>Track your earnings over time and analyze trends.</p>
            </div>

            <button className='add-btn' onClick={onAddIncome}>
                <LuPlus className='mr-1' /> Add Income
            </button>
        </div>

        <div className="mt-10">
            {console.log(chartData)}
            
            <CustomBarChart data={chartData} />
        </div>
      
    </div>
  )
}

export default IncomeOverview
