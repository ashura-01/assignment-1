export default function TextField({ label, value, onChange, placeholder = "type here...",width,height }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-green-900 font-semibold">{label}:</label>
            <textarea
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)} // CAPITAL C here
                placeholder={placeholder}
                className="px-3 py-2 rounded-md border border-green-700/30
                           focus:outline-none focus:ring-1
                           focus:ring-green-500  w-60
                           text-green-950
                           resize-none
                           bg-green-100
                           shadow-lg shadow-green-900/20
                           "
                 style={{ width: `${width}rem`, height: `${height}rem` }}
            />
        </div>
    )
}