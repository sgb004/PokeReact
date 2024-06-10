import React from "react";
import "./style.css";

const Pokedex = () => {
    return (
        <div className="pokedex block w-[100%] h-[90%] max-w-[500px] m-auto bg-pokedex-shadow rounded-[10px]">
            <header className="flex p-[20px] gap-[20px]">
                <div className="camera relative w-[50px] h-[50px] bg-[#fff] rounded-full flex before:content-[''] before:block before:bg-camera before:rounded-full before:m-auto after:content-[''] after:absolute after:block after:bg-camera-light after:w-[18px] after:h-[18px] after:rounded-full after:top-[8px] after:left-[8px]"></div>
                <div className="indicators flex gap-[10px]">
                    <div className="indicator bg-indicator-red after:bg-indicator-red-light"></div>
                    <div className="indicator bg-indicator-yellow after:bg-indicator-yellow-light"></div>
                    <div className="indicator bg-indicator-green after:bg-indicator-green-light"></div>
                </div>
            </header>
        </div>
    );
};

export default Pokedex;
