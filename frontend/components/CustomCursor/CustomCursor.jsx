import { useEffect, useState } from 'react'
import { motion } from 'motion/react';

const CustomCursor = () => {
    const [cursorPosition, setCursorPosition] = useState({
        x: 0,
        y: 0
    });
    const [cursortype , Setcursortype] = useState("default");

    useEffect(() => {
        function handlemousemove(e) {
            if (e.target.closest('.cursor_pointer, .cursor-pointer, a, button')){
                Setcursortype("pointer")
            }
            else{
                Setcursortype("default")
            }
            setCursorPosition({ x: e.clientX, y: e.clientY })
        }     

        window.addEventListener('mousemove', handlemousemove);
        
        return () => {
            window.removeEventListener('mousemove', handlemousemove);
        }
    }, [])


  return (
    cursortype == "default" ?  <motion.div
      aria-hidden="true"
      animate={{ x: cursorPosition.x - 12, y: cursorPosition.y - 12 }}
      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
      className='pointer-events-none shadow-[0_0_50px_20px_rgba(99,102,241,0.6)] fixed top-0 left-0 z-100 h-6 w-6 rounded-full bg-amber-50'
    /> : <motion.div
      aria-hidden="true"
      animate={{ x: cursorPosition.x - 12, y: cursorPosition.y - 12 }}
      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
      className='pointer-events-none shadow-[0_0_50px_20px_rgba(99,102,241,0.6)] flex justify-center items-center fixed top-0 left-0 z-100 h-10 w-10 border-2
      border-amber-50 bg-transparent rounded-full'
    >
        <div className='w-2 h-2 bg-amber-50 rounded-full'></div>
    </motion.div>
  )
}

export default CustomCursor