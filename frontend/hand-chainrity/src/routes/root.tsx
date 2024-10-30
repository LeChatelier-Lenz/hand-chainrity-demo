import { Outlet } from "react-router-dom";
import AppAppBar from "../component/AppAppBar";
import { useEffect, useState } from "react";
import { web3 } from "../utils/contracts";
import { createTheme, ThemeProvider, PaletteMode } from '@mui/material/styles';
import getBlogTheme from '../theme/getBlogTheme';
import React from "react";




export default function Root(){
    const [mode, setMode] = React.useState<PaletteMode>('light');
    // const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const blogTheme = createTheme(getBlogTheme(mode));
    // const defaultTheme = createTheme({ palette: { mode } });

    const account = localStorage.getItem('account') || null;

    return(
        <ThemeProvider theme={blogTheme}>
            <AppAppBar />
            <div>
                <Outlet context={{account:account}} />
            </div>
        </ThemeProvider>
    )
}