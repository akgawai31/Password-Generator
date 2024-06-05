import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [Lenght, setLenght] = useState(8);
  const [NumberAllowed, setNumberAllowed] = useState(false);
  const [CharacterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  //useRef hook
  const passwordRef = useRef(null)

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(NumberAllowed) str += "0123456789"
    if(CharacterAllowed) str += "!@#$%^&*?<>~+=-_"

    for(let i = 1; i <= Lenght; i++){
      let index = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(index);
    }
    setPassword(pass);

  }, 
    [Lenght, NumberAllowed, CharacterAllowed, setPassword])


    const copyPasswordToClipboard = useCallback(() => {
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0, 999);
      window.navigator.clipboard.writeText(password)
    }, [password])

  useEffect(()=>{
    PasswordGenerator();
  }, [Lenght, NumberAllowed, CharacterAllowed, PasswordGenerator])

  return (
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg
              px-4 py-3 my-8 text-orange-600 bg-gray-800'>
                <h1 className='text-white text-center my-3'>Password Generator</h1>
              <div className='flex shadow rounded-lg overflow-hidden mb-4'>
                <input 
                  type="text" 
                  className='outline-none w-full py-1 px-3'
                  value={password}
                  placeholder='Password'
                  readOnly
                  ref={passwordRef}
                />
                <button
                onClick={copyPasswordToClipboard}
                className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
              </div>
              <div className='flex text-sm gap-x-2'>
                  <div className='flex items-center gap-x-1'>
                    <input 
                    type="range" 
                    min={8}
                    max={30}
                    value={Lenght}
                    className='cursor-pointer'
                    onChange={(e) => {setLenght(e.target.value)}}
                    />
                    <label>Lenght : {Lenght}</label>
                  </div>
                  <div className='flex items-center gap-x-1'>
                    <input 
                    type="checkbox"
                    defaultChecked = {NumberAllowed}
                    id='numberInput'
                    onChange={()=>{setNumberAllowed((prev) => !prev)}}
                    />
                    <label>Number</label>
                  </div>
                  <div className='flex items-center gap-x-1'>
                    <input 
                    type="checkbox"
                    defaultChecked = {CharacterAllowed}
                    id='characterInput'
                    onChange={()=>{setCharacterAllowed((prev) => !prev)}}
                    />
                    <label>Character</label>
                  </div>
              </div>
      </div>
  )
}

export default App
