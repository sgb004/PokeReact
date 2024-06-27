import { useState } from "react";
import {
    ScreenActions,
    ScreenFilters,
    ScreenHeaderParams,
} from "../../../types";
import ScreenHeader from "../ScreenHeader";
import ScreenGrid from "../ScreenGrid";

export type ScreenProps = {
    getUrl: string;
    noPokemonMessage: string;
    actions: ScreenActions[];
    filters?: ScreenFilters[];
};

const Screen = ({
    getUrl,
    noPokemonMessage,
    actions,
    filters,
}: ScreenProps) => {
    const [headerParams, setHeaderParams] = useState<ScreenHeaderParams>({
        filter: "number",
        sort: "asc",
        search: "",
    });

    return (
        <div className="screen relative">
            <div className="screen-content h-[100%] grid grid-cols-1 grid-rows-[auto_1fr_auto]">
                <ScreenHeader
                    headerParams={headerParams}
                    filters={filters}
                    onChange={setHeaderParams}
                />
                <ScreenGrid
                    getUrl={getUrl}
                    getUrlParams={headerParams}
                    noPokemonMessage={noPokemonMessage}
                />
                <footer>
                    {actions.map((action) => (
                        <button
                            key={action.name}
                            className={`screen-button-action ${action.name} flex justify-center items-center align-items-center absolute rounded-full border border-black w-[40px] h-[40px] bottom-[10px] right-[10px] transition-all`}
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
