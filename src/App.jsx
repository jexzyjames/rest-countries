import React from 'react'
import { useEffect, useState } from 'react';
import countryData from './data'
import './App.css' 
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css' ; 
import { div } from 'framer-motion/client';
function App() {

  const [dark, setDark]= useState(true);
  const [loading, setLoading] = useState(false)
  const[ query, setQuery] = useState('')
  const[region, setRegion] = useState('Filter by Region')
  const [countries, setCountries] = useState([])
 const [error, setError] = useState(null);
  const filtered = countries?.filter(c => {
    const results = c.name.toLowerCase().includes(query.toLowerCase());
    const matchRegion = region === 'Filter by Region' ||  c.region === region;
    return results && matchRegion;
    
    
   })

 
    useEffect(()=>{},[dark ])

   const regions = ['Filter by Region', ...new Set(countries.map(c => c.region))]
   const BASE_URL =  'https://jexzyjames.github.io/json-api/countries.json';
useEffect(() => {
   const controller = new AbortController();
    const { signal } = controller;

    const fetchCountries = async () => {
      setLoading(true)
      try {
        const response = await fetch(BASE_URL, { signal });
      setLoading(true)
        // Check if the HTTP status code is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCountries(data);
        setLoading(false);
        setError(null);
      } catch (err) {
        // Prevent throwing errors if the fetch request was intentionally aborted
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();

    // 3. Cleanup function runs if component unmounts or URL changes
    return () => {
      controller.abort();
    };

  }, [BASE_URL]);

  if (error) return <p>Error loading countries: {error}</p>;

  return (
  <>
  <div className={` dark:fade    bg-white dark:bg-[hsl(207_26%_17%)]! min-h-screen  dark:text-gray-100 border-gray-700`}>
    <nav className={ ` dark:bg-[hsl(209_23%_22%)]    dark:text-white flex px-5  md:px-35 shadow-lg py-4 justify-between`}>
      <h1 className='text-xl  font-normal' >Where in the world?</h1>
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
            return;
            }} className={`  cursor-pointer dark:bg-[hsl(209_23%_22%)] dark:shadow-gray-100! p-3 shadow-slate-900  shadow-sm px-4`}>{dark ? ' \u2B50  ' : ' \u{1F319}  '}</span>
      </div>
    </nav>
    <div className={`  grid grid-cols-2 gap-7 lg:gap-7 justify-between  md:mx-12 my-9 px-4 py-3 `}>
      <input className=' p-4 rounded-md dark:text-white dark:opacity-100 lg:w-[65%] dark:font-bold dark:shadow-blue-100! shadow-lg shadow-gray-200 dark:shadow-sm! cursor-pointer placeholder:text-sm placeholder:font-bold  font-mono opacity-95' value={query} onChange={(e) => setQuery(e.target.value.trim())} type="search" placeholder='Search for a country...' name="search" id="search" />
    
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
    <div className=" md:mx-20  mx-7   grid sm:grid-cols-1  md:grid-cols-2 justify-between lg:grid-cols-4 gap-5">
      {filtered.map((id)=>{
        return(
          <div className='mb-10' key={id.name}>
            {loading && Array(12).fill(0).map((_,index)=> {
              return(
              <div className=" md:mx-20  mx-7   grid sm:grid-cols-1  md:grid-cols-1 justify-between lg:grid-cols-3 gap-5">
                <Skeleton height={160} className='h-40 w- 80 lg:w-120'  />
                <div className=' mb-3  '>

                <Skeleton width='100%' height={24} /> 
                <Skeleton width='100%' height={24} /> 
                <Skeleton width='100%' height={24} /> 
                <Skeleton width='100%' height={24} /> 
                </div>
              </div>
              )
            })}
            <img className={ ` lg:w-80 ${id.flags.png  && ' w-full h-50'} shadow-md dark:shadow-blue-100  w-full lg:h-40`} src={id.flags.png} alt={id.name} />
          
            <div className={`px-4 dark:shadow-blue-100! dark:shadow-sm!  w-full lg:w-80 my-[-1px] py-6 shadow-md`}>
            <h1 className='font-bold '>{id.name}</h1>
            <h1 className='text-sm font-bold'>Population: <span className='font-normal '>{id.population.toLocaleString()}</span></h1>
            <h1 className='text-sm font-bold'>Capital:  <span className='font-normal'>{id.capital}</span></h1>
            <h1 className='text-sm font-bold'>Region:   <span className='font-normal'>{id.region}</span></h1>
            <h1 className='text-sm font-bold'>Language:   <span className='font-normal'>{id.languages[0].name}</span></h1>



            </div>
          </div>
        )
      })}
      { loading || filtered ===  ''  && (

        <div className='text-slate-900 p-4 dark:text-gray-100! dark:shadow-blue-200 dark:shadow-sm!   shadow-md '> <b className=' uppercase'>{query}</b> not found try another region </div>
       
      
      )}

    </div>
     
  {

  }
  </div>
  </>
  )
}

export default App
