import PokeballIcon from "../Icons/PokeballIcon";
import PokedexIcon from "../Icons/PokedexIcon";

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
        <label className="navigation-button simple-button">
            {children}
            <input
                id={`navigation-button-${name}-dispatcher`}
                type="radio"
                className={`dispatcher navigation-${name} hidden`}
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
                                className="navigation-button-icon icon pokeball-icon"
                                size={27}
                            />
                        </span>
                    </NavigationButton>
                </li>
                <li>
                    <NavigationButton name="pokemon">
                        <span>
                            <PokedexIcon
                                className="navigation-button-icon icon"
                                size={27}
                            />
                        </span>
                    </NavigationButton>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
