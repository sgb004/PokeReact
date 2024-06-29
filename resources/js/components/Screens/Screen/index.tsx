import { useEffect, useState } from "react";
import {
    ScreenActions,
    ScreenFilters,
    ScreenHeaderParams,
} from "../../../types";
import ScreenHeader from "../ScreenHeader";
import ScreenGrid from "../ScreenGrid";

export type ScreenProps = {
    queryUrl: string;
    noPokemonMessage: string;
    actions: ScreenActions[];
    filters?: ScreenFilters[];
};

const fullUrl = (url: string, getUrlParams: ScreenHeaderParams) => {
    const params = new URLSearchParams(getUrlParams);
    const urlWithParams = url.indexOf("?") > -1 ? url + "&" : url + "?";
    return `${urlWithParams}${params.toString()}`;
};

const Screen = ({
    queryUrl,
    noPokemonMessage,
    actions,
    filters,
}: ScreenProps) => {
    const headerParams: ScreenHeaderParams = {
        filter: "number",
        sort: "asc",
        search: "",
    };

    const [queryFullUrl, setQueryFullUrl] = useState(
        fullUrl(queryUrl, headerParams)
    );

    return (
        <div className="screen relative">
            <div className="screen-content h-[100%] grid grid-cols-1 grid-rows-[auto_1fr_auto]">
                <ScreenHeader
                    headerParams={headerParams}
                    filters={filters}
                    onChange={(params: ScreenHeaderParams) =>
                        setQueryFullUrl(fullUrl(queryUrl, params))
                    }
                />
                <ScreenGrid
                    queryUrl={queryFullUrl}
                    noPokemonMessage={noPokemonMessage}
                />
                <footer>
                    {actions.map((action) => (
                        <button
                            key={action.name}
                            className={`screen-button-action ${action.name} flex justify-center items-center align-items-center absolute rounded-full border border-black w-[40px] h-[40px] bottom-[10px] right-[20px] transition-all`}
                            onClick={() => action.action()}
                        >
                            {action.content}
                        </button>
                    ))}
                </footer>
            </div>
        </div>
    );
};

export default Screen;
