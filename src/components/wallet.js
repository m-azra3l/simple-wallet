'use client';
import Image from 'next/image';
import styles from './components.module.css';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Popover } from "@nextui-org/react";
import { shortenAddress, connectContract, openWallet, getBalance } from '@/contexts/contractHelpers';
import FundWallet from './fundwallet';
import SendFund from './sendfund';
import ShareAddress from './shareaddress';

export default function Wallet() {
    const [balance, setBalance] = useState();
    const [walletAddress, setWalletAddress] = useState('');

    const getAccount = useCallback(async () => {
        try {
            const contract = await connectContract();
            const signerAddress = await contract.signer.getAddress();
            const account = await openWallet(signerAddress);
            if (account !== null || account !== undefined) {
                const balance = await getBalance(account);
                if (balance !== null || balance !== undefined) {
                    setWalletAddress(account);
                    setBalance(balance);
                    toast.success('Welcome!!!');
                }
                else {
                    toast.error('Error!!!');
                }
            }
            else {
                toast.error('Error!!!');
            }
        }
        catch (err) {
            console.error(err);
            toast.error('Error!!!');
        }
    }, []);

    useEffect(() => {
        (async () => {
            getAccount();
        }
        )();
    }, [getAccount]);

    return (
        <>
            {walletAddress !== null || walletAddress !== undefined ? (
                <div className={styles.form_wrapper}>
                    <div className={styles.grid_xs}>
                        <h3>Address:&nbsp;{shortenAddress(walletAddress)}</h3>
                        <br/>
                        <center>
                            <h3>
                                Balance:
                            </h3>
                            <br/>
                            <p>{balance}</p>
                            {/* <Image src="/polygon.png" width={25} height={25} alt='MATIC'/> */}
                        </center>
                        <br/>
                        <div className={styles.grid}>
                            {/* <Popover>
                                <Popover.Trigger>
                                    <button className={
                                        `${styles.button}
                                        ${styles.btn}
                                        ${styles.btn_dark}`}
                                    >
                                        Send
                                    </button>
                                </Popover.Trigger>
                                <Popover.Content>
                                    <SendFund balance={balance}/>
                                </Popover.Content>
                            </Popover> */}
                            <Popover>
                                <Popover.Trigger>
                                    <button className={
                                        `${styles.button}
                                        ${styles.btn}
                                        ${styles.btn_dark}`}
                                    >
                                        Share
                                    </button>
                                </Popover.Trigger>
                                <Popover.Content>
                                    <ShareAddress walletAddress={walletAddress}/>
                                </Popover.Content>
                            </Popover>
                            <Popover>
                                <Popover.Trigger>
                                    <button className={
                                        `${styles.button}
                                        ${styles.btn}
                                        ${styles.btn_dark}`}
                                    >
                                        Fund
                                    </button>
                                </Popover.Trigger>
                                <Popover.Content>
                                    <FundWallet walletAddress={walletAddress}/>
                                </Popover.Content>
                            </Popover>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.form_wrapper}>
                    <div className={styles.flex_sm}>
                        <h3 className={styles.accent}>Loading...</h3>
                    </div>
                </div>
            )}
        </>
    );
};