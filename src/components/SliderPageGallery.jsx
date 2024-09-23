import React from "react"
import SliderCard from './SliderCardGallery.jsx'

export default function SliderPage({ data }) {
    return (
    <>
        <div className="row">
            <div className="col">
                <SliderCard data={data[0]}></SliderCard>
            </div>
            <div className="col">
                <SliderCard data={data[1]}></SliderCard>
            </div>
            <div className="col">
                <SliderCard data={data[2]}></SliderCard>
            </div>
            <div className="col">
                <SliderCard data={data[3]}></SliderCard>
            </div>
            <div className="col">
                <SliderCard data={data[4]}></SliderCard>
            </div>
        </div>
    </>
    )
}