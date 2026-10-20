import { useEffect, useState } from 'react'
import figlet from 'figlet'
import standard from 'figlet/fonts/Standard'
import { motion, spring } from 'framer-motion'

figlet.parseFont('Standard', standard)

const Content = () => {
  const [name, setName] = useState('');
  const [isloaded , Setisloaded] = useState(false);

  useEffect(()=>{
    if(document.readyState == "complete"){
      Setisloaded(true)
    }
    else{
      const handleload = () =>{
        Setisloaded(true)
      }
      window.addEventListener("load", handleload)

      return () => window.removeEventListener("load" , handleload);
    }
  },[])

  useEffect(() => {
    figlet.text('Ad i t y a').then(setName).catch(console.error)
  }, [])

  function Screen(){
    return
  }

  return (
    <div className='relative h-svh w-[60%] flex flex-col justify-center gap-2 '>
        <div className='w-1/2 h-fit p-2 rounded-lg bg-cyan-600 ml-6'>
        <span className='text-lg text-amber-50'> &gt; </span>
          <span className='text-lg text-amber-50'>$This_is</span>
        </div>
        <pre className='whitespace-pre font-mono text-3xl text-amber-50'>{name}</pre>
        <br></br>
        <motion.span initial={{opacity : 0 , y: 30, scale: 0.8 }} animate={isloaded ? {opacity : 1 , y: 0, scale: 1} : {opacity : 0}} transition={{type:"spring" , stiffness : 100 , damping : 15 , mass : 1.2 ,  delay : 1, opacity : {type : "tween" , duration : 2}}} className='text-lg ml-6 text-amber-50'> &gt; Full-stack developer building reliable digital products for businesses and startups.</motion.span>
        {Screen()}
    </div>
  )

}


export default Content