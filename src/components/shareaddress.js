'use client';
import styles from './components.module.css';
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'react-toastify';

export default function ShareAddress({ walletAddress }) {
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

    const handleCopy = async() => {
        try {
            await navigator.clipboard.writeText(userAddress);
            toast.success('Copied!!!');
        } catch (error) {
            console.error('Copy failed:', error);
            toast.error('Copy failed!!!');
        }

        window.getSelection().removeAllRanges();
    };

    return (
        <div className={styles.form_wrapper}>
            {userAddress !== '' ? (
                <div className={styles.grid_xs}>
                    <center>
                        <QRCodeSVG value={`ethereum:${userAddress}`}/>
                    </center>
                    <div className={styles.flex_sm}>                        
                        <button className={
                            `${styles.button}
                            ${styles.btn}
                            ${styles.btn_dark}`}
                            onClick={handleCopy}
                        >
                            Copy Address
                        </button>
                    </div>
                </div>
            ) : (
                <div className={styles.flex_sm}>
                    <h4 className={styles.accent}>Loading...</h4>
                </div>
            )}
        </div>
    );
};