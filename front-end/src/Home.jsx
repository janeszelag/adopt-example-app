
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { SearchIcon } from '@heroicons/react/solid'

export default function Home() {
    const [petData, setPetData] = useState([])
    const [value, setValue] = useState('')
    const [results, setResults] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/pets')
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response
            })
            .then(data => {
                setPetData(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            })
    }, [])

    const onChange = event => {
        setValue(event.target.value)
    }

    useEffect(() => {
        const searchFunction = (value) => {
            const results = petData.filter((pet) => {
                return pet.Species.toLowerCase().includes(value.toLowerCase())
                    || pet.Breed.toLowerCase().includes(value.toLowerCase())
                    || pet.Name.toLowerCase().includes(value.toLowerCase())
            })
            return results.map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
        }
        if (petData) {
            const searchResults = searchFunction(value)
            setResults(searchResults)
        }
    }, [petData, value])

    const catIcon = 'https://img.icons8.com/pastel-glyph/64/000000/cat--v3.png'
    const dogIcon = 'https://img.icons8.com/ios/50/000000/dog--v1.png'

    return (


        <div className='mt-10 flex flex-col gap-4'>
            <p className='mx-2 text-md font-semibold text-indigo-600 italic'>Help our pets in need and find your next family member today!</p>

            <div className='flex flex-col gap-4 items-center bg-white px-1.5 py-6 shadow-sm ring-2 ring-gray-900/5 rounded-xl'>
                {/* Search */}
                <div className='mx-8 my-4 w-3/6'>
                    <label htmlFor='search' className='sr-only text-md font-medium text-gray-700'>
                        Search our pets
                    </label>
                    <div className='relative flex items-stretch flex-grow focus-within:z-10'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <SearchIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                        </div>
                        <input
                            type='text'
                            name='search'
                            id='search'
                            value={value}
                            placeholder='Search our pets'
                            onChange={onChange}
                            className='shadow-sm focus:ring-indigo-600 focus:border-indigo-500 block w-full border-gray-300 pl-10 px-4 rounded-full'
                        />
                    </div>

                </div>
                <div className='mt-6 mx-12 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-4'>
                    {/* Results */}
                    {results.map((pet) => (
                        <Link key={pet.PetID} to={`/profile/${pet.PetID}`}>
                            <div className='group flex flex-col gap-1 items-center'>

                                <div className='flex gap-1 items-center'>
                                    <h3 className='text-2xl group-hover:text-indigo-600'>
                                        {pet.Name}
                                    </h3>
                                    <img
                                        className='w-5 h-5'
                                        alt='cat'
                                        src={pet.Species === 'Cat' ? catIcon : dogIcon}
                                    />
                                </div>
                                <p className='text-sm font-medium text-gray-900 group-hover:text-indigo-600'>
                                    {pet.Sex === 'M' ? 'Male, ' : 'Female, '}
                                    {pet.Breed}
                                </p>
                                <p className='text-sm font-medium text-gray-900 group-hover:text-indigo-600'>
                                    {pet.Age < 1 && `${Math.floor(pet.Age * 12)} months old`}
                                    {pet.Age >= 1 && `${pet.Age} years old`}
                                </p>
                                <div className='rounded-md overflow-hidden h-80 lg:aspect-none '>
                                    <img
                                        src={`${process.env.PUBLIC_URL}/assets/images/${pet.Image}`}
                                        alt={pet.Name}
                                        className='w-full h-full object-center object-cover lg:w-full lg:h-full group-hover:opacity-75'
                                    />
                                </div>

                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}
