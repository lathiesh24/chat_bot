import "./App.css";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
function App() {
  const [prompt, setPrompt] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(undefined);

  useEffect(()=>{
     if (prompt != null && prompt.trim() ===""){
      setAnswer(undefined)
     }
 },[prompt])
  const sendPrompt = async (event) => {
    if (event.key !== "Enter") {
      return;
    }
    try {
      setLoading(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      };

      const res = await fetch("api/ask", requestOptions);
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
       console.log("response" , res)
      const {message}  = await res.json()
      setAnswer(message)
    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false)
    }
    console.log("prompt", prompt);
  };
  return (
    <div className="grid h-screen place-items-center bg-slate-400">
      <div className="grid border border-white shadow-lg w-1/2 h-1/2 bg-white">
        <div className="flex flex-row mt-2">
          <div>
            <SearchIcon
              style={{
                height: "32x",
                width: "32px",
                color: "#E7E6DD",
              }}
              className="mt-0.5 ml-1"
            />
          </div>
          <input
            type="text"
            placeholder="Ask me anything"
            className="flex w-full h-8 p-1 outline-none border-b border-gray-500"
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => sendPrompt(e)}
            disabled={loading}
          />
        </div>
        <div className="">{answer && <div> {answer}</div>}</div>
      </div>
    </div>
  );
}

export default App;
