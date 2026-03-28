import  { useState } from "react";
import TextField from "../components/TextField";
import Card from "../components/Card";
import StarRating from "../components/StarRating";
import ButtonGrad from "../components/ButtonGrad";
import { useNavigate } from "react-router-dom";

export default function FeedBack() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    eventName: "",
    eventDate: "",
    rating: "",
    feedbackMessage: "",
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email address is required";
    if (!formData.eventName.trim()) newErrors.eventName = "Event name is required";
    if (!formData.eventDate) newErrors.eventDate = "Event date is required";
    if (!formData.rating) newErrors.rating = "Rating is required";
    if (!formData.feedbackMessage.trim()) newErrors.feedbackMessage = "Feedback message is required";
    
    if (formData.phone && !/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain only digits";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (formData.email && emailRegex.test(formData.email)) {
      const existingData = JSON.parse(localStorage.getItem("userFeedbacks")) || [];
      const emailExists = existingData.some(
        (feedback) => feedback.email.toLowerCase() === formData.email.toLowerCase()
      );
      if (emailExists) {
        newErrors.email = "This email address has already been used";
      }
    }
    
    if (formData.rating && (formData.rating < 1 || formData.rating > 5)) {
      newErrors.rating = "Rating must be between 1 and 5";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const existingData = JSON.parse(localStorage.getItem("userFeedbacks")) || [];
    const updatedData = [...existingData, formData];
    localStorage.setItem("userFeedbacks", JSON.stringify(updatedData));

    console.log("Feedback Submitted:", formData);

    const goToHistory = window.confirm(
      "Success! Would you like to view the feedback history?"
    );

    if (goToHistory) {
      navigate("/feedbacklist");
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        eventName: "",
        eventDate: "",
        rating: "",
        feedbackMessage: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-black p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-100 flex flex-col items-center">
        <div className="flex flex-col items-start gap-4">
          <Card width={41} height={5} property={"mb-7 flex text-4xl font-bold text-left align-middle"}>
            Feedback Form
          </Card>

          <div className="flex gap-4">
            <div className="flex-1">
              <TextField
                label="First Name"
                value={formData.firstName}
                onChange={handleChange("firstName")}
                height={3}
                width={20}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div className="flex-1">
              <TextField
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange("lastName")}
                height={3}
                width={20}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <TextField
                label="Phone Number"
                value={formData.phone}
                onChange={handleChange("phone")}
                type="tel"
                height={3}
                width={20}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
            <div className="flex-1">
              <TextField
                label="Email Address"
                value={formData.email}
                type="email"
                onChange={handleChange("email")}
                height={3}
                width={20}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <TextField
                label="Event Name"
                value={formData.eventName}
                onChange={handleChange("eventName")}
                height={3}
                width={20}
              />
              {errors.eventName && (
                <p className="text-red-500 text-xs mt-1">{errors.eventName}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Date:
              </label>
              <input
                type="date"
                value={formData.eventDate}
                onChange={(e) => handleChange("eventDate")(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ height: "2.5rem" }}
              />
              {errors.eventDate && (
                <p className="text-red-500 text-xs mt-1">{errors.eventDate}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <StarRating
                label="Rating"
                value={formData.rating}
                onChange={handleChange("rating")}
              />
              {errors.rating && (
                <p className="text-red-500 text-xs mt-1">{errors.rating}</p>
              )}
            </div>
            <div className="flex-1"></div>
          </div>

          <div className="w-full">
            <TextField
              label="Feedback Message"
              value={formData.feedbackMessage}
              onChange={handleChange("feedbackMessage")}
              height={10}
              width={41}
            />
            {errors.feedbackMessage && (
              <p className="text-red-500 text-xs mt-1">{errors.feedbackMessage}</p>
            )}
          </div>

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

          <div className="flex self-center mt-6 text-green-700/40">
            We value your privacy and your input
          </div>
        </div>
      </div>
    </div>
  );
}