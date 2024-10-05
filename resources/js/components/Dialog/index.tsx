import { forwardRef, ReactNode } from "react";

export type DialogProps = {
    id?: string;
    message: string | ReactNode;
    acceptButtonText?: string;
    cancelButtonText?: string;
    onAccept: () => void;
    onCancel?: () => void;
    additionalButtons?: ReactNode;
};

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
    (
        {
            id,
            message,
            acceptButtonText = "Yes",
            cancelButtonText = "No",
            onAccept,
            onCancel,
            additionalButtons,
        },
        ref
    ) => {
        return (
            <dialog
                id={id}
                ref={ref}
                className="absolute top-0 left-0 w-full h-full animate-backdrop-grey-scale z-20"
            >
                <div className="w-full h-full flex items-center justify-center p-[15px]">
                    <form
                        method="dialog"
                        className="bg-white max-h-full min-w-[200px] overflow-auto p-[15px] rounded-[5px] animate-in stop-touch"
                    >
                        <p className="leading-[1.3] mb-[10px]">{message}</p>
                        <div className="dialog-actions flex justify-center gap-[10px]">
                            <button
                                className="dialog-btn cancel-btn"
                                onClick={onCancel}
                            >
                                {cancelButtonText}
                            </button>
                            <button
                                className="dialog-btn accept-btn"
                                onClick={onAccept}
                            >
                                {acceptButtonText}
                            </button>
                            {additionalButtons}
                        </div>
                    </form>
                </div>
            </dialog>
        );
    }
);

export default Dialog;
