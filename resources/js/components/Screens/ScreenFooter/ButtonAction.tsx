import { ScreenActions } from "../../../types";

export type ButtonActionProps = {
    action: ScreenActions;
    className?: string;
    position?: number;
};

const ButtonAction = ({
    action,
    className = "",
    position = 0,
}: ButtonActionProps) => {
    return (
        <button
            key={action.name}
            className={`screen-button-action ${action.name} flex justify-center items-center align-items-center absolute rounded-full border w-[40px] h-[40px] right-[20px] transition-all z-10 border-bg-border-gray ${className}`}
            onClick={(event) => action.action(event)}
            style={{ bottom: `${position * 50 + 10}px` }}
        >
            {action.content}
        </button>
    );
};

export default ButtonAction;
