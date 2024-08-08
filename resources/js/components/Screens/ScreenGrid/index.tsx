import {
    forwardRef,
    ReactNode,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { Pokemon } from "../../../types";
import dataToPokemon from "../../../utils/data-to-pokemon";

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
        const nextPageUrl = useRef(queryUrl);
        const pokemon = useRef<Pokemon[]>([]);
        const isLoading = useRef(false);
        const [render, setRender] = useState(1);

        const loadMore = () => {
            if (nextPageUrl.current === null) return false;

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
                    element: screenGridRef.current,
                    reset: () => {
                        reset(nextPageUrl.current + "&page=1");
                        loadMore();
                    },
                    getPokemon: () => pokemon.current,
                    setPokemon: (pokemonList: Pokemon[]) => {
                        pokemon.current = pokemonList;
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
