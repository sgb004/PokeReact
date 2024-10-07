import { InputHTMLAttributes, useRef, useState } from "react";

const InputSearch = (props: InputHTMLAttributes<HTMLInputElement>) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [val, setVal] = useState<string>(`${props.value ?? ""}`);

    const handleClearButtonClick = () => {
        if (inputRef.current) {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                "value"
            )?.set;
            nativeInputValueSetter?.call(inputRef.current, "");
            const event = new Event("input", { bubbles: true });
            inputRef.current.dispatchEvent(event);
        }
        setVal("");
    };

    return (
        <div className="input-search w-full relative">
            <input
                {...props}
                ref={inputRef}
                value={val}
                onChange={(event) => {
                    setVal(event.currentTarget.value);
                    props.onChange?.(event);
                }}
            />
            <button
                className="bg-white absolute top-[1px] right-[1px] w-[28px] h-[28px] flex justify-center items-center"
                onClick={handleClearButtonClick}
            >
                <svg
                    className="block w-[20px] h-[20px] fill-button-blue"
                    width="30"
                    height="30"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                >
                    <path d="M15 0a15 15 0 1015 15A15 15 0 0015 0zm6.419 19.49a1.364 1.364 0 11-1.929 1.929L15 16.929l-4.49 4.49A1.364 1.364 0 118.58 19.49l4.49-4.49-4.49-4.49A1.364 1.364 0 1110.51 8.58l4.49 4.49 4.49-4.49a1.364 1.364 0 111.929 1.929L16.929 15z" />
                </svg>
            </button>
        </div>
    );
};

export default InputSearch;
