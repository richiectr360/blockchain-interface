"use client";

import { useSDK } from "@metamask/sdk-react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";


function TopNav() {
    const [account, setAccount] = useState("");
    const [balance, setBalance] = useState("");
    const { sdk, connected, connecting } = useSDK();

    async function connectWallet() {
        try {
            const accounts = await sdk?.connect();
            console.log("Connected accounts:", accounts);
        } catch (err) {
            console.error("Failed to connect:", err);
        }
    }

    async function getAccountInfo() {
        try {
            if (!connected || !sdk) return;

            const ethereum = sdk.getProvider();
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            const balance = await provider.getBalance(address);
            
            console.log("Account:", address);
            console.log("Balance:", ethers.formatEther(balance));
            
            setAccount(address);
            setBalance(ethers.formatEther(balance));
        } catch (err) {
            console.error("Failed to get account info:", err);
        }
    }

    useEffect(() => {
        if (connected && sdk) {
            getAccountInfo();
        }
    }, [sdk, connected]);

    return (
        <nav className="topnav">
            {!connected ? (
                <button onClick={connectWallet} disabled={connecting}>
                    {connecting ? "Connecting..." : "Connect Wallet"}
                </button>
            ) : (
                <div>
                    <p>Account: {account}</p>
                    <p>Balance: {balance} ETH</p>
                </div>
            )}
        </nav>
    );
}

export default TopNav;
