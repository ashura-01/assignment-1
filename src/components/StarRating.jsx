import { useState } from "react";

export default function StarRating({ label, value, onChange }) {
    const [hoverValue, setHoverValue]=useState(0)
    return (
        <div className="flex flex-col gap-1 ">
            <label className="text-green-900 font-semibold">{label}:</label>
            <div className="flex gap-10 bg-green-100 px-1 py-1 justify-center align-middle
            rounded-md border border-green-900/30 shadow-2xl w-fit"
            style={{width:`20rem`, height:`3rem`}}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onChange(star)}
                        onMouseEnter={()=> setHoverValue(star)}
                        onMouseLeave={()=> setHoverValue(0)}
                        className={`text-3xl transition-colors duration-200 
                            cursor-pointer 
                            ${star <= (value || hoverValue) ? "text-yellow-400" : "text-green-300 hover:text-amber-300"
                            }`}
                    >
                        ★
                    </button>
                ))}
            </div>
        </div>
    );

}