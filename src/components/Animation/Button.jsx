import React from 'react'

function Button({
     title,
     id,
     rightIcon,
     leftIcon,
     containerClass,
     onClick
    }) {
  return (
    <button 
      id={id} 
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
      onClick={onClick}
    >
        {leftIcon}
          <span className='relative incline-flex inline-flex overflow-hidden font-general text-xs uppercase'>
              <div>
                {title}
              </div>
          </span>
          {rightIcon}
    </button>
  )
}

export default Button