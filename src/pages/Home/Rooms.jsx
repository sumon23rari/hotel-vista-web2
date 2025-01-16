import React, { useEffect, useState } from 'react';
import Container from '../../components/Shared/Container';
import Card from './Card';
import Heading from '../../components/Heading/Heading';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { getAllrooms } from '../../api/room';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
const Rooms = () => {
  const axiosPublic=useAxiosPublic()
  
  
    const [params,setParams]=useSearchParams();
    const category=params.get('category');
    const {data:rooms=[],isLoading}=useQuery({
      queryKey: ['rooms', category],
      queryFn: async () => {
        const { data } = await axiosPublic.get(`/rooms?category=${category}`)
  
        return data
      },
    })
console.log(category,rooms?.length,'category')

if (isLoading) {
  return <LoadingSpinner/>
}
    return (
        <Container>
        {rooms && rooms.length > 0 ? (
          <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {rooms.map(room => (
              <Card key={room._id} room={room} />
            ))}
          </div>
        ) : (
          <div className='flex items-center justify-center min-h-[calc(100vh-300px)]'>
            <Heading
              center={true}
              title='No Rooms Available In This Category!'
              subtitle='Please Select Other Categories.'
            />
          </div>
        )}
      </Container>
    );
};

export default Rooms;