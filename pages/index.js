import Head from 'next/head'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import Profile from '../components/Profile';
import SendEth from '../components/SendEth';
import Transactions from '../components/Transactions';

export default function Home() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');

  const [address, setAddress] = useState()
  const [amount, setAmount] = useState()

  const [txs, setTxs] = useState();

  const handleAddress = (e) => {
    setAddress(e.target.value)
  }

  const handleAmount = (e) => {
    setAmount(e.target.value)
  }

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log('MetaMask Here!');

      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
          setDefaultAccount(result[0]);
          getAccountBalance(result[0].toString());
          setConnButtonText('Wallet Connected');
        })
        .catch(error => {
          setErrorMessage(error.message);
        });

    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  }

  const getAccountBalance = (account) => {
    window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then(balance => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };


  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.ethereum) {
        console.log('MetaMask Here!');
        window.ethereum.on('accountsChanged', (newAcc) => {
          setDefaultAccount(newAcc);
          getAccountBalance(newAcc.toString());
        });
        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        });
      } else {
        console.log('Need to install MetaMask');
        setErrorMessage('Please install MetaMask browser extension to interact');
      }
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    try {
      ethers.utils.getAddress(address)
      setErrorMessage("")

      const tx = await signer.sendTransaction({
        to: address,
        value: ethers.utils.parseEther(amount)
      })

      window.ethereum.on('update', (newAcc) => {
        setDefaultAccount(newAcc);
        getAccountBalance(newAcc.toString());
      });

      console.log("TRANSACTION: ", tx)
      setTxs([...txs, tx])

    } catch (err) {
      setErrorMessage(err.message)
    }

    console.log({ address, amount })
  }

  return (
    <div className="min-h-screen flex-col flex justify-center items-center">
      <Head>
        <title>First DAPP</title>
        <meta name="description" content="Dapp made by Mukul Rajpoot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
        errorMessage && (
          <div className="alert alert-error mt-4">
            <div className="flex-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
              </svg>
              <label>{errorMessage}</label>
            </div>
          </div>
        )
      }

      <div className="flex justify-center items-center w-full container p-4">

        <div className='w-full'>
          <div className='flex justify-center flex-col lg:flex-row'>
            <Profile defaultAccount={defaultAccount} userBalance={userBalance} errorMessage={errorMessage} connectWalletHandler={connectWalletHandler} connButtonText={connButtonText} />

            <SendEth handleAddress={handleAddress} handleAmount={handleAmount} handleSubmit={handleSubmit} />
          </div>

          <div className='mt-8'>
            <Transactions txs={txs} />
          </div>

        </div>

      </div>

      <footer className="fixed bottom-0 p-4 footer bg-base-100 border-t-2 border-base-200 text-base-content footer-center">
        <div>
          <p>Made with ❤️ by <span className='hover:underline font-bold cursor-pointer'>Mukul Rajpoot</span></p>
        </div>
      </footer>


    </div>
  )
}
