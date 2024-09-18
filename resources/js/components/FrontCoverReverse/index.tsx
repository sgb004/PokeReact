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

const FrontCoverReverse = () => {
    return (
        <div className="front-cover-reverse flex invisible absolute w-full bg-pokedex bottom-0 z-10 top-[110px] left-[70px] rounded-[5px] border border-black ">
            <div className="front-cover-reverse-content flex justify-center mt-auto mx-auto mb-[15px] gap-[5px]">
                <svg className="front-cover-reverse-icons hidden">
                    <defs>
                        <symbol id="icon-arrow" viewBox="0 0 48 48">
                            <path
                                d="M25.64 1.436l13.757 16.69c3.04 3.691-1.741 3.721-1.741 3.721h-2.859c-1.072.146-2.757.92-2.757 4.36V44.47S32.182 48 28.452 48h-7.734c-1.291-.094-4.03-.815-4.03-5.271v-17.73c0-3.27 2.454-3.154 2.454-3.154h.142c1.944 0 2.285 1.948 2.332 2.926v14.831c0 2.634 1.282 3.185 2.096 3.28h1.01c2.128 0 2.523-1.585 2.581-2.474V21.304c0-3.013 1.623-3.961 2.823-4.255l-.002-.004s1.68-.296.313-1.955l-5.29-6.422s-.016-.017-.018-.023l-.077-.093c-.392-.458-1.976-2.051-3.502.112l-3.69 5.243-.027.037-2.094 2.975h.062l-1.69 2.475c-1.695 2.472-4.492 2.453-4.492 2.453h-.64s-2.498-.302-.792-2.733L20.632 1.436v-.002c2.27-3.224 5.003-.005 5.008.002z"
                                fill="#000"
                            />
                        </symbol>
                    </defs>
                </svg>
                <InfoButton />
                <span className="block border-[0.5px] h-[27px] my-auto border-[#00000047]"></span>
                <a className="simple-button" href="/my-pokedex/download">
                    <svg
                        className="icon [transform:rotateY(180deg)_rotateX(180deg)]"
                        height="25"
                        width="25"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                    >
                        <use xlinkHref="#icon-arrow"></use>
                    </svg>
                </a>
                <button className="simple-button">
                    <svg
                        className="icon"
                        height="25"
                        width="25"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                    >
                        <use xlinkHref="#icon-arrow"></use>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default FrontCoverReverse;
