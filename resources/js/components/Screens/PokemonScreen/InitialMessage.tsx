import { useEffect, useRef, useState } from "react";
import { addNotification } from "../../Notifications";

type CodeProps = {
    children: string;
};

type PercentageProps = {
    className?: string;
};

const Code = ({ children }: CodeProps) => (
    <code className="inline-block font-bold bg-white p-[2px_7px] rounded-[3px]">
        {children}
    </code>
);

const Percentage = ({ className }: PercentageProps) => {
    const percentageRef = useRef<HTMLDivElement>(document.createElement("div"));
    const [percent, setPercent] = useState(0);

    const checkStatus = () => {
        fetch("/pokedex/store-pokedex")
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(
                        `There was en error to load the Pokédex, status: ${response.status}`
                    );
                }
            })
            .then((data) => {
                console.log(data);
                setPercent(Math.floor(data.percentage_completed));
                if (data.status === "running") {
                    setTimeout(checkStatus, 100);
                } else if (data.status === "finished") {
                    console.log("Completed");
                    addNotification(
                        percentageRef.current,
                        "The Pokédex was loaded successfully",
                        "success"
                    );
                }
            })
            .catch((error) => {
                console.error(error);
                addNotification(percentageRef.current, error.message, "error");
            });
    };

    useEffect(() => {
        checkStatus();
    }, []);

    return (
        <div
            ref={percentageRef}
            className={`relative flex justify-center items-center w-full h-[30px] border-[1px] border-black rounded-[3px] text-center ${className}`}
        >
            <div
                className="block absolute w-0 h-full top-0 left-0  transition-all backdrop-invert-[100%]"
                style={{ width: `${percent}%` }}
            ></div>
            <div className="text-dark">{percent}%</div>
        </div>
    );
};

const InitialMessage = () => {
    return (
        <div className="initial-message text-center">
            <svg
                className="info-icon m-auto mb-[15px]"
                width={60}
                height={60}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g fill="#000">
                    <circle
                        cx="12"
                        cy="9"
                        r="3"
                        className="origin-center animate-rotate-y"
                    />
                    <path d="M18 2.292C16.067.562 13.57-.23 10.97.058c-3.933.437-7.236 3.58-7.854 7.475-.503 3.167.649 6.284 3.08 8.334.847.716 1.468 1.43 1.915 2.212a13.446 13.446 0 011.37 3.408l.17.68C9.92 23.246 10.887 24 12 24s2.079-.754 2.348-1.834l.17-.68c.3-1.194.76-2.34 1.314-3.328l1.992-2.307A8.975 8.975 0 0021 9a9.012 9.012 0 00-3-6.709zM20 9c0 .168-.017.334-.027.5h-4.024C15.7 11.468 14.034 13 12 13s-3.7-1.532-3.95-3.5H4.03a8.156 8.156 0 01-.002-1H8.05C8.3 6.532 9.965 5 12 5s3.7 1.532 3.95 3.5h4.023c.01.167.027.332.027.5z" />
                </g>
            </svg>
            <p>
                To start store Pokémon, it is necessary to load the Pokédex
                first:
            </p>
            <p>Please run the command in the terminal:</p>
            <Code>sail artisan queue:work</Code>
            <p>or:</p>
            <Code>php artisan queue:work</Code>
            <Percentage className="mt-[15px]" />
        </div>
    );
};

export default InitialMessage;
