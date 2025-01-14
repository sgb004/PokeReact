import "./style.css";

function NotFoundMessage() {
    return (
        <div className="text-center">
            <svg
                height="85.118"
                version="1.1"
                width="97.051"
                xmlns="http://www.w3.org/2000/svg"
                className="pikachu-searching m-auto mb-[15px]"
            >
                <defs>
                    <symbol id="pikachu-searching-left-ear">
                        <g className="left-ear">
                            <path d="M16.11 73.504c-.268 0-.533-.071-.769-.212a21.744 21.744 0 01-9.426-11.627A21.745 21.745 0 016.247 46.7a1.498 1.498 0 012.165-.74 21.757 21.757 0 019.428 11.627 21.763 21.763 0 01-.333 14.965 1.498 1.498 0 01-1.397.952z" />
                            <path
                                d="M6.298 57.575a1.5 1.5 0 01-1.497-1.391A21.845 21.845 0 016.247 46.7a1.498 1.498 0 012.165-.74 21.585 21.585 0 016.134 5.492 1.497 1.497 0 01-.495 2.236l-7.055 3.714a1.487 1.487 0 01-.698.173z"
                                fill="#33363a"
                            />
                        </g>
                    </symbol>
                    <symbol id="pikachu-searching-right-ear">
                        <g className="right-ear">
                            <path d="M32.843 73.504a1.5 1.5 0 01-1.396-.952 21.763 21.763 0 01-.333-14.965 21.744 21.744 0 019.429-11.627 1.5 1.5 0 012.164.74 21.756 21.756 0 01.331 14.965 21.744 21.744 0 01-9.426 11.627 1.498 1.498 0 01-.769.212z" />
                            <path
                                d="M42.655 57.575c-.24 0-.479-.058-.699-.173l-7.055-3.714a1.5 1.5 0 01-.495-2.236 21.585 21.585 0 016.134-5.492 1.498 1.498 0 012.165.74 21.847 21.847 0 011.445 9.482 1.5 1.5 0 01-1.495 1.393z"
                                fill="#33363a"
                            />
                        </g>
                    </symbol>
                </defs>
                <g
                    transform="translate(24.049 -45.247)"
                    fill="#fff"
                    stroke="#33363a"
                >
                    <g className="paws">
                        <path d="M15.706 128.434a1.43 1.43 0 01-1.43 1.431h-2.324a1.43 1.43 0 01-1.43-1.431v-2.858c0-.79.641-1.429 1.43-1.429h2.324c.789 0 1.43.639 1.43 1.429z" />
                        <path d="M38.431 128.434a1.43 1.43 0 01-1.43 1.431h-2.324a1.43 1.43 0 01-1.43-1.431v-2.858c0-.79.639-1.429 1.43-1.429h2.324c.789 0 1.43.639 1.43 1.429z" />
                    </g>
                    <use href="#pikachu-searching-left-ear"></use>
                    <use href="#pikachu-searching-right-ear"></use>
                    <path
                        className="body"
                        d="M36.733 127.262H12.218c-4.612 0-8.365-3.753-8.365-8.365v-5.695c0-1.898.645-3.724 1.826-5.203V83.414c0-9.684 7.879-17.562 17.562-17.562h2.471c9.684 0 17.562 7.879 17.562 17.562v24.585a8.32 8.32 0 011.826 5.202v5.695c.001 4.613-3.753 8.366-8.367 8.366z"
                    />
                    <use
                        href="#pikachu-searching-left-ear"
                        className="side-right"
                    ></use>
                    <use
                        href="#pikachu-searching-right-ear"
                        className="side-left"
                    ></use>
                    <g
                        className="left-tail side-left"
                        transform="matrix(-1 0 0 1 48.953 0)"
                    >
                        <path d="M23.753 120.697a1.5 1.5 0 01-.482-2.92l19.722-14.278-8.105-3.451a1.498 1.498 0 01-.32-2.573l17.424-13.257a1.498 1.498 0 011.495-.187l18.102 7.703a1.5 1.5 0 01.099 2.714l-14.895 7.648 6.132 2.609a1.498 1.498 0 01-.105 2.8l-38.584 13.111a1.462 1.462 0 01-.483.081z" />
                    </g>
                    <g className="right-tail side-right">
                        <path d="M23.753 120.697a1.5 1.5 0 01-.482-2.92l19.722-14.278-8.105-3.451a1.498 1.498 0 01-.32-2.573l17.424-13.257a1.498 1.498 0 011.495-.187l18.102 7.703a1.5 1.5 0 01.099 2.714l-14.895 7.648 6.132 2.609a1.498 1.498 0 01-.105 2.8l-38.584 13.111a1.462 1.462 0 01-.483.081z" />
                    </g>
                </g>
            </svg>
            <p>No Pokémon were found.</p>
        </div>
    );
}

export default NotFoundMessage;
