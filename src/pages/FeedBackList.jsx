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

    const formatDate = (dateString) => {
        if (!dateString) return "Not specified";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    return (
        <div className="flex flex-col items-center justify-start h-screen overflow-y-auto bg-green-50 text-black p-4">

            <div className="flex flex-col items-start gap-4">
                <Card width={41} height={5} property={"mb-7 flex text-4xl font-bold text-left align-middle  bg-green-200"}>
                    Feedback Dashboard
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
                            className="mt-0 text-sm shadow-md">
                            Clear All
                        </ButtonGrad>
                    )
                }
            </div>

            <div className="flex flex-col gap-6 w-full items-center">
                {
                    feedbacks.length === 0 ? (
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
                                <div className="flex justify-between w-full border-b pb-3 mb-3">
                                    <div>
                                        <h3 className="font-bold text-green-800 text-lg uppercase tracking-wide">
                                            {item.eventName || "Event Name Not Specified"}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {item.eventDate && `Event Date: ${formatDate(item.eventDate)}`}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-yellow-500 font-bold text-lg">
                                            {"⭐".repeat(Number(item.rating))}
                                        </span>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Rating: {item.rating}/5
                                        </p>
                                    </div>
                                </div>

                                <div className="w-full mb-4">
                                    <p className="text-gray-700 leading-relaxed italic bg-gray-50 p-3 rounded-lg">
                                        "{item.feedbackMessage}"
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 w-full mt-2 text-sm">
                                    <div className="space-y-2">
                                        <div>
                                            <p className="font-semibold text-gray-600">Name:</p>
                                            <p className="text-gray-700">
                                                {item.firstName} {item.lastName}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-600">Email:</p>
                                            <p className="text-gray-700 break-all">{item.email}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div>
                                            <p className="font-semibold text-gray-600">Phone:</p>
                                            <p className="text-gray-700">{item.phone || "Not specified"}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-600">Event:</p>
                                            <p className="text-gray-700">{item.eventName || "Not specified"}</p>
                                        </div>
                                    </div>
                                </div>



                                <div className="flex justify-end w-full mt-4 pt-3 border-t border-gray-200">
                                    <ButtonGrad
                                        onClick={() => deletion(index)}
                                        width="w-24" height="h-8"
                                        from="from-red-400"
                                        middle="via-red-100"
                                        to="to-red-500"
                                        className="mt-0 text-xs"
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