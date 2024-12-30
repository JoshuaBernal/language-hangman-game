import React from 'react'
import clsx from 'clsx'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Header from './Components/Header'
import StatusBar from './Components/StatusBar'
import LanguageElements from './Components/LanguageElements'
import { languages } from './assets/languages'
import './App.css'

function App() {
  const [currentWord, setCurrentWord] = React.useState("react")
  const wordArray = currentWord.split('')

  const [guessedLetters, setGuessedLetters] = React.useState([])
  const [clickedKeys, setClickedKeys] = React.useState([])
  
  const wrongGuessCount = guessedLetters.filter(letter => !wordArray.includes(letter)).length
  console.log(languages[wrongGuessCount].name)
  
  const isGameWon = wordArray.every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount > languages.length - 2
  const isGameOver = isGameWon || isGameLost

  function addLetter(letter) {
    setClickedKeys(prevClickedKeys => 
      prevClickedKeys.includes(letter) ? prevClickedKeys : [...prevClickedKeys, letter]
    )
    setGuessedLetters(prevLetters => 
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    )
  }

  const wordArrayEl = wordArray.map((letter, index) => (
    <span 
        key={index}
        className='flex items-center justify-center text-white uppercase bg-neutral-700 text-xl w-12 h-12 mx-langEl font-semibold bottom-1 border-stone-300 border-b'
    >
        {guessedLetters.includes(letter) ? letter : " "}
    </span>
))

  const keyboard = 'abcdefghijklmnopqrstuvwxyz'
  const keys = keyboard.split('')

  const keyboardEl = keys.map((key, index) => {
    const isCorrect = wordArray.includes(key)
    const isClicked = clickedKeys.includes(key)
    return (
      <button
          key={index}
          onClick={() => addLetter(key)}
          className={clsx(
            'bg-amber-400',
            'border',
            'text-lg',
            'border-gray-300',
            'rounded',
            'w-12',
            'h-12',
            'uppercase',
            'm-1',
            'font-semibold',
            'text-stone-800',
            {'bg-green-500 disabled' : isCorrect && isClicked},
            {'bg-wrongLetterBg disabled' : !isCorrect && isClicked},
            {'disabled' : isGameOver}
        )}
      >
          {key}
      </button>
  )
})
  
  return (
    <>
      <Header />
      <StatusBar isGameWon={isGameWon} isGameLost={isGameLost} isGameOver={isGameOver} wrongGuessCount={wrongGuessCount}/>
      <LanguageElements wrongGuessCount={wrongGuessCount}/>
      <section className='flex justify-center my-8'>
          {wordArrayEl}
      </section>
      <section className='flex flex-wrap justify-center px-24 pt-6'>
          {keyboardEl}
      </section>
      {isGameOver && <div className='flex justify-center items-center mt-8'>
        <button className='bg-cyan-500 px-10 py-2 rounded text-lg'>
          New Game
        </button>
      </div>}
    </>
  )
}

export default App
