export type PokeballIconProps = {
    className?: string;
    size?: number;
};

const PokeballIcon = ({ className, size = 30 }: PokeballIconProps) => (
    <svg
        className={className}
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
    >
        <g fill="#fff" stroke="#000">
            <path d="M.5 15A14.5 14.5 0 0015 29.5 14.5 14.5 0 0029.5 15z" />
            <path
                className="top-cover"
                d="M15 .5A14.5 14.5 0 00.5 15h29A14.5 14.5 0 0015 .5z"
            />
            <path
                d="M.857 15h28.286"
                strokeWidth="1.714"
                strokeLinecap="round"
            />
            <circle cx="15" cy="15" r="5.143" strokeWidth="1.714" />
            <circle
                className="button"
                cx="15"
                cy="15"
                r="2.774"
                strokeWidth=".451"
            />
        </g>
    </svg>
);

export default PokeballIcon;
