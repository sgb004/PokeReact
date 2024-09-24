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
