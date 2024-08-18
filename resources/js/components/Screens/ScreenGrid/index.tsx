import {
    forwardRef,
    ReactNode,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { Pokemon } from "../../../types";
import dataToPokemon from "../../../utils/dataToPokemon";

export type PrintGridItems = (pokemon: Pokemon, index: number) => ReactNode;

export type ScreenGridProps = {
    queryUrl: string;
    noPokemonMessage: string;
    printGridItems: PrintGridItems;
};

export type ScreenGridElement = {
    element: HTMLDivElement | null;
    reset: () => void;
    getPokemon: () => Pokemon[];
    setPokemon: (pokemon: Pokemon[]) => void;
} & HTMLDivElement;

const getTime = () => {
    const date = new Date();
    const time = date.getTime();
    return time;
};

const ScreenGrid = forwardRef<ScreenGridElement, ScreenGridProps>(
    ({ queryUrl, noPokemonMessage, printGridItems }, ref) => {
        const screenGridRef = useRef<HTMLDivElement>(null);
        const pageUrl = useRef(queryUrl);
        const nextPageUrl = useRef(queryUrl);
        const pokemon = useRef<Pokemon[]>([]);
        const isLoading = useRef(false);
        const [render, setRender] = useState(1);
        const pokemonIsUpdated = useRef(false);

        const loadMore = () => {
            if (nextPageUrl.current === null) return false;

            pageUrl.current = nextPageUrl.current;

            fetch(nextPageUrl.current)
                .then((response) => response.json())
                .then((data) => {
                    nextPageUrl.current = data.next_page_url;

                    for (const item of data.data) {
                        pokemon.current.push(dataToPokemon(item));
                    }

                    setRender(getTime());
                });
        };

        const reset = (queryUrl: string, resetScroll = true) => {
            nextPageUrl.current = queryUrl;
            pokemon.current = [];
            isLoading.current = false;

            if (resetScroll) {
                screenGridRef.current?.scrollTo(0, 0);
            }
        };

        useEffect(() => {
            reset(queryUrl);
            loadMore();
        }, [queryUrl]);

        useEffect(() => {
            isLoading.current = false;

            if (pokemonIsUpdated.current) {
                pokemonIsUpdated.current = false;

                if (nextPageUrl.current !== null && screenGridRef.current) {
                    const scrollHeight = screenGridRef.current.scrollHeight;
                    const offsetHeight = screenGridRef.current.offsetHeight;
                    const scrollPercent =
                        ((scrollHeight - offsetHeight) * 100) / offsetHeight;

                    if (scrollPercent < 10) {
                        reset(pageUrl.current + "&page=1", false);
                        loadMore();
                    }
                }
            }
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
                    element: screenGridRef.current,
                    reset: () => {
                        reset(pageUrl.current + "&page=1");
                        loadMore();
                    },
                    getPokemon: () => pokemon.current,
                    setPokemon: (pokemonList: Pokemon[]) => {
                        pokemon.current = pokemonList;
                        pokemonIsUpdated.current = true;
                        setRender(getTime());
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
                        {pokemon.current.map(printGridItems)}
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
