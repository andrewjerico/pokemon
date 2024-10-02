import '@/styles/globals.css'
import Header from '@/header'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'
import react from 'react'
import { initialState, reducer } from '@/context/reducer'
import { CountContext } from '@/context/context'

export default function App({ Component, pageProps }: AppProps) {
  const [state,dispatch] = react.useReducer(reducer,initialState);
  return(
    <>
      <CountContext.Provider value={{countState: state, countDispatch:dispatch}}>
        <Header/>
        <Component {...pageProps} />
      </CountContext.Provider>
    </>
  )
}
