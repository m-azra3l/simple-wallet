'use client';
import styles from './components.module.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { transferFunds } from '@/contexts/contractHelpers';
import Link from 'next/link';

export default function SendFund({balance}){    
    const [btnClicked, setBtnClicked] = useState(false);
    const [userBalance, setBalance] = useState('');
    const [transactionHash, setTransactionHash] = useState('');

    useEffect(() => {
        (async () => {
            try {
                setBalance(balance);
            }
            catch (err) {
                console.error(err);
            }
        }
        )();
    }, [balance]);

    const handleSubmit = async (e) => {
        try {
            setBtnClicked(true);
            e.preventDefault();
            const walletAddress = e.target[0].value;
            const amount = e.target[1].value;            
            if(userBalance >= amount || balance !== 0){
                const [transfer, transactionHash] = await transferFunds(walletAddress, amount);
                if (transfer) {
                    setTransactionHash(transactionHash);
                    toast.success('Success!!!');
                }
                else {
                    toast.error('Error!!!');
                }
            }
            else{
                toast.error('Not enough funds in balance!!!');
            }
        }
        catch (err) {
            console.error(err);
            toast.error('Error!!!');
        }
        finally{
            setBtnClicked(false);
        }
    }

    return(
        <div className={styles.form_wrapper}>
            {userBalance !== null || userBalance !== undefined ? (
                <form onSubmit={handleSubmit} className={styles.grid_xs}>
                    <center><h3 className={styles.accent}>Send Funds</h3></center>
                    <input
                        type="text"
                        placeholder="Destination Address"
                        required
                        className={styles.input}
                    />     
                    <input
                        type="number"
                        step="0.01"
                        inputMode="decimal"
                        placeholder="Amount"
                        required
                        className={styles.input}
                    />                               
                    <div className={styles.flex_sm}>
                        <button className={
                            `${styles.button}
                            ${styles.btn}
                            ${styles.btn_dark}`}                                                           
                            disabled={btnClicked}
                        >
                            Submit
                        </button>
                    </div>
                    <center><p className={styles.accent}>Your current balance is {userBalance}</p></center>
                    {transactionHash !== '' ?
                        (
                            <center>
                                <h4>Transaction Hash:</h4>
                                <br/>
                                <p>{transactionHash}</p>
                                <br/>
                                <Link href={`https://mumbai.polygonscan.com/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer" className="">View on PolygonScan</Link>
                            </center>
                        ):(<></>)
                    }
                </form>
            ):(
                <div className={styles.flex_sm}>
                    <h4 className={styles.accent}>Loading...</h4>
                </div>
            )}
        </div>
    );
};