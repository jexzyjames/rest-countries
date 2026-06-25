import React from 'react'
import { useEffect, useState } from 'react';
import countries from './data'
import './App.css' 
function App() {

  const [dark, setDark]= useState(true);
  const[ data, setData] = useState('')
  const[region, setRegion] = useState('All')

  useEffect(()=>{},[dark])
  const filtered = countries.filter(c => {
     const results = c.name.toLowerCase().includes(data.toLowerCase());
     const matchRegion = region === 'Filter by Region' ||  c.region === region;
     return results && matchRegion;
     

   })

   const regions = ['Filter by Region', ...new Set(countries.map(c => c.region))]
// useEffect(()=>{
//     fetch('/data.json')
//     .then(res => {
//       if(!res.ok) throw new Error('Failed to fetch')
//         return res.json;
//     })
//     .then(data => {
//       setData(data)
//     })
//     console.log(data)


//   },[])  
  return (
  <>
  <div className={`  bg-white dark:bg-[hsl(207_26%_17%)]! min-h-screen dark:text-gray-100 border-gray-700`}>
    <nav className={ ` dark:bg-[hsl(209_23%_22%)]    dark:text-white flex px-5  md:px-35 shadow-lg py-4 justify-between`}>
      <h1 className='text-xl  font-bold' >Where in the world?</h1>
      <div>
        {/* <img src="" alt="dark-icon" /> */}
        <span onClick={(e)=> {
          //  setMode(!mode);
          setDark((prev) => !prev )
          if(dark === true){
            // setDark(true)
            document.documentElement.classList.add('dark')
          }
          else{
            // setDark(false)

            document.documentElement.classList.remove('dark')

          }
            // setdark('Light')
            // setdark((prev) => !prev )
            console.log(document.documentElement.classList)
            return;
            }} className={`  cursor-pointer dark:bg-[hsl(209_23%_22%)] dark:shadow-amber-100 p-3  shadow-sm px-4`}>{dark ? ' \u2B50 Light ' : ' \u{1F319}  Dark '}</span>
      </div>
    </nav>
    <div className={`  grid grid-cols-2 gap-7 lg:gap-7 justify-between w  md:mx-9 my-9 px-4 py-3 `}>
      <input className=' p-4 rounded-md dark:text-white dark:opacity-100 lg:w-[65%] dark:font-bold dark:shadow-blue-100! shadow-lg shadow-gray-200 dark:shadow-sm! cursor-pointer placeholder:text-sm placeholder:font-bold  font-mono opacity-95' onChange={(e) => setData(e.target.value)} type="search" placeholder='Search for a country...' name="search" id="search" />
    
    <select value={region} className={` dark:text-lg  md:w-full lg:w-[45%] dark:shadow-blue-100! dark:shadow-sm!   mx-auto shadow-md md:px-5 px-2 md:text-md text-[14px] cursor-pointer`} onChange={(e) => {
      setRegion(e.target.value)
    }} name="" id="">
      {regions.map(c => {
        return (
          <option className=' dark:text-gray-100 dark:bg-slate-950 cursor-pointer' key={c} value={c}>{c}</option>
        )
      })}
    </select>
    </div>
    <div className="mx-14 grid sm:grid-cols-1  md:grid-cols-2 justify-between lg:grid-cols-4 gap-5">
      {filtered.map((id)=>{
        return(
          <div className='' key={id.name}>
            <img className='lg:w-60 w-full h-40' src={id.flag} alt="" />
            <div className={`px-4 dark:shadow-blue-100! dark:shadow-sm!  w-full lg:w-60 my-[-1px] py-6 shadow-md`}>
            <h1 className='font-bold '>{id.name}</h1>
            <h1 className='text-sm font-bold'> Population: <span className='font-normal '>{id.population.toLocaleString()}</span></h1>
            <h1 className='text-sm font-bold'>Capital:  <span className='font-normal'>{id.capital}</span></h1>
            <h1 className='text-sm font-bold'>Region:   <span className='font-normal'>{id.region}</span></h1>


            </div>
          </div>
        )
      })}

    </div>
     
  {

  }
  </div>
  </>
  )
}

export default App
