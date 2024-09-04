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
import { addNotification } from "../../Notifications";
import Spinner from "../../Spinner";

export type PrintGridItems = (pokemon: Pokemon, index: number) => ReactNode;

export type ScreenGridProps = {
    queryUrl: string;
    noPokemonMessage: string | ReactNode;
    initialMessage: string | ReactNode;
    printGridItems: PrintGridItems;
};

export type ScreenGridElement = {
    element: HTMLDivElement | null;
    reset: () => void;
    getPokemon: () => Pokemon[];
    setPokemon: (pokemon: Pokemon[]) => void;
} & HTMLDivElement;

const ScreenGrid = forwardRef<ScreenGridElement, ScreenGridProps>(
    ({ queryUrl, noPokemonMessage, initialMessage, printGridItems }, ref) => {
        const screenGridRef = useRef<HTMLDivElement>(null);
        const pageUrl = useRef(queryUrl);
        const nextPageUrl = useRef(queryUrl);
        const pokemon = useRef<Pokemon[]>([]);
        const isLoading = useRef(true);
        const isEmpty = useRef(false);
        const pokemonIsUpdated = useRef(false);
        const fetchAborter = useRef<AbortController>(new AbortController());
        const showInitialMessage = useRef(true);
        const [render, setRender] = useState(1);

        const reRender = () => setRender(new Date().getTime());

        const loadMore = () => {
            if (nextPageUrl.current === null) {
                isLoading.current = false;
                reRender();
                return false;
            }

            pageUrl.current = nextPageUrl.current;

            fetch(nextPageUrl.current, { signal: fetchAborter.current.signal })
                .then((response) => response.json())
                .then((data) => {
                    nextPageUrl.current = data.next_page_url;
                    isEmpty.current =
                        pokemon.current.length === 0 && data.data.length === 0;
                    showInitialMessage.current =
                        isEmpty.current &&
                        pageUrl.current.match(/search=\s*(&|$)/) !== null;

                    for (const item of data.data) {
                        pokemon.current.push(dataToPokemon(item));
                    }

                    isLoading.current = false;

                    reRender();
                })
                .catch((error) => {
                    if (error !== "Abort" && screenGridRef.current) {
                        console.error(error);

                        addNotification(
                            screenGridRef.current,
                            "There was an error to get the Pokémon",
                            "error"
                        );
                    }
                });
        };

        const reset = (queryUrl: string, resetScroll = true) => {
            fetchAborter.current.abort("Abort");
            fetchAborter.current = new AbortController();
            nextPageUrl.current = queryUrl;
            pokemon.current = [];
            isLoading.current = false;
            isEmpty.current = false;

            if (resetScroll) {
                screenGridRef.current?.scrollTo(0, 0);
            }
        };

        useEffect(() => {
            reset(queryUrl);
            isLoading.current = true;

            reRender();
            loadMore();
        }, [queryUrl]);

        useEffect(() => {
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
                } else if (pokemon.current.length === 0) {
                    isEmpty.current = true;
                    showInitialMessage.current = true;
                    reRender();
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
                        reRender();
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
                        reRender();
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
                {showInitialMessage.current && !isLoading.current ? (
                    <div className="no-pokemon col-start-1 col-end-4 flex justify-center items-center">
                        {initialMessage}
                    </div>
                ) : isEmpty.current ? (
                    <div className="no-pokemon col-start-1 col-end-4 flex justify-center items-center">
                        {noPokemonMessage}
                    </div>
                ) : (
                    pokemon.current.map(printGridItems)
                )}

                {isLoading.current && (
                    <div className="spinner col-start-1 col-end-4 flex justify-center items-center">
                        <Spinner />
                    </div>
                )}
            </section>
        );
    }
);

export default ScreenGrid;
