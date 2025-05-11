import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [num,setNum] = useState(false)
  const [char,setChar] = useState(false)
  const [password,setPassword] = useState('')

  const passwordref = useRef(null)

  const passwordGenerator =  useCallback(()=>{
    let pass = ''
    let str = 'abcdefghijklmnoppqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if(num) str += '0123456789'
    if(char) str += '!@#$%^&*()_+|<>?/.,=-'

    for(let i=1 ; i<=length ; i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length,num,char])

  const copyPassword = useCallback(()=> {
    window.navigator.clipboard.writeText(password)
    passwordref.current?.select()
    //passwordref.current?.setSelectionRange(0,3)
  }, [password])

  useEffect(()=>{
    passwordGenerator()
  },[length,num,char,passwordGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input ref={passwordref} type='text' value={password} className='outline-none w-full py-1 px-3 bg-white' placeholder='Password' readOnly />
          <button onClick={copyPassword} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input className='cursor-pointer' type="range" min={8} max={50} value={length} onChange={(e)=> {setLength(e.target.value)}} />
            <label>Value : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={num} onChange={()=> { setNum((prev)=> !prev)}} />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={char} onChange={()=> { setChar((prev)=> !prev)}} />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
