import React from 'react'
import clsx from 'clsx'
import Header from './Components/Header'
import StatusBar from './Components/StatusBar'
import LanguageElements from './Components/LanguageElements'
import { languages } from './assets/languages'
import { wordRandomizer } from './assets/utils'
import Confetti from 'react-confetti'
import './App.css'

function App() {
  const [currentWord, setCurrentWord] = React.useState(() => wordRandomizer())
  const wordArray = currentWord.split('')

  const [guessedLetters, setGuessedLetters] = React.useState([])
  const [clickedKeys, setClickedKeys] = React.useState([])
  
  const wrongGuessCount = guessedLetters.filter(letter => !wordArray.includes(letter)).length
  
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

  const wordArrayEl = wordArray.map((letter, index) => {
    const classNames = clsx(
      'flex',
      'items-center',
      'justify-center',
      'uppercase',
      'bg-neutral-700',
      'text-xl',
      'w-12',
      'h-12',
      'mx-langEl',
      'font-semibold',
      'bottom-1',
      'border-stone-300',
      'border-b',
      {'text-white' : guessedLetters.includes(letter)},
      {'text-red-500' : isGameLost && !guessedLetters.includes(letter)}
  )
    return (
      <span 
          key={index}
          className={classNames}
      >
          {guessedLetters.includes(letter) || isGameLost ? letter : " "}
      </span>
    )

})

  const keyboard = 'abcdefghijklmnopqrstuvwxyz'
  const keys = keyboard.split('')

  const keyboardEl = keys.map((key, index) => {
    const isCorrect = wordArray.includes(key)
    const isClicked = clickedKeys.includes(key)
    return (
      <button
          key={index}
          onClick={() => addLetter(key)}
          disabled={isGameOver ||  isClicked}
          aria-disabled={isGameOver || isClicked}
          aria-label={`Letter ${key}`}
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
            {'bg-green-500' : isCorrect && isClicked},
            {'bg-wrongLetterBg' : !isCorrect && isClicked}
        )}
      >
          {key}
      </button>
    )
  })

  function newGame() {
    setCurrentWord(wordRandomizer())
    setGuessedLetters([])
    setClickedKeys([])
  }
  
  return (
    <>
      {isGameWon && <Confetti />}
      <Header />
      <StatusBar isGameWon={isGameWon} isGameLost={isGameLost} isGameOver={isGameOver} wrongGuessCount={wrongGuessCount}/>
      <LanguageElements wrongGuessCount={wrongGuessCount}/>
      <section className='flex justify-center my-8'>
          {wordArrayEl}
      </section>
      <section className='flex flex-wrap justify-center px-24 pt-6 xl:px-96 lg:px-64 md:px-48 sm:px-0'>
          {keyboardEl}
      </section>
      {isGameOver && <div className='flex justify-center items-center mt-8'>
        <button onClick={newGame} className='bg-cyan-500 px-10 py-2 rounded text-lg'>
          New Game
        </button>
      </div>}
    </>
  )
}

export default App
