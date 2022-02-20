import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import { GlobalProvider } from '../context/GlobalState';
function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalProvider>
          <Component {...pageProps} />
        </GlobalProvider>
      </Hydrate>
    </QueryClientProvider>)
}

export default MyApp
