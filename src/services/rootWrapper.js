
import { Provider } from "react-redux"
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';


import store from '../store';

import { AUTH } from "../api/AUTH";
import { SHOPS } from "../api/SHOPS";
import { BrowserRouter } from "react-router-dom"
import { SnackbarProvider } from "baseui/snackbar";
import { TOASTS } from "../api/TOASTS";




const engine = new Styletron();

const PreWrappers = ({ children }) => <StyletronProvider value={engine}>
    <Provider store={store}>
        <BrowserRouter>
            <SnackbarProvider>
                {children}
            </SnackbarProvider>
        </BrowserRouter>
        <TOASTS.Caller />
    </Provider>
</StyletronProvider>


const SiteWrappers = ({ children }) => <AUTH.RootWrapper>
    <SHOPS.RootWrapper>
        {children}
    </SHOPS.RootWrapper>
</AUTH.RootWrapper>


export const RootWrapper = ({ children }) => <PreWrappers>
    <SiteWrappers>
        {children}
    </SiteWrappers>
</PreWrappers>
