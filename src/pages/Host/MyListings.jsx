import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../hooks/useAuth';

import RoomDataRow from '../../components/Dashboard/tableRow/RoomDataRow';
import {  useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
const MyListings = () => {
    const {user}=useAuth();
  const axiosSecure=useAxiosSecure();
  
    const {  data: rooms = [],
      isLoading,
      refetch,}=useQuery({
      queryKey: ['my-listings', user?.email],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/my-listings/${user?.email}`)
  
        return data
      },
    });
    if (isLoading) {
      return <LoadingSpinner/>
    }
    return (
        <>
        <Helmet>
          <title>My Listings</title>
        </Helmet>
    
  
        <div className='container mx-auto px-4 sm:px-8'>
          <div className='py-8'>
            <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
              <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                <table className='min-w-full leading-normal'>
                  <thead>
                    <tr>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Title
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Location
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Price
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        From
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        To
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Delete
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Update
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        rooms?.map((room,index)=><RoomDataRow 
                        room={room} 
                        refetch={refetch}
                        key={index}></RoomDataRow>)
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default MyListings;