import React from 'react'

const SendEth = () => {
    return (
        <div className='card bg-base-200 p-8 shadow-xl ml-4 w-full'>
            <div className="grid flex-grow card place-items-center">
                <h1 className='text-3xl mb-5 font-bold'>Send Ethers</h1>
                <form className=''>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipient Address</span>
                        </label>
                        <input type="text" className="input input-warning input-lg input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label mt-4">
                            <span className="label-text">Amount in ETH</span>
                        </label>
                        <label className="input-group input-group-lg">
                            <input type="number" className="input input-warning input-bordered input-lg" required />
                            <span className='bg-warning'>ETH</span>
                        </label>
                    </div>
                    <div>
                        <button className='btn w-full btn-outline btn-warning mt-8'>Pay Now</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SendEth
