import { useRef } from "react";
import Dialog from "../Dialog";

const InfoButton = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
        <>
            <button
                className="simple-button"
                onClick={() =>
                    dialogRef.current instanceof HTMLDialogElement &&
                    (dialogRef.current.open = true)
                }
            >
                <svg
                    className="icon"
                    height="27"
                    width="27"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 49 49"
                >
                    <path
                        d="M24.5.5C11.245.5.5 11.245.5 24.5s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24z"
                        fill="none"
                        stroke="#000"
                    />
                    <path
                        d="M26.659 39.241c0 1.344-.856 1.592-1.328 1.627h-1.592c-1.113 0-1.317-.837-1.347-1.302V18.948c0-1.538 1.684-1.553 1.684-1.553h.763c.401.007 1.82.157 1.82 1.911zm-2.233-25.823c-1.503 0-2.569-1.164-2.569-2.62 0-1.503 1.116-2.666 2.667-2.666 1.6 0 2.617 1.165 2.617 2.667.05 1.455-1.017 2.62-2.715 2.62z"
                        stroke="#000"
                        strokeWidth="1.347"
                    />
                </svg>
            </button>
            <Dialog
                id="pokedex-about"
                ref={dialogRef}
                message={
                    <>
                        The names and trademarks mentioned in this app are the
                        property of their respective owners.
                        <br />
                        This app was created for learning purposes, not for
                        profit.
                        <br />
                        Any misuse will be the responsibility of the person who
                        improperly used this app.
                        <br />
                        <br />
                        <b>Version: 1.0.0</b>
                        <br />
                        <b>Author: Salvador Gonzalez Blanco (sgb004)</b>
                        <div className="flex gap-[5px] p-[2px] [content-visibility:auto]">
                            <a
                                href="https://gitlab.com/sgb004/pokereact"
                                target="_blank"
                                rel="noreferrer"
                                title="GitLab"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    width="32"
                                    height="32"
                                    role="img"
                                    aria-hidden="true"
                                    viewBox="0 0 25 24"
                                >
                                    <path
                                        fill="#E24329"
                                        d="m24.507 9.5-.034-.09L21.082.562a.896.896 0 0 0-1.694.091l-2.29 7.01H7.825L5.535.653a.898.898 0 0 0-1.694-.09L.451 9.411.416 9.5a6.297 6.297 0 0 0 2.09 7.278l.012.01.03.022 5.16 3.867 2.56 1.935 1.554 1.176a1.051 1.051 0 0 0 1.268 0l1.555-1.176 2.56-1.935 5.197-3.89.014-.01A6.297 6.297 0 0 0 24.507 9.5Z"
                                    ></path>
                                    <path
                                        fill="#FC6D26"
                                        d="m24.507 9.5-.034-.09a11.44 11.44 0 0 0-4.56 2.051l-7.447 5.632 4.742 3.584 5.197-3.89.014-.01A6.297 6.297 0 0 0 24.507 9.5Z"
                                    ></path>
                                    <path
                                        fill="#FCA326"
                                        d="m7.707 20.677 2.56 1.935 1.555 1.176a1.051 1.051 0 0 0 1.268 0l1.555-1.176 2.56-1.935-4.743-3.584-4.755 3.584Z"
                                    ></path>
                                    <path
                                        fill="#FC6D26"
                                        d="M5.01 11.461a11.43 11.43 0 0 0-4.56-2.05L.416 9.5a6.297 6.297 0 0 0 2.09 7.278l.012.01.03.022 5.16 3.867 4.745-3.584-7.444-5.632Z"
                                    ></path>
                                </svg>
                            </a>
                            <a
                                href="https://github.com/sgb004/pokereact"
                                target="_blank"
                                rel="noreferrer"
                                title="GitHub"
                            >
                                <svg
                                    width="32"
                                    height="32"
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    version="1.1"
                                    data-view-component="true"
                                >
                                    <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
                                </svg>
                            </a>
                        </div>
                    </>
                }
                cancelButtonText="Close"
                onAccept={() =>
                    dialogRef.current instanceof HTMLDialogElement &&
                    (dialogRef.current.open = false)
                }
            />
        </>
    );
};

export default InfoButton;
