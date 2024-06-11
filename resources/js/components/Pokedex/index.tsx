import React from "react";
import "./style.css";

const Pokedex = () => {
    return (
        <div className="pokedex block w-[100%] h-[90%] max-w-[500px] m-auto bg-pokedex rounded-[10px] relative">
            <header className="flex p-[20px] gap-[20px]">
                <div className="camera relative w-[50px] h-[50px] bg-[#fff] rounded-full flex before:content-[''] before:block before:bg-camera before:rounded-full before:m-auto after:content-[''] after:absolute after:block after:bg-camera-light after:w-[18px] after:h-[18px] after:rounded-full after:top-[8px] after:left-[8px]"></div>
                <div className="indicators flex gap-[10px]">
                    <div className="indicator bg-indicator-red after:bg-indicator-red-light"></div>
                    <div className="indicator bg-indicator-yellow after:bg-indicator-yellow-light"></div>
                    <div className="indicator bg-indicator-green after:bg-indicator-green-light"></div>
                </div>
            </header>

            <div className="front-cover absolute w-full h-full top-0 left-0 rounded-bl-[10px] flex items-center flex-wrap bg-pokedex p-[20px] border-r border-r-black after:contents-[''] after:block after:w-[30%] after:h-[15px] after:border after:border-black after:rounded-full after:absolute after:bottom-[20px] after:left-0 after:right-0 after:ml-auto after:mx-auto">
                <svg
                    className="triangule cursor-pointer"
                    width="30"
                    height="36"
                    viewBox="0 0 7.937 9.525"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        className="fill-bg-pokedex"
                        transform="matrix(0 .7723 -.76815 0 7.81 .129)"
                        stroke="#000"
                        stroke-width=".333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M0 10L6 0l6 10z"
                    />
                </svg>
            </div>
        </div>
    );
};

export default Pokedex;
