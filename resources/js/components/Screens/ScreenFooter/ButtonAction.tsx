import { ScreenActions } from "../../../types";

export type ButtonActionProps = {
    action: ScreenActions;
    className?: string;
};

const ButtonAction = ({ action, className = "" }: ButtonActionProps) => {
    return (
        <button
            key={action.name}
            className={`screen-button-action ${action.name} flex justify-center items-center align-items-center absolute rounded-full border border-black w-[40px] h-[40px] right-[20px] transition-all z-10 ${className}`}
            onClick={(event) => action.action(event)}
        >
            {action.content}
        </button>
    );
};

export default ButtonAction;
