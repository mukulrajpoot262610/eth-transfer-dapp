import { ethers } from 'ethers'
import React from 'react'

const Transactions = ({ txs }) => {
    return (
        <div className='card bg-base-200 p-8 shadow-xl mr-4 w-full mb-16 border border-success'>
            <h1 className='text-3xl mb-5 font-bold'>Recent Transactions</h1>
            {
                txs ? (
                    <>
                        <div className="alert alert-success">
                            <div className="flex-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                                </svg>
                                <label>{txs[0].hash}</label>
                            </div>
                            <h1 className='font-bold'>
                                {ethers.utils.formatEther(txs[0].value)} ETH
                            </h1>
                        </div>
                    </>
                ) : <p className='stat-desc'>No Transactions yet...</p>
            }

        </div>
    )
}

export default Transactions
