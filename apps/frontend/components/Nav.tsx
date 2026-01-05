import React from 'react'
import { ThemeToggleButton } from './ThemeToggle'

function Nav() {
  return (
     <div className="w-full fixed px-10 py-3 flex justify-between items-center">
                <h1>Relio</h1>
                <div className="flex gap-2 items-center justify-center">
                    <ThemeToggleButton variant="rectangle" start="top-down" />
                    <div className="px-3 py-1 bg-accent rounded-full">A</div>
                </div>
    </div>
  )
}

export default Nav