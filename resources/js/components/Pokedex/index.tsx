import { useEffect, useRef } from "react";
import "./style.css";
import Navigation from "../Navigation";
import Screens from "../Screens";
import FrontCoverReverse from "../FrontCoverReverse";

const Pokedex = () => {
    const pokedexRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!(pokedexRef.current instanceof HTMLDivElement)) return () => {};

        const pokedexElement = pokedexRef.current;
        let touchX = 0;
        let move = true;

        const stopTouchMove = (element: HTMLElement | null) =>
            element instanceof HTMLElement &&
            element.closest(".stop-touch") instanceof HTMLElement;

        const moveScroll = (direction: number) => {
            const [left, top] =
                direction > 0 ? [document.body.scrollWidth, 0] : [0, 0];

            pokedexElement.scrollTo({ left, top, behavior: "smooth" });
        };

        const handleWheel = (event: WheelEvent) => moveScroll(event.deltaY);
        const handleTouchStart = (event: TouchEvent) => {
            move = !stopTouchMove(event.target as HTMLElement);
            touchX = event.touches[0].pageX;
        };
        const handleTouchMove = (event: TouchEvent) => {
            if (move) {
                touchX = touchX - event.touches[0].pageX;
                moveScroll(touchX);
                touchX = event.touches[0].pageX;
            }
        };

        pokedexElement.addEventListener("wheel", handleWheel);
        pokedexElement.addEventListener("touchstart", handleTouchStart);
        pokedexElement.addEventListener("touchmove", handleTouchMove);

        return () => {
            pokedexElement.removeEventListener("wheel", handleWheel);
            pokedexElement.removeEventListener("touchstart", handleTouchStart);
            pokedexElement.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    return (
        <div
            ref={pokedexRef}
            className="pokedex h-[100dvh] flex overflow-hidden"
        >
            <div className="pokedex-content grid grid-cols-[175px_1fr_20px] grid-rows-[94px_1fr] w-full h-full max-h-[920px] max-w-[500px] m-auto bg-pokedex bg-img-header bg-no-repeat bg-position rounded-[10px] relative border border-black max-[500px]:max-h-[100%] max-[500px]:rounded-[0]  before:content-[''] before:block before:absolute before-t-0 before:w-full before:h-[95px] before:bg-img-header before:bg-left-bottom before:bg-no-repeat ">
                <header className="flex p-[20px] gap-[20px] rounded-t-[10px] relative">
                    <div className="camera relative w-[50px] h-[50px] bg-[#fff] rounded-full flex before:content-[''] before:block before:bg-camera before:rounded-full before:m-auto after:content-[''] after:absolute after:block after:bg-camera-light after:w-[18px] after:h-[18px] after:rounded-full after:top-[8px] after:left-[8px]"></div>
                    <div className="indicators flex gap-[10px]">
                        <div className="indicator bg-indicator-red after:bg-indicator-red-light"></div>
                        <div className="indicator bg-indicator-yellow after:bg-indicator-yellow-light"></div>
                        <div className="indicator bg-indicator-green after:bg-indicator-green-light"></div>
                    </div>
                </header>

                <Navigation />
                <Screens />

                <div className="hinge relative w-[20px] bg-pokedex border-l border-black row-start-1 row-end-3 col-start-3 mt-auto rounded-br-[10px] before:top-6 after:bottom-6"></div>

                <div className="front-cover absolute w-full h-full top-0 left-0 rounded-[10px] flex items-center flex-wrap bg-pokedex bg-img-header bg-no-repeat p-[20px] border border-black transition-transform ease-linear duration-1000 max-[500px]:rounded-[0] after:contents-[''] after:block after:w-[30%] after:h-[15px] after:border after:border-black after:rounded-full after:absolute after:bottom-[20px] after:left-0 after:right-0 after:ml-auto after:mx-auto perspective-[0]">
                    <div className="relative z-20 cursor-pointer">
                        <svg
                            className="triangule animate-front-cover-triangule fill-[--bg-color]"
                            width="30"
                            height="36"
                            viewBox="0 0 7.937 9.525"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                className="fill-bg-pokedex"
                                transform="matrix(0 .7723 -.76815 0 7.81 .129)"
                                stroke="#000"
                                strokeWidth=".333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M0 10L6 0l6 10z"
                            />
                        </svg>
                        <label className="front-cover-button-close absolute w-full h-full block top-0 cursor-pointer">
                            <input
                                type="radio"
                                className="front-cover-dispatcher-close hidden"
                                name="front-cover-button"
                            />
                        </label>
                        <label className="front-cover-button-open absolute w-full h-full block top-0 cursor-pointer">
                            <input
                                type="radio"
                                className="front-cover-dispatcher-open hidden"
                                name="front-cover-button"
                            />
                        </label>
                    </div>
                    <FrontCoverReverse />
                </div>
            </div>
        </div>
    );
};

export default Pokedex;
