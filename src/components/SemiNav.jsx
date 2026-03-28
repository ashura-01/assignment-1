import { useNavigate, useLocation } from "react-router-dom";
import Card from "./Card";

export default function SemiNav() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="w-full flex justify-center items-center bg-green-50 py-4">
            <Card width={45} height="auto" property={"shadow-lg shadow-green-800/30 bg-white py-2"}>
                <div className="flex flex-row justify-center items-center gap-4">
                    <div
                        onClick={() => navigate("/")}
                        className={`text-sm font-bold cursor-pointer transition-colors duration-200 ${
                            location.pathname === "/" 
                                ? "text-green-700 border-b-2 border-green-700" 
                                : "text-gray-500 hover:text-green-600"
                        }`}
                    >
                        Feedback Form
                    </div>
                    <div
                        onClick={() => navigate("/feedbacklist")}
                        className={`text-sm font-bold cursor-pointer transition-colors duration-200 ${
                            location.pathname === "/feedbacklist" 
                                ? "text-green-700 border-b-2 border-green-700" 
                                : "text-gray-500 hover:text-green-600"
                        }`}
                    >
                        Feedback List
                    </div>
                </div>
            </Card>
        </div>
    )
}