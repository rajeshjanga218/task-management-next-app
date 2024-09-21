import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <p className="font-bold">
          <Link to={"/tasks"}>Tasks</Link>
        </p>
      </div>
    </div>
  );
}

export default Home;
