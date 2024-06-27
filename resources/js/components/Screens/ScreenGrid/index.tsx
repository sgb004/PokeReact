import { useEffect, useRef, useState } from "react";
import { PokemonPokedex, ScreenHeaderParams } from "../../../types";

type ScreenGridProps = {
    getUrl: string;
    getUrlParams: ScreenHeaderParams;
    noPokemonMessage: string;
};

const getTime = () => {
    const date = new Date();
    const time = date.getTime();
    return time;
};

const fullUrl = (url: string, getUrlParams: ScreenHeaderParams) => {
    const params = new URLSearchParams(getUrlParams);
    const urlWithParams = url.indexOf("?") > -1 ? url + "&" : url + "?";
    return `${urlWithParams}${params.toString()}`;
};

const ScreenGrid = ({
    getUrl,
    getUrlParams,
    noPokemonMessage,
}: ScreenGridProps) => {
    const screenGridRef = useRef<HTMLDivElement>(null);
    const nextPageUrl = useRef(getUrl);
    const pokemon = useRef<PokemonPokedex[]>([]);
    const isLoading = useRef(false);
    const [render, setRender] = useState(1);

    const loadMore = () => {
        if (nextPageUrl.current === null) return false;
        nextPageUrl.current = fullUrl(nextPageUrl.current, getUrlParams);

        fetch(nextPageUrl.current)
            .then((response) => response.json())
            .then((data) => {
                nextPageUrl.current = data.next_page_url;

                for (const item of data.data) {
                    pokemon.current.push({
                        id: item.id,
                        name: item.name,
                    });
                }

                setRender(getTime());
            });
    };

    useEffect(() => {
        nextPageUrl.current = getUrl;
        pokemon.current = [];
        isLoading.current = false;
        screenGridRef.current?.scrollTo(0, 0);
        loadMore();
    }, [getUrlParams]);

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

    return (
        <section
            ref={screenGridRef}
            className="grid grid-cols-3 overflow-y-auto overflow-x-hidden p-[5px] gap-[5px] bg-screen-grid"
        >
            {pokemon.current.length == 0 ? (
                <div className="no-pokemon col-start-1 col-end-4 flex justify-center items-center">
                    {noPokemonMessage}
                </div>
            ) : (
                <>
                    {pokemon.current.map((pokemon) => (
                        <div
                            key={pokemon.id}
                            className="pokemon flex flex-col items-center"
                        >
                            <img
                                className="w-[80%] aspect-[1/1]"
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                            />
                            <div className="name text-black first-letter:uppercase">
                                {pokemon.name}
                            </div>
                        </div>
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
};

export default ScreenGrid;
