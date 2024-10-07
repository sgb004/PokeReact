import {
    forwardRef,
    InputHTMLAttributes,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import validateValue from "../../../validations/validateValue";
import validateUnsignedInteger from "../../../validations/validateUnsignedInteger";

export type InputElement = {
    element: HTMLInputElement | null;
    setErrorMessage: (message: string) => void;
} & HTMLInputElement;

const Input = forwardRef<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
    const inputRef = useRef(null);
    const [error, setError] = useState("");

    const handleChange = (value: string) => {
        let error = validateValue("This field", value);

        if (error === "" && props.type === "number") {
            let max = props.max ?? 0;
            max = parseInt(`${max}`);
            error = validateUnsignedInteger("This field", value, max);
        }

        setError(error);
    };

    useImperativeHandle(
        ref,
        () => {
            return {
                element: inputRef.current,
                setErrorMessage: (message: string) => {
                    setError(message);
                },
            } as InputElement;
        },
        []
    );

    return (
        <div>
            <input
                ref={inputRef}
                {...props}
                onChange={(event) => {
                    props.onChange?.(event);
                    handleChange(event.currentTarget.value);
                }}
            />
            {error ? (
                <div className="tooltip error-message absolute left-[15px] mt-[5px] text-capitalize flex justify-center w-[calc(100%-30px)] z-10">
                    <div className="bg-red-500 text-white text-center p-2 rounded-md m-auto relative before:[content:''] before:block before:absolute before:top-[-5px] before:left-[0] before:right-[0] before:mx-auto before:w-0 before:h-0 before:border-[transparent_transparent_#ef4444_transparent] before:border-t-[0] before:border-x-[5px] before:border-b-[5px]">
                        {error}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
});

export default Input;
