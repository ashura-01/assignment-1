import { Routes, Route } from "react-router-dom";
import FeedBack from "../pages/feedback";

const AssignmentRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<FeedBack />} />
    </Routes>
  );
};

export default AssignmentRoute;