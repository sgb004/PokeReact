import React from "react";

const NavigationButton = ({ children, name, activated = false }) => {
    return (
        <label className="navigation-button block cursor-pointer rounded-[5px] bg-button-yellow text-black p-[1px_5px] w-full text-center border border-button-yellow text-base min-height-[28px] box-sizing">
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
            <ul className="flex gap-[10px] p-[10px]">
                <li className="w-full">
                    <NavigationButton name="my-pokemon" activated={true}>
                        My Pokémon
                    </NavigationButton>
                </li>
                <li className="w-full">
                    <NavigationButton name="pokemon">Pokémon</NavigationButton>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
