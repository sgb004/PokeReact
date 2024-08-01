export type NavigationButtonProps = {
    children: React.ReactNode;
    name: string;
    activated?: boolean;
};

const NavigationButton = ({
    children,
    name,
    activated = false,
}: NavigationButtonProps) => {
    return (
        <label className="navigation-button flex justify-center items-center cursor-pointer rounded-[5px] bg-button-yellow w-[37px] border border-button-yellow text-base min-h-[37px] box-sizing">
            {children}
            <input
                type="radio"
                className={`navigation-dispatcher navigation-${name} hidden`}
                name="navigation-button"
                defaultChecked={activated}
            />
        </label>
    );
};

const Navigation = () => {
    return (
        <nav className="navigation relative mt-auto">
            <ul className="flex gap-[10px] pl-[10px] pr-[10px] p justify-end">
                <li>
                    <NavigationButton name="my-pokemon" activated={true}>
                        <span>
                            <svg
                                className="navigation-button-icon"
                                height="30"
                                width="30"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 30 30"
                            >
                                <path d="M15 30C6.728 30 0 23.27 0 14.998c0-8.271 6.728-15 15-15C23.27 0 30 6.73 30 15c0 8.271-6.73 15-15 15zm0-27.168C8.29 2.832 2.832 8.291 2.832 15c0 6.71 5.46 12.167 12.168 12.167 6.708 0 12.167-5.459 12.167-12.168 0-6.71-5.459-12.167-12.167-12.167z" />
                                <g>
                                    <path d="M10.528 16.415H1.472a.472 1.416 0 110-2.832h9.056a.472 1.416 0 010 2.832zM28.528 16.415h-9.056a.472 1.416 0 110-2.832h9.056a.472 1.416 0 010 2.832z" />
                                </g>
                                <path d="M15 20.935a5.87 5.87 0 01-4.178-1.729 5.915 5.915 0 010-8.356A5.87 5.87 0 0115 9.12c1.577 0 3.06.614 4.177 1.73a5.915 5.915 0 010 8.356A5.875 5.875 0 0115 20.936zm0-8.983a3.078 3.078 0 00-2.175 5.25c1.161 1.161 3.187 1.161 4.348 0A3.078 3.078 0 0015 11.953z" />
                            </svg>
                        </span>
                    </NavigationButton>
                </li>
                <li>
                    <NavigationButton name="pokemon">
                        <span>
                            <img
                                className="navigation-button-icon w-[30px]"
                                src="/images/icon-pokedex.svg"
                            />
                        </span>
                    </NavigationButton>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
