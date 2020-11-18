import { useState } from "react";
import getPasswordbyName from "./api/passwords";
import "./App.css";

function App() {
  const [password, setPassword] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const doFetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const newPassword = await getPasswordbyName(inputValue);
      setPassword(newPassword);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

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
      <div>{password}</div>
    </div>
  );
}

export default App;
