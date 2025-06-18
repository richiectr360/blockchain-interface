// CSS
import "./globals.css";

// Fonts
import { Lexend } from 'next/font/google'
const lexend = Lexend({ subsets: ['latin'] })

export const metadata = {
  title: "DAPP Exchange",
  description: "Your favorite Peer to peer orderbook exchange",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lexend.className}`}>
        <main className="content">
          {children}
        </main>
      </body>
    </html>
  );
}
