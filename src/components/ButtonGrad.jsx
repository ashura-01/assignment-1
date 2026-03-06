export default function ButtonGrad({
    children,
    onClick,
    width = "w-40",     
    height = "h-12",    
    from = "from-green-500",
    middle="via-green-200" ,
    to = "to-green-400",
    className = ""
}) {
    return (
        <button
            onClick={onClick}
            className={`mt-10
                flex items-center justify-center 
                bg-gradient-to-r ${from} ${middle} ${to}
                ${width} ${height}
                text-black font-bold rounded-md
                transition-all duration-200 
                hover:brightness-110 active:scale-95
                shadow-2xl
                ${className}
                shadow-lg shadow-green-900/20
            `}
        >
            {children}
        </button>
    );
}