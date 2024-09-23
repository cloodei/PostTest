import React, { createContext, useState } from 'react';

export const HandleFilterContext = createContext();

export const HandleFilterProvider = ({ children }) => {
    const [state, setState] = useState("");

    const sendDataToShop = (data) => {
        setState(data);
    };

    return (
    <HandleFilterContext.Provider value={{ state,  setState,  sendDataToShop }}>
        {children}
    </HandleFilterContext.Provider>
    );
};
