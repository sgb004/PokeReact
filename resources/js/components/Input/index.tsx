import { InputHTMLAttributes, useState } from "react";
import validateValue from "../../validations/validateValue";
import validateUnsignedInteger from "../../validations/validateUnsignedInteger";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
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

    return (
        <div>
            <input
                {...props}
                onChange={(event) => {
                    props.onChange?.(event);
                    handleChange(event.currentTarget.value);
                }}
            />
            {error ? (
                <div className="tooltip absolute left-[15px] mt-[5px] text-capitalize flex justify-center w-[calc(100%-30px)] z-10">
                    <div className="bg-red-500 text-white text-center p-2 rounded-md m-auto relative before:[content:''] before:block before:absolute before:top-[-5px] before:left-[0] before:right-[0] before:mx-auto before:w-0 before:h-0 before:border-[transparent_transparent_#ef4444_transparent] before:border-t-[0] before:border-x-[5px] before:border-b-[5px]">
                        {error}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Input;
