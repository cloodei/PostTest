import React, { createContext, useState } from 'react';

export const DrawerContext = createContext();


export const DrawerProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => {
        setOpen(newOpen);
    };
    
    const FakeDrawer = () => {
        return (
        <>
        </>
        )
    }
    
    return (
        <DrawerContext.Provider value={{ open, toggleDrawer }}>
            {children}
        </DrawerContext.Provider>
    );
};