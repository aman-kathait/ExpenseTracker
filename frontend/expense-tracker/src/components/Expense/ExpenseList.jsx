import React from 'react'
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';
const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className='card'>
        <div className='flex justify-between items-center'>
            <h5 className='text-lg font-semibold'>Expense List</h5>
            <button onClick={onDownload} className='flex items-center gap-2 text-primary hover:text-primary-dark'>
                <LuDownload className='text-base' />Download
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            {transactions?.map((expense) => (
                <TransactionInfoCard 
                key={expense.id} 
                title={expense.category}
                amount={expense.amount}
                date={moment(expense.date).format("Do MMM, YYYY")}
                icon={expense.icon}
                onDelete={() => onDelete(expense._id)} />
            ))}
        </div>
      
    </div>
  )
}

export default ExpenseList
