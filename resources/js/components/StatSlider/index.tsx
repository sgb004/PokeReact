import { ReactNode, useEffect, useState } from "react";
import { PokemonStatCSS } from "../../types";

export type StatSliderProps = {
    name: string;
    value: number;
    step?: number;
    min?: number;
    max?: number;
    className?: string;
    thumb?: ReactNode;
    onChange?: (value: number) => void;
};

const StatSlider = ({
    name,
    value,
    step = 1,
    min = 0,
    max = 15,
    className,
    thumb,
    onChange,
}: StatSliderProps) => {
    const [val, setVal] = useState<number>(value);

    useEffect(() => {
        if (onChange) {
            onChange(val);
        }
    }, [val]);

    return (
        <div
            className={`stat ${name} flex ${className} gap-[0] stat-value-${val}`}
            style={{ "--value": val, "--max": max } as PokemonStatCSS}
        >
            <div className={`stat-slider h-[30px] w-full relative`}>
                <div className="progress absolute overflow-hidden rounded-full w-full h-full before:block before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-stat-slider before:none after:block after:w-[33.33%] after:h-full after:absolute after:inset-0 after:m-auto after:border-[0_3px] after:border-x-edit-back">
                    <div
                        className={`progress-bar absolute h-full bg-stats transition-colors`}
                    ></div>
                </div>
                <div className="progress absolute h-full top-0">
                    <div className="thumb flex justify-center items-center absolute w-[25px] h-[25px] top-0 bottom-0 m-auto">
                        {thumb}
                    </div>
                </div>
                <input
                    type="range"
                    step={step}
                    min={min}
                    max={max}
                    value={val}
                    className="stat-slider-input block relative w-full h-full p-0 appearance-none z-20 opacity-0 cursor-pointer"
                    onChange={(event) => setVal(+event.currentTarget.value)}
                />
            </div>
            <input
                type="number"
                min={min}
                max={max}
                value={val}
                className={`block h-[30px]  text-white bg-stats transition-colors`}
                onChange={(event) => setVal(+event.currentTarget.value)}
            />
        </div>
    );
};

export default StatSlider;
