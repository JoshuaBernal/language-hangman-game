import React from 'react'
import { languages } from '../assets/languages.js'

export default function LanguageElements(props) {
    // Map over the languages array to create a div for each language element.
    const langElements = languages.map((language,index) => {
        const isLangLost = index < props.wrongGuessCount
        return (
            <span
                className={`chip rounded-sm text-xs p-1 m-langEl font-semibold ${isLangLost && 'lost'}`}
                key={index}
                style={{
                    backgroundColor: language.backgroundColor,
                    color: language.color
                }}
            >
                <p>{language.name}</p>
            </span>
        )
    })
    
    return (
        <section className='flex items-center justify-center flex-wrap max-w-72 ml-auto mr-auto mt-8'>
            {langElements}
        </section>
    )
}