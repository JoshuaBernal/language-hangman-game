import React from 'react'

export default function Header() {
    return (
        <header className='flex items-center justify-center flex-col pt-16 mx-auto px-28'>
            <h1 className='text-headerText text-2xl font-semibold text-center'>Assembly: Endgame</h1>
            <p className='text-neutral-400 text-sm text-center'>
                Guess the word in under 8 attempts to keep the programming world safe from Assembly!
            </p>
        </header>
    )
}