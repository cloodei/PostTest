import React from "react"
import SliderCard from "./SliderCard.jsx"

export default function SliderPage({ data }) {
    return (
    <>
        <div className="row">
            <div className="col-3" style={{
                width: '25%'
            }}>
                <SliderCard data={data[6]}></SliderCard>
            </div>
            <div className="col-3" style={{
                width: '25%'
            }}>
                <SliderCard data={data[8]}></SliderCard>
            </div>
            <div className="col-3" style={{
                width: '25%'
            }}>
                <SliderCard data={data[7]}></SliderCard>
            </div>
            <div className="col-3" style={{
                width: '25%'
            }}>
                <SliderCard data={data[9]}></SliderCard>
            </div>
        </div>
    </>
    )
}