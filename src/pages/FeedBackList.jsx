import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonGrad from "../components/ButtonGrad";
import Card from "../components/Card";

export default function FeedBackList() {
    const navigate = useNavigate();

    const [feedbacks, setFeedBacks] = useState(() => {
        const saved = localStorage.getItem("userFeedbacks");
        return saved ? JSON.parse(saved) : [];
    })

    const deletion = (targetIndex) => {
        const updated = feedbacks.filter((_, index) => index !== targetIndex);
        setFeedBacks(updated)
        localStorage.setItem("userFeedbacks", JSON.stringify(updated));
    }

    const purge = () => {
        localStorage.removeItem("userFeedbacks");
        setFeedBacks([])
    }

    return (
        <div className="flex flex-col items-center justify-start h-screen overflow-y-auto bg-green-50 text-black p-4">

            <div className="flex flex-col items-start gap-4">
                <Card width={41} height={5} property={"mb-7 flex text-4xl font-bold text-left align-middle"}>
                    Feedback DashBoard
                </Card>
            </div>

            <div className="flex gap-4 my-6">
                <ButtonGrad onClick={() => navigate("/")}
                    width="w-32" height="h-10"
                    className="mt-0 text-sm shadow-md">
                    Add New
                </ButtonGrad>

                {
                    feedbacks.length > 0 && (
                        <ButtonGrad
                            onClick={purge}
                            width="w-32" height="h-10"
                            from="from-red-400"
                            middle="via-red-200"
                            to="to-red-400"
                            className="mt-10 text-sm shadow-md">
                            Clear All
                        </ButtonGrad>
                    )
                }
            </div>
            <div className="flex flex-col gap-6 w-full items-center">
                {
                    feedbacks.length == 0 ? (
                        <div className="flex flex-col items-center gap-2 opacity-40 mt-20">
                            <p className="text-xl font-medium italic">Your feedback list is empty</p>
                        </div>
                    ) : (
                        feedbacks.map((item, index) => (
                            <Card
                                key={index}
                                width={41}
                                height="auto"
                                property="p-6 bg-white flex flex-col items-start shadow-md 
                            hover:shadow-xl transition-shadow border-l-8 border-green-300"
                            >
                                <div className="flex justify-between w-full border-b pb-2">
                                    <h3 className="font-bold text-green-800 text-lg 
                                    uppercase tracking-wide">
                                        {item.subject || "no subject"}
                                    </h3>
                                    <span className="text-yellow-500 font-bold">
                                        {"⭐".repeat(Number(item.rating))}
                                    </span>
                                </div>

                                <p className="my-4 text-gray-700 leading-relaxed italic">
                                    "{item.message}"
                                </p>

                                <div className="flex justify-between items-end w-full mt-2">
                                    <div className="text-xs text-gray-400">
                                        <p className="font-semibold text-gray-600">By: {item.name}</p>
                                        <p>{item.email}</p>
                                    </div>
                                    <ButtonGrad
                                        onClick={() => deletion(index)}
                                        width="w-20" height="h-8"
                                        from="from-red-400"
                                        middle="via-red-100"
                                        to="to-red-500"
                                        className="mt-0 text-[10px]"
                                    >
                                        DELETE
                                    </ButtonGrad>
                                </div>

                            </Card>
                        ))
                    )
                }
            </div>
        </div>
    );
}