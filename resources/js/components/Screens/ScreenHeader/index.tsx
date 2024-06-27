import { useState, useEffect, useRef } from "react";
import { ScreenFilters, ScreenHeaderParams } from "../../../types";

export type ScreenHeader = {
    headerParams: ScreenHeaderParams;
    filters?: ScreenFilters[];
    onChange: (params: ScreenHeaderParams) => void;
};

const ScreenHeader = ({ headerParams, filters, onChange }: ScreenHeader) => {
    const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [params, setParams] = useState<ScreenHeaderParams>(headerParams);

    useEffect(() => {
        onChange(params);
    }, [params]);

    return (
        <header className="screen-header flex gap-[5px] p-[5px] bg-[#caf0f8] bg-[#a8dadc]">
            {!filters ? null : (
                <>
                    <label className="relative block screen-header-button">
                        <svg
                            className="absolute screen-header-button-icon m-auto top-0 bottom-0 left-0 right-0"
                            fill="none"
                            height="30"
                            strokeWidth="1.5"
                            width="30"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 30 30"
                        >
                            <path
                                d="M2.7 1.162h24.6c.85 0 1.537.7 1.537 1.562v2.477c0 .414-.161.812-.45 1.105l-9.862 10.019c-.288.293-.45.69-.45 1.104v9.849c0 1.016-.94 1.761-1.91 1.515l-3.076-.781a1.558 1.558 0 01-1.164-1.515v-9.068c0-.414-.162-.811-.45-1.104L1.612 6.305a1.575 1.575 0 01-.45-1.104V2.724A1.55 1.55 0 012.7 1.162z"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.325"
                            />
                        </svg>
                        <select
                            className="opacity-0 relative size-screen-header-button cursor-pointer"
                            onChange={(event) => {
                                setParams({
                                    ...params,
                                    filter: event.target.value,
                                });
                            }}
                        >
                            {filters.map((filter) => (
                                <option key={filter.name} value={filter.value}>
                                    {filter.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="cursor-pointer screen-header-button filter-button flex justify-center items-center">
                        <input
                            type="checkbox"
                            className="hidden filter-button-dispatcher"
                            onChange={(event) => {
                                setParams({
                                    ...params,
                                    sort: event.target.checked ? "desc" : "asc",
                                });
                            }}
                        />
                        <svg
                            className="screen-header-button-icon"
                            fill="none"
                            height="30"
                            strokeWidth="1.5"
                            width="30"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 30 30"
                        >
                            <g
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path
                                    d="M15 28.953a2.79 2.79 0 110-5.58 2.79 2.79 0 010 5.58zM15 19.186V1.046m0 0l4.186 4.187M15 1.047l-4.186 4.186"
                                    strokeWidth="2.093025"
                                />
                            </g>
                        </svg>
                    </label>
                </>
            )}
            <input
                type="text"
                placeholder="Search"
                className="rounded-[3px] p-[3px_5px] h-[30px] w-[100%]"
                onChange={(event) => {
                    if (searchTimer.current) clearTimeout(searchTimer.current);
                    searchTimer.current = setTimeout(() => {
                        setParams({
                            ...params,
                            search: event.target.value,
                        });
                    }, 300);
                }}
            />
            <button className="screen-header-button flex justify-center items-center">
                <svg
                    className="screen-header-button-icon"
                    fill="none"
                    height="30"
                    strokeWidth="1.5"
                    width="30"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                >
                    <g
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path
                            d="M19.968 19.968l4.967 4.967M5.065 13.58a8.516 8.516 0 1017.032 0 8.516 8.516 0 00-17.032 0z"
                            strokeWidth="2.129025"
                        />
                    </g>
                </svg>
            </button>
        </header>
    );
};

export default ScreenHeader;
