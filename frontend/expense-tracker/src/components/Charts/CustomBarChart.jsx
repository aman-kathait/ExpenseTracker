import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from 'recharts';
const CustomBarChart = ({data}) => {
    //console.log('CustomBarChart received data:', data);

    // Add safety check for data
    if (!data || !Array.isArray(data) || data.length === 0) {
        return (
            <div className='bg-white mt-6 flex items-center justify-center h-[300px]'>
                <p className='text-gray-500'>No income data available for chart</p>
            </div>
        );
    }

    const getBarColor=(index)=>{
        return index % 2 === 0 ? '#875cf5' : '#cfbefb';
    }

    const CustomTooltip=({active,payload})=>{
        if(active && payload && payload.length){
            return(
                <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                    <p className='text-xs font-semibold mb-1 text-purple-800'>{payload[0].payload.category}</p>
                    <p className='text-sm text-gray-500'>
                        Amount: <span className='font-semibold text-sm text-gray-800'>${payload[0].payload.amount}</span>
                    </p>
                </div>
            )
        }
        return null;
    };

  return (
    <div className='bg-white mt-6'>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis dataKey="month" tick={{fontSize: 12,fill:'#555'}} stroke='none' />
          <YAxis tick={{fontSize: 12,fill:'#555'}} stroke='none'/>
          <Tooltip content={CustomTooltip}/>
          <Bar 
            dataKey="amount" 
            fill="#FF8042" 
            radius={[10,10,0,0]} 
            activeDot={{ r: 8, fill:"yellow" }} 
            activeStyle={{fill:"green"}}>
            
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart
