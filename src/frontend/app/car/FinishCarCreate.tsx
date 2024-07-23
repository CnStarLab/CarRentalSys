'use client'
import React from "react";


export default function FinishCarCreate({currCarInfo}){
    return (
        <div>
            <h1>
                Check Your Car Info
            </h1>
        {Object.entries(currCarInfo).map(([key, value]) => (
            <div key={key}>
            <strong>{key}:</strong> {JSON.stringify(value)}
            </div>
        ))}
        </div>
    )

}