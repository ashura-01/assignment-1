import { Routes, Route } from "react-router-dom";
import FeedBack from "../pages/feedback";
import FeedBackList from "../pages/FeedBackList"


const AssignmentRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<FeedBack />} />
     <Route path="/feedbacklist" element={<FeedBackList />} />
    </Routes>
  );
};

export default AssignmentRoute;