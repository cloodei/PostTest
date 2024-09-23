import React, { useEffect, useState } from 'react'
import '../assets/styles/GalleryPage.css'
import '../globalVar'
import ImageModal from '../components/ImageModal'
import GalleryImageCards from '../components/GalleryImageCards'
import globalVar from '../globalVar'

export default function GalleryPage() {
    const [showImage, setShowImage] = useState(false);
    const [dataImage, setDataImage] = useState(null);
    useEffect(() => {
        window.scroll(0, 0);
    }, [])
    const data = globalVar.listData;

    const showImageModal = (image) => {
        setDataImage(image);
        setShowImage(true);
    }
    const closeImageModal = () => {
        setShowImage(false);
    }
    let renderedData = [];
    for (let i = 39; i != -1; i--) {
        renderedData.push(<GalleryImageCards key={39 - i} data={data[i]} showImageModal={showImageModal}/>);
    }
    for (let i = 40; i < 55; i++) {
        renderedData.push(<GalleryImageCards key={i} data={data[i]} showImageModal={showImageModal}/>)
    }

    return (
    <>
        <div className="container-fluid gp-container-fluid">
            <h1>Gallery</h1>
            <div className="container gp-container">
                <h4>View the whole selection of our products and pictures in full view.</h4>
                <div className="row px-2 gp-rows">
                    {renderedData}
                </div>
            </div>
        </div>
        <ImageModal imageUrl={dataImage} showImageModal={showImage} closeImageModal={closeImageModal} showModal={false}></ImageModal>
    </>
    )
}