'use client';
import styles from './page.module.css';
import CreateWallet from '@/components/createwallet';
import Wallet from '@/components/wallet';
import { useState, useEffect, useCallback } from 'react';
import { accountExist, connectContract } from '@/contexts/contractHelpers';

export default function Home() {
  const [userAddress, setUserAddress] = useState('');
  const [loadingState, setLoadingState] = useState('');

  const getAddress = useCallback(async () => {
    try {
      const contract = await connectContract();
      const signerAddress = await contract.signer.getAddress();
      const account = await accountExist(signerAddress);
      if (account === false) {
        setUserAddress('!Found');        
        setLoadingState('loaded');
      }
      setLoadingState('loaded');
    }
    catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await getAddress();
    })();
  }, [getAddress]);

  return (
    <main className={styles.main}>
      {loadingState === 'loaded' ? (
        <div className={styles.center}>
          {userAddress === '!Found'? (
            <CreateWallet/>
          ) : (
            <Wallet/>
          )}
        </div>
      ) : (
        <div className={styles.flex_sm}>
          <h4 className={styles.accent}>Loading...</h4>
        </div>
      )}
    </main>
  );
};