import React from 'react'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'
import { LuDownload } from 'react-icons/lu';
const IncomeList = ({transactions, onDelete, onDownload}) => {
  console.log('IncomeList received transactions:', transactions);
  console.log('Is transactions an array?', Array.isArray(transactions));
  
  // Ensure transactions is always an array
  const transactionsList = Array.isArray(transactions) ? transactions : [];
  
  return (
    <div className='card'>
      <div className="flex items-center justify-between">
        <h5 className='text-lg'>Income Sources</h5>

        <button onClick={onDownload} className='flex items-center gap-2 text-primary hover:text-primary-dark'>
           <LuDownload className='text-base' />Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactionsList.length > 0 ? (
          transactionsList.map((income) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("Do MMM YYYY")}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income._id)}
            />
          ))
        ) : (
          <div className="col-span-2 text-center py-8 text-gray-500">
            No income records found
          </div>
        )}
      </div>
    </div>
  )
}

export default IncomeList
