
// Fonts
import { Lexend } from 'next/font/google'
const lexend = Lexend({ subsets: ['latin'] })

//Components
import TopNav from './components/TopNav';
import MetaMaskProvider from './components/providers/MetaMaskProvider';
import "./globals.css";

export const metadata = {
  title: "DAPP Exchange",
  description: "Your favorite Peer to peer orderbook exchange",
};

export default function RootLayout({ children }) {
  return (
    <MetaMaskProvider>
      <html lang="en">
        <body className={`${lexend.className}`}>
          <main className="content">
            <TopNav />
            {children}
          </main>
        </body>
      </html>
    </MetaMaskProvider>
  );
}
