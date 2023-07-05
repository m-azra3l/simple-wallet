'use client';
import styles from './components.module.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { connectContract, createAccount } from '@/contexts/contractHelpers';

export default function CreateWallet() {
    const [btnClicked, setBtnClicked] = useState(false);

    async function handleClick () {
        try {
            setBtnClicked(true);            
            const contract = await connectContract();
            const signerAddress = await contract.signer.getAddress();
            const account = await createAccount(signerAddress);
            if (account) {
                toast.success('Success!!!');
            }
            else {
                toast.error('Error creating account!!!');
            }
        }
        catch (err) {
            console.error(err);
            toast.error('Error!!!');
        }
        finally{
            setBtnClicked(false);
        }
    };

    return (
        <div className={styles.form_wrapper}>
            <center>
                <h3>Get started by creating your wallet!!!</h3>
                <br/>
                <button className={
                    `${styles.button}
                    ${styles.btn}
                    ${styles.btn_dark}`}
                    onClick={handleClick}
                    disabled={btnClicked}
                >
                    Create Wallet
                </button>
            </center>
        </div>
    );
};