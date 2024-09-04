import PokeballIcon from "../Icons/PokeballIcon";

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
                            <PokeballIcon
                                className="navigation-button-icon pokeball-icon"
                                size={27}
                            />
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
