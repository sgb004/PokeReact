import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { PokemonPokedex } from "../../../types";
import PokemonImg from "../../PokemonImg";

export type ScreenGridProps = {
    queryUrl: string;
    noPokemonMessage: string;
};

export type ScreenGridElement = {
    current: HTMLDivElement | null;
    reset: () => void;
} & HTMLDivElement;

const getTime = () => {
    const date = new Date();
    const time = date.getTime();
    return time;
};

const ScreenGrid = forwardRef<ScreenGridElement, ScreenGridProps>(
    ({ queryUrl, noPokemonMessage }, ref) => {
        const screenGridRef = useRef<HTMLDivElement>(null);
        const nextPageUrl = useRef(queryUrl);
        const pokemon = useRef<PokemonPokedex[]>([]);
        const isLoading = useRef(false);
        const [render, setRender] = useState(1);

        const loadMore = () => {
            if (nextPageUrl.current === null) return false;

            fetch(nextPageUrl.current)
                .then((response) => response.json())
                .then((data) => {
                    nextPageUrl.current = data.next_page_url;

                    for (const item of data.data) {
                        pokemon.current.push({
                            id: item.api_id,
                            name: item.name,
                        });
                    }

                    setRender(getTime());
                });
        };

        const reset = (queryUrl: string) => {
            nextPageUrl.current = queryUrl;
            pokemon.current = [];
            isLoading.current = false;
            screenGridRef.current?.scrollTo(0, 0);
        };

        useEffect(() => {
            reset(queryUrl);
            loadMore();
        }, [queryUrl]);

        useEffect(() => {
            isLoading.current = false;
        }, [render]);

        useEffect(() => {
            const screenGrid = screenGridRef.current;
            const handleWheel = (event: WheelEvent) => event.stopPropagation();
            let handleScroll = () => {};

            if (screenGrid) {
                handleScroll = () => {
                    const scrollTop = screenGrid.scrollTop;
                    const scrollHeight = screenGrid.scrollHeight;
                    const offsetHeight = screenGrid.offsetHeight;

                    const scrollPercent =
                        scrollTop / Math.abs(scrollHeight - offsetHeight);
                    const scrollPercentRounded = Math.ceil(scrollPercent * 100);

                    if (!isLoading.current && scrollPercentRounded > 75) {
                        isLoading.current = true;
                        loadMore();
                    }
                };
                screenGrid.addEventListener("wheel", handleWheel);
                screenGrid.addEventListener("scroll", handleScroll);
            }

            return () => {
                if (screenGrid) {
                    screenGrid.removeEventListener("wheel", handleWheel);
                    screenGrid.removeEventListener("scroll", handleScroll);
                }
            };
        }, []);

        useImperativeHandle(
            ref,
            () => {
                return {
                    current: screenGridRef.current,
                    reset: () => {
                        reset(nextPageUrl.current + "&page=1");
                        loadMore();
                    },
                } as ScreenGridElement;
            },
            []
        );

        return (
            <section
                ref={screenGridRef}
                className="screen-grid p-[5px_5px_60px_5px] bg-screen-grid"
            >
                {pokemon.current.length == 0 ? (
                    <div className="no-pokemon col-start-1 col-end-4 flex justify-center items-center">
                        {noPokemonMessage}
                    </div>
                ) : (
                    <>
                        {pokemon.current.map((pokemon, index) => (
                            <label
                                key={index}
                                className="pokemon flex flex-col items-center relative cursor-pointer transition-all duration-75 ease"
                            >
                                <input
                                    type="checkbox"
                                    name="pokemon_from_pokedex"
                                    value={pokemon.id}
                                    className="pokemon-from-pokedex absolute top-0 left-0 hidden"
                                />
                                <PokemonImg id={pokemon.id} />
                                <div className="name text-black first-letter:uppercase text-center">
                                    {pokemon.name}
                                </div>
                            </label>
                        ))}
                        {nextPageUrl.current ? (
                            <div className="spinner col-start-1 col-end-4 flex justify-center items-center">
                                Loading...
                            </div>
                        ) : (
                            <></>
                        )}
                    </>
                )}
            </section>
        );
    }
);

export default ScreenGrid;
