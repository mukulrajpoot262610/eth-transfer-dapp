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

      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
          setDefaultAccount(result[0]);
          getAccountBalance(result[0].toString());
          setConnButtonText('Wallet Connected');
        })
        .catch(error => {
          setErrorMessage(error.message);
        });
      setTxs([tx])

    } catch (err) {
      setErrorMessage(err.message)
    }
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
          <p>Made with ❤️ by &nbsp;
            <a href='https://www.mukulrajpoot.com/' target="_blan">
              <span className='relative hover:underline font-bold cursor-pointer'>Mukul Rajpoot</span>
            </a>
          </p>
          <a href='https://github.com/mukulrajpoot262610/eth-transfer-dapp' target="_blan">
            <span className='flex items-center hover:underline font-bold cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github mr-1" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub
            </span>
          </a>
        </div>
      </footer>


    </div>
  )
}
