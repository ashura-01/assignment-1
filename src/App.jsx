import "./App.css";
import AppRoutes from "./routes/AssignmentRoute";

function App() {
  return (
    <div className="bg-blue-300 text-white min-h-screen flex flex-col">
      
        <main className="flex-1">
          <AppRoutes />
        </main>
      
    </div>
  );
}

export default App;