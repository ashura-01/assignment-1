export default function TextField({
    label,
    value,
    onChange,
    placeholder = "type here...",
    width,
    height,
    type = "text"
}) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isValid =
        type === "email"
            ? value === "" || emailRegex.test(value)
            : type === "number"
                ? value === "" || /^\d+$/.test(value)
                : true;

    const showError =
        (type === "email" && value !== "" && !emailRegex.test(value)) ||
        (type === "number" && value !== "" && !/^\d+$/.test(value));

    const handleChange = (e) => {
        let newValue = e.target.value;
        if (type === "number") {
            newValue = newValue.replace(/\D/g, '');
        }
        onChange(newValue);
    };

    return (
        <div className="flex flex-col gap-1">
            <label className="text-green-900 font-semibold">{label}:</label>

            <textarea
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={`px-2 py-2 rounded-md border 
                ${isValid ? "border-green-700/30" : "border-red-500"}
                focus:outline-none focus:ring-1
                focus:ring-green-500 w-60
                text-green-950 resize-none bg-green-100
                shadow-lg shadow-green-900/20`}
                style={{ width: `${width}rem`, height: `${height}rem` }}
            />

            {type === "email" && value !== "" && (
                <span className={`text-xs ${showError ? "text-red-500" : "text-green-600"}`}>
                    {showError ? "Invalid email !" : null}
                </span>
            )}

            {type === "number" && value !== "" && (
                <span className={`text-xs ${showError ? "text-red-500" : "text-green-600"}`}>
                    {showError ? "Only digits allowed !" : null}
                </span>
            )}
        </div>
    );
}