import {
    forwardRef,
    ReactNode,
    useState,
    useRef,
    useImperativeHandle,
} from "react";
import {
    ScreenActions,
    ScreenFilters,
    ScreenHeaderParams,
    Sort,
} from "../../../types";
import ScreenHeader, { ScreenHeaderElement } from "../ScreenHeader";
import ScreenGrid, { ScreenGridElement } from "../ScreenGrid";

export type ScreenProps = {
    className?: string;
    queryUrl: string;
    noPokemonMessage: string;
    actions: ScreenActions[];
    filters?: ScreenFilters[];
    children?: ReactNode;
    filterDefault?: string;
    sortDefault?: Sort;
};

export type ScreenElement = {
    current: HTMLDivElement | null;
    header: ScreenHeaderElement | null;
    grid: ScreenGridElement | null;
} & HTMLDivElement;

const fullUrl = (url: string, getUrlParams: ScreenHeaderParams) => {
    const params = new URLSearchParams(getUrlParams);
    const urlWithParams = url.indexOf("?") > -1 ? url + "&" : url + "?";
    return `${urlWithParams}${params.toString()}`;
};

const Screen = forwardRef<HTMLDivElement, ScreenProps>(
    (
        {
            className = "",
            queryUrl,
            noPokemonMessage,
            actions,
            filters,
            children,
            filterDefault = "number",
            sortDefault = "asc",
        },
        ref
    ) => {
        const screenRef = useRef(null);
        const screenHeaderRef = useRef(null);
        const screenGridRef = useRef(null);
        const headerParams: ScreenHeaderParams = {
            filter: filterDefault,
            sort: sortDefault,
            search: "",
        };

        const [queryFullUrl, setQueryFullUrl] = useState(
            fullUrl(queryUrl, headerParams)
        );

        useImperativeHandle(
            ref,
            () => {
                return {
                    current: screenRef.current,
                    header: screenHeaderRef.current,
                    grid: screenGridRef.current,
                } as ScreenElement;
            },
            []
        );

        return (
            <div ref={screenRef} className={`${className} screen relative`}>
                <div className="screen-content h-[100%] grid grid-cols-1 grid-rows-[auto_1fr_auto]">
                    <ScreenHeader
                        ref={screenHeaderRef}
                        headerParams={headerParams}
                        filters={filters}
                        onChange={(params: ScreenHeaderParams) =>
                            setQueryFullUrl(fullUrl(queryUrl, params))
                        }
                    />
                    {children}
                    <ScreenGrid
                        ref={screenGridRef}
                        queryUrl={queryFullUrl}
                        noPokemonMessage={noPokemonMessage}
                    />
                    <footer>
                        {actions.map((action) => (
                            <button
                                key={action.name}
                                className={`screen-button-action ${action.name} flex justify-center items-center align-items-center absolute rounded-full border border-black w-[40px] h-[40px] bottom-[10px] right-[20px] transition-all`}
                                onClick={(event) => action.action(event)}
                            >
                                {action.content}
                            </button>
                        ))}
                    </footer>
                </div>
            </div>
        );
    }
);

export default Screen;
