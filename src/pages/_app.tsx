import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {WagmiConfig } from 'wagmi'
import client from '../lib/web3'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}

export default App