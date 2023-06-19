import { useState } from "react";
import AccountForm from "./components/account/AccountForm";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AccountForm />
    </>
  );
}

export default App;
