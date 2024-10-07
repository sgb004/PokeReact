import { useRef, useImperativeHandle, forwardRef } from "react";
import { ScreenFilters, ScreenHeaderParams } from "../../../types";

export type ScreenHeader = {
    headerParams: ScreenHeaderParams;
    filters?: ScreenFilters[];
    onChange: (params: ScreenHeaderParams) => void;
};

export type ScreenHeaderElement = {
    element: HTMLElement | null;
    setParams: (params: ScreenHeaderParams) => void;
    getParams: () => ScreenHeaderParams;
} & HTMLElement;

const ScreenHeader = forwardRef<HTMLElement, ScreenHeader>(
    ({ headerParams, filters, onChange }, ref) => {
        const screenHeaderRef = useRef(null);

        const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

        const paramsRef = useRef(headerParams);

        const setParams = (params: ScreenHeaderParams) => {
            paramsRef.current = params;
            onChange(params);
        };

        useImperativeHandle(
            ref,
            () => {
                return {
                    element: screenHeaderRef.current,
                    setParams,
                    getParams: () => {
                        return paramsRef.current;
                    },
                } as ScreenHeaderElement;
            },
            []
        );

        return (
            <header
                ref={screenHeaderRef}
                className="screen-header flex gap-[5px] p-[5px] bg-header"
            >
                {!filters ? null : (
                    <>
                        <label className="relative block screen-header-button">
                            <svg
                                className="absolute screen-header-button-icon m-auto top-0 bottom-0 left-0 right-0"
                                fill="none"
                                height="30"
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
                                        ...paramsRef.current,
                                        filter: event.target.value,
                                    });
                                }}
                                value={paramsRef.current.filter}
                            >
                                {filters.map((filter) => (
                                    <option
                                        key={filter.name}
                                        value={filter.value}
                                    >
                                        {filter.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="cursor-pointer screen-header-button filter-button sort flex justify-center items-center">
                            <input
                                type="checkbox"
                                className="hidden filter-button-dispatcher"
                                onChange={(event) => {
                                    setParams({
                                        ...paramsRef.current,
                                        sort: event.target.checked
                                            ? "desc"
                                            : "asc",
                                    });
                                }}
                                checked={paramsRef.current.sort === "desc"}
                            />
                            <svg
                                className="screen-header-button-icon"
                                fill="none"
                                height="30"
                                width="30"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 30 30"
                            >
                                <path
                                    d="M1.3 25.175a1.1 1.1 0 00.947 1.662h25.505a1.1 1.1 0 00.948-1.662L15.947 3.668a1.102 1.102 0 00-1.895 0z"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.325"
                                />
                            </svg>
                        </label>
                    </>
                )}
                <input
                    type="text"
                    placeholder="Search"
                    className="rounded-[3px] p-[3px_5px] h-[30px] w-[100%]"
                    onChange={(event) => {
                        if (searchTimer.current)
                            clearTimeout(searchTimer.current);
                        searchTimer.current = setTimeout(() => {
                            setParams({
                                ...paramsRef.current,
                                search: event.target.value,
                            });
                        }, 300);
                    }}
                />
                {/*
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
			 */}
            </header>
        );
    }
);

export default ScreenHeader;
