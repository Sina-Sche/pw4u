import { useState } from "react";
import getPasswordbyName from "./api/passwords";
import "./App.css";
import useAsync from "./hooks/useAsync";

function App() {
  const [inputValue, setInputValue] = useState("");

  const { data, loading, error, doFetch } = useAsync(() =>
    getPasswordbyName(inputValue)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    doFetch();
    setInputValue("");
  };

  return (
    <div className="App">
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      <p>My passwords</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Which password do you want to lookup?"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          required
        />
      </form>
      <div>{data}</div>
    </div>
  );
}

export default App;
