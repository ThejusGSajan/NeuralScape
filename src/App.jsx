import { useState } from 'react';
//import reactLogo from './assets/react.svg'
import { Configuration, OpenAIApi } from "openai";
import './App.css';

function App() {
  //console.log(import.meta.env.VITE_Open_AI_Key);
  const config = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(config);

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const imageGen = async () => {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    //console.log(response.data.data[0].url)
    setResult(response.data.data[0].url);
  }

  return (
    <div className='main'>
      <h3>Generate an Image using OpenAI API</h3>
      <input 
        className='input'
        placeholder='Enter your wildest imaginations...'
        onChange={(e) => setPrompt(e.target.value)}></input>
      <button onClick={imageGen}>Generate</button>
      
      {result.length > 0 ? <img className='result' src={result} alt="result"/> : <></>}
    </div>
  );
}

export default App;
