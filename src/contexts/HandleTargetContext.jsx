import React, { createContext, useState } from 'react';

export const HandleTargetContext = createContext();

export const HandleTargetProvider = ({ children }) => {
    const [target, setTarget] = useState("");
    
    const sendDataToGalleryCard = (data) => {
        setTarget(data);
    }

    return (
    <HandleTargetContext.Provider value={{ target, setTarget, sendDataToGalleryCard }}>
        {children}
    </HandleTargetContext.Provider>
    );
};
