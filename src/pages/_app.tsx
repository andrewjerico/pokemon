import '@/styles/globals.css'
import Header from '@/header'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'

export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
      <Header/>
      <Component {...pageProps} />
    </>
  )
}
