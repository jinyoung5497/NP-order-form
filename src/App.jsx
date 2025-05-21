import { useState } from "react";

function App() {
  return (
    <>
      <div className="flex flex-col">
        <div className="text-3xl font-semibold items-center justify-center">
          Order request form
        </div>
        <div>
          <div>First Name</div>
          <input type="text" className="border-[1px] border-black rounded-md" />
          <div>Last Name</div>
          <input type="text" className="border-[1px] border-black rounded-md" />
        </div>
      </div>
    </>
  );
}

export default App;
