import Notifications from "../Notifications";
import InfoButton from "./InfoButton";
import UploadButton from "./UploadButton";

const FrontCoverReverse = () => {
    return (
        <div className="front-cover-reverse invisible absolute w-full bg-pokedex bottom-0 z-10 top-[110px] left-[70px] rounded-[5px] border border-black  ">
            <div className="front-cover-reverse-content notifications-container relative flex justify-center items-end w-full h-full mt-auto mx-auto pb-[15px] gap-[5px] overflow-hidden">
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
                <span className="block border-[0.5px] h-[27px] mb-[5px] border-[#00000047]"></span>
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
                <UploadButton />
                <Notifications className="left-[0.5px] bottom-[0.5px]" />
            </div>
        </div>
    );
};

export default FrontCoverReverse;
