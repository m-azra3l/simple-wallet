'use client';
import styles from './components.module.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {fundAccount } from '@/contexts/contractHelpers';

export default function FundWallet({walletAddress}){    
    const [btnClicked, setBtnClicked] = useState(false);
    const [userAddress, setUserAddress] = useState('');  

    useEffect(() => {
        (async () => {
            try {
                setUserAddress(walletAddress);
            }
            catch (err) {
                console.error(err);
            }
        }
        )();
    }, [walletAddress]);

    const handleSubmit = async (e) => {
        try {
            setBtnClicked(true);
            e.preventDefault();
            const amount = e.target[0].value;            
            const fund = await fundAccount(userAddress, amount);
            if (fund) {
                toast.success('Success!!!');
            }
            else {
                toast.error('Error!!!');
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
            {userAddress !== null || userAddress !== undefined ? (
                <form onSubmit={handleSubmit} className={styles.grid_xs}>
                    <center>
                        <h3 className={styles.accent}>Fund Wallet</h3>
                    </center>
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
                </form>
            ):(
                <div className={styles.flex_sm}>
                    <h4 className={styles.accent}>Loading...</h4>
                </div>
            )}
        </div>
    );
};