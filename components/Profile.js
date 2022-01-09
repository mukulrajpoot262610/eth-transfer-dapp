import Image from 'next/image'
import React from 'react'

const Profile = ({ defaultAccount, userBalance, errorMessage, connectWalletHandler, connButtonText }) => {

    return (
        <div className='card bg-base-200 p-8 shadow-xl border border-warning lg:mr-4 w-full'>
            <div className="grid flex-grow card place-items-center">
                <h1 className='text-3xl mb-5 font-bold'>Account Details</h1>
                <div className="avatar">
                    <div className="mb-8 rounded-full w-24 h-24 ring ring-warning ring-offset-base-100 ring-offset-4">
                        <Image src="/profile.jpg" height={100} width={100} alt='' />
                    </div>
                </div>
                <div className="">
                    <div className="flex flex-col items-center">
                        <div className="stat-title">Account Address</div>
                        <div className="stat-value text-warning text-xs lg:text-base"> {defaultAccount}</div>
                    </div>
                </div>
                <div className="shadow-2xl stats my-4">
                    <div className="stat">
                        <div className="stat-title">Balance</div>
                        <div className="stat-value text-warning"> {userBalance ? userBalance.substring(0, 8) : 0.0} <span className='text-base'>ETH</span></div>
                        <div className="stat-desc">Total Ethereum in Wallet</div>
                    </div>
                </div>
                <button disabled={errorMessage || connButtonText === "Wallet Connected"} onClick={connectWalletHandler} className='btn btn-wide btn-outline btn-warning'>{connButtonText}</button>
            </div>
        </div>
    )
}

export default Profile
