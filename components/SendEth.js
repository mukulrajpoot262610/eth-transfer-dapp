import React from 'react'

const SendEth = ({ handleAddress, handleAmount, handleSubmit, errorMessage, defaultAccount }) => {
    return (
        <div className='card bg-base-200 border border-warning p-8 shadow-xl mt-8 lg:mt-0 lg:ml-4 w-full'>
            <div className="grid flex-grow card place-items-center">
                <h1 className='text-3xl mb-5 font-bold'>Send Ethers</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipient Address</span>
                        </label>
                        <input type="text" className="input input-warning input-bordered" onChange={handleAddress} required />
                    </div>
                    <div className="form-control">
                        <label className="label mt-4">
                            <span className="label-text">Amount in ETH</span>
                        </label>
                        <label className="input-group input-group-lg">
                            <input type="number" step="any" className="input input-warning input-bordered" onChange={handleAmount} required />
                            <span className='bg-warning text-white font-bold'>ETH</span>
                        </label>
                    </div>
                    <div>
                        <button disabled={errorMessage || !defaultAccount} className='btn w-full btn-outline btn-warning mt-8'>Pay Now</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SendEth
