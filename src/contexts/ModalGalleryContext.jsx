import React, { createContext, useState } from 'react';

export const ModalGalleryContext = createContext();

export const ModalGalleryProvider = ({ children }) => {
    const [hoverStarArray, setHoverStarArray] = useState([5, 4, 5, 5, 5, 5, 4, 5, 4, 4, 5, 3, 5, 5, 5, 4, 5, 5, 5, 3, 5, 5, 3, 5, 5, 5, 4, 5, 4, 5, 5, 5, 5, 4, 5, 3, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4]);
    const [selectStarArray, setSelectStarArray] = useState([5, 4, 5, 5, 5, 5, 4, 5, 4, 4, 5, 3, 5, 5, 5, 4, 5, 5, 5, 3, 5, 5, 3, 5, 5, 5, 4, 5, 4, 5, 5, 5, 5, 4, 5, 3, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 4]);

    return (
    <ModalGalleryContext.Provider value={{ hoverStarArray, selectStarArray, setHoverStarArray, setSelectStarArray }}>
        {children}
    </ModalGalleryContext.Provider>
    );
};