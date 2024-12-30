import React from 'react'
import { getFarewellText } from '../assets/utils'
import { languages } from '../assets/languages'

export default function StatusBar(props) {
    const prevRefArray = React.useRef()

    React.useEffect(() => {
        prevRefArray.current = props.wrongGuessCount
    })

    console.log(prevRefArray.current)
    console.log(props.wrongGuessCount)

    if (props.isGameWon) {
        return (
            <section className='bg-green-600 text-headerText py-1 my-6 flex items-center justify-center flex-col max-w-80 ml-auto mr-auto rounded'>
                <h1 className='text-lg'>You win!</h1>
                <h2 className='text-sm'>Well done! 🎉</h2>
            </section>
        )
    }
    else if (props.isGameLost) {
        return (
            <section className='bg-red-600 text-headerText py-1 my-6 flex items-center justify-center flex-col max-w-80 ml-auto mr-auto rounded'>
                <h1 className='text-lg'>Game Over!</h1>
                <h2 className='text-sm'>Better start learning Assembly ☠️</h2>
            </section>
        )
    } 
    else if (!props.isGameOver && props.wrongGuessCount > 0 && props.wrongGuessCount != prevRefArray.current) {
        return (
            <section className='bg-violet-400 text-headerText py-3 my-6 flex items-center justify-center flex-col max-w-80 ml-auto mr-auto rounded'>
                <h1 className='text-lg'>{getFarewellText(languages[props.wrongGuessCount - 1].name)}</h1>
            </section>
        )
    }
    else {
        return (
            <section className='py-1 my-6 flex items-center justify-center flex-col max-w-80 ml-auto mr-auto opacity-0'>
                <h1 className='text-lg'>Game Ongoing</h1>
                <h2 className='text-sm'>Good luck!</h2>
            </section>
        )
    }
    
}