"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSDK } from "@metamask/sdk-react";
import { ethers } from "ethers";
import Jazzicon from "react-jazzicon";

import { useProvider } from "../hooks/useProvider";

import network from "../assets/other/network.svg";

//Import config 
import config from "@/app/config.json";

function TopNav() {
    const { sdk, connected, connecting } = useSDK();
    const { provider } = useProvider();

    const [account, setAccount] = useState("");
    const [balance, setBalance] = useState("");

    async function connectHandler() {
        try {
            const accounts = await sdk?.connect();
            console.log("Connected accounts:", accounts);
        } catch (err) {
            console.error("Failed to connect:", err);
        }
    }

    async function networkHandler() { 
        console.log("Network changed");
    }

    async function getAccountInfo() {
        try {
            if (!connected || !sdk) return;

            const account = await provider.getAddress();
            const balance = await provider.getBalance();
            
            setAccount(account);
            setBalance(ethers.formatUnits(balance, 18));
        } catch (err) {
            console.error("Failed to get account info:", err);
        }
    }

    useEffect(() => {
        if(sdk && metamask) {
            //Create event listener
            metamask.on("accountsChanged", async (accounts) => {
                if (accounts.length === 0) {
                    //No accounts are connected
                    setAccount(null);
                setBalance(0);
            } else {
                await getAccountInfo();
            }
        })

        metamask.on("chainChanged", () => {window.location.reload(); })

        return () => { 
            metamask.removeAllListeners();
        }
    }
    }, [sdk, metamask]);

    return (
        <nav className="topnav">
            {!connected ? (
                <button onClick={connectWallet} disabled={connecting}>
                    {connecting ? "Connecting..." : "Connect Wallet"}
                </button>
            ) : (
                <div className="connected-content">
                    <div className="network">
                        <label className="icon" htmlFor="network">
                            <Image src={network} alt="select network" width={24} height={24} />
                        </label>
                        <div className="select">
                            <select 
                            name="network" 
                            id="network" 
                            value={config[Number(chainId)] ? chainId : "0"}
                            onChange={networkHandler}
                            >
                                <option value="0">Select</option>
                                <option value="0x7a69">Hardhat</option>
                            </select>
                        </div>
                    </div>

                    <div className="account">
                        {account && (
                            <div className="balance">
                                <p>My Balance <span>{Number(balance).toFixed(2)}ETH</span></p>
                            </div>
                        )}

                        {account ? (
                            //Show account
                            <a 
                                href={`https://etherscan.io/address/${account}`} 
                                target="_blank" 
                                rel="noreferrer"
                            >
                                {account.slice(0,6) + "..." + account.slice(38, 42)}
                                <Jazzicon
                                    diameter={44}
                                    seed={parseInt(account.slice(2, 10), 16)}
                                />
                            </a>
                        ) : (
                            <button onClick={connectHandler} className="button">
                                Connect
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default TopNav;
