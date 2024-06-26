import { ScreenActions, ScreenFilters } from "../../../types";
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
    return (
        <div className="screen relative">
            <div className="screen-content h-[100%] grid grid-cols-1 grid-rows-[auto_1fr_auto]">
                <ScreenHeader filters={filters} />
                <ScreenGrid
                    getUrl={getUrl}
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
