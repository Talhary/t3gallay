'use client'
import { useTheme } from "next-themes";
import { useRef, useState } from "react";
import Render from "~/actions/render";

export default function HomePage() {
  const [data, setData] = useState([]);
  // const [text, setText] = useState("");
  const [wait, setWait] = useState(false);
  const [inputvalue,setInputValue] = useState('')
  // const inputRef = useRef<HTMLInputElement>();

  const search = () => {
    if (inputvalue) {
      fetch('http://localhost:3000/api/v1/search/image?image=' + inputvalue.split(' ').join('+'))
        .then(res => res.json())
        .then(results => {
          setWait(false);
          setData(results.message.res);
          setInputValue(' ')
          // Clear input field after search
          
     });
    }
  };

  const handleTextChange = (e:any) => {
    setInputValue(e.currentTarget.value);
  };

  const { setTheme, resolvedTheme } = useTheme();

  return (
    <div className='dark:bg-gray-900 h-screen dark:text-white'>
      <div className="border flex p-3 gap-x-3 my-2 justify-between">
        <button className="border px-2 rounded-md " onClick={() => {
          if (resolvedTheme === 'light') setTheme('dark');
          else setTheme('light');
        }}>
          Toggle Theme
        </button>
        <div className="flex gap-x-2">
          <input onChangeCapture={(e)=>setInputValue(e.currentTarget.value)} value={inputvalue}  className="border rounded-md p-2" onChange={handleTextChange} placeholder="Type something..." />
          {inputvalue && <button onClick={search} className="border rounded-md px-2">Search</button>}
        </div>
      </div>
      <div className="flex flex-wrap justify-center dark:text-white">
        {inputvalue && !wait ? (
          data.map((el:any, index) => (
            <div key={index}>
              <img src={el.url} alt={`Image ${index}`} />
            </div>
          ))
        ) : (
          <p>Please type something or wait</p>
        )}
      </div>
    </div>
  );
}
