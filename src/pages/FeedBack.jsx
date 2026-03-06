import React, { useState } from "react";
import TextField from "../components/TextField";
import Card from "../components/Card";
import StarRating from "../components/StarRating";
import ButtonGrad from "../components/ButtonGrad";

export default function FeedBack() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    rating: "",
    message: "",
  });

  const handleChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    
    if (!formData.email || !formData.message) {
      alert("Please fill in the required fields.");
      return;
    }

    console.log("Feedback Submitted:", formData);
    alert("Thank you for your feedback!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      rating: "",
      message: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-black p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-100 flex flex-col items-center">
      <div className="flex flex-col items-start gap-4">
        <Card width={41} height={5} property={"mb-7 flex text-4xl font-bold text-left align-middle"}>
          Feedback Form
        </Card>

        <div className="flex gap-4">
          <TextField
            label="Name"
            value={formData.name}
            onChange={handleChange("name")}
            height={3} width={20}
          />
          <TextField
            label="Email"
            value={formData.email}
            onChange={handleChange("email")}
            height={3} width={20}
          />
        </div>

        <div className="flex gap-4">
          <TextField
            label="Subject"
            value={formData.subject} 
            onChange={handleChange("subject")}
            height={3} width={20}
          />
          <StarRating
            label="Rating"
            value={formData.rating}
            onChange={handleChange("rating")}
          />
        </div>

        <TextField
          label="Message"
          value={formData.message}
          onChange={handleChange("message")}
          height={10} width={41}
        />

        <ButtonGrad
          onClick={handleSubmit}
          width="w-[15rem]"
          height="h-[2.5rem]"
          from="from-green-300"
          middle="via-green-200"
          to="to-green-300"
          className="self-center mt-6"
        >
          Submit
        </ButtonGrad>


        <div className="flex self-center mt-6 text-green-700/50">We value your privacy and your input </div>
      </div>
      </div>
    </div>
  );
}