"use client"

import { Provider } from "react-redux"
import { store } from './store'
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";


const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <SessionProvider>
            <Provider store={store}>
                {children}
            </Provider>
        </SessionProvider>
    )
}

export default Providers
