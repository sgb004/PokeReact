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
import ScreenGrid, { PrintGridItems, ScreenGridElement } from "../ScreenGrid";
import ScreenFooter from "../ScreenFooter";

export type ScreenProps = {
    className?: string;
    queryUrl: string;
    noPokemonMessage: string;
    actions: ScreenActions[];
    filters?: ScreenFilters[];
    children?: ReactNode;
    filterDefault?: string;
    sortDefault?: Sort;
    printGridItems: PrintGridItems;
};

export type ScreenElement = {
    element: HTMLDivElement | null;
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
            printGridItems,
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
                    element: screenRef.current,
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
                        printGridItems={printGridItems}
                    />
                    <ScreenFooter actions={actions} />
                </div>
            </div>
        );
    }
);

export default Screen;
