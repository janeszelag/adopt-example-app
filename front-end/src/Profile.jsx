import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/outline'

export default function Profile() {
    const { id } = useParams()
    const [petProfile, setPetProfile] = useState([])
    const catIcon = 'https://img.icons8.com/pastel-glyph/64/000000/cat--v3.png'
    const dogIcon = 'https://img.icons8.com/ios/50/000000/dog--v1.png'

    useEffect(() => {
        fetch(`http://localhost:3000/pets/${id}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response
            })
            .then(data => {
                setPetProfile(data[0])
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            })
    }, [id])

    const onClick = () => alert('Thank you!!!')

    return (
        <div className='mx-8 mt-8'>

            <div className='flex items-center group'>
                <ChevronLeftIcon className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
                <Link to='/'>
                    <p className='text-lg text-gray-600 hover:text-indigo-600 hover:underline hover:decoration-indigo-600'>Back to search</p>
                </Link>
            </div>

            <div className='mt-10'>
                <div className='space-y-6 grid grid-cols-1 md:grid-cols-3 items-start gap-6 space-y-0'>
                    <div className='aspect-w-2 aspect-h-1'>
                        <img className='object-cover shadow-lg rounded-lg' src={`${process.env.PUBLIC_URL}/assets/images/${petProfile.Image}`} alt={petProfile.Name} />

                    </div>
                    <div className='sm:col-span-2'>
                        <div className='space-y-4'>
                            <div className='leading-6 font-medium space-y-1'>
                                <div className='flex gap-1 items-center'>
                                    <h3 className='text-2xl'>{petProfile.Name}</h3>
                                    <img
                                        className='w-6 h-6'
                                        alt='cat'
                                        src={petProfile.Species === 'Cat' ? catIcon : dogIcon}
                                    />
                                </div>

                                <div>
                                    <p className='text-lg text-indigo-600'>{petProfile.Breed}</p>
                                    <p className='text-md text-gray-500'>
                                    {petProfile.Sex === 'M' ? 'Male, ' : 'Female,'} {petProfile.Size}
                                    </p>
                                    <p className='text-md text-gray-500'>{petProfile.Colour}</p>
                                    <p className='text-md text-gray-500'>
                                        {petProfile.Age < 1 && `${Math.floor(petProfile.Age * 12)} months old`}
                                        {petProfile.Age >= 1 && `${petProfile.Age} years old`}
                                    </p>
                                </div>
                            </div>

                            <div className='text-md'>
                                <p className='text-gray-500'>{petProfile.Description}</p>
                            </div>
                            <button
                                type='button'
                                className='inline-flex items-center px-5 py-2.5 border border-transparent text-lg font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                onClick={onClick}
                            >
                                {`Adopt ${petProfile.Name}`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
