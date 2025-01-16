import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { Fragment, useState } from 'react'
import UpdateRoomForm from '../../Form/UpdateRoomForm';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import {imageUpload }from '../../../api/utilitis';
import toast from 'react-hot-toast';
const UpdateRoomModal = ({isOpen,setIsEditModalOpen,room,refetch }) => {
  console.log(room,'dekod updateRoomModal')
  const axiosSecure=useAxiosSecure();
  const [loading,setLoading]=useState(false);
  const [roomData,setRoomData]=useState(room);
  const [dates, setDates] = useState({
    startDate: new Date(room?.from),
    endDate: new Date(room?.to),
    key: 'selection',
  })
   //Date range handler
   const handleDates = item => {
    setDates(item.selection)
    setRoomData({
      ...roomData,
      to: item.selection.endDate,
      from: item.selection.startDate,
    })
  };
  // handle Image Update
  //   handle Image update
  const handleImage = async image => {
    setLoading(true)
    try {
      // upload image
      const image_url = await imageUpload(image)
      console.log(image_url)
      setRoomData({ ...roomData, image: image_url })
      
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
      toast.error(err.message)
    }
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
const updateRoomData= Object.assign({},roomData)
 delete updateRoomData._id;
console.log(updateRoomData,'updateRoomData')
try {
const {data}=await axiosSecure.patch(`/room/update/${room._id}`,updateRoomData) 
console.log(data,'dataInsert')
refetch();
setLoading(false)
setIsEditModalOpen(false)
if (modifiedCount>0) {
  toast.success('room update successfully')  
}

} catch (error) {
  console.log(error?.message) 
}
  }
  const passValueForm=[loading,handleDates,dates,roomData,setRoomData,handleSubmit,handleImage]
  return (
    <Transition appear show={isOpen} as={Fragment}>
    <Dialog
      as='div'
      className='relative z-10'
      onClose={() => setIsEditModalOpen(false)}
    >
      <TransitionChild
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='fixed inset-0 bg-black bg-opacity-25' />
      </TransitionChild>

      <div className='fixed inset-0 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center'>
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
              <DialogTitle
                as='h3'
                className='text-lg font-medium text-center leading-6 text-gray-900'
              >
                Update Room Info
              </DialogTitle>
              <div className='mt-2 w-full'>
                {/* Update room form */}
                <UpdateRoomForm
                 passValueForm={passValueForm}
                />
              </div>
              <hr className='mt-8 ' />
              <div className='mt-2 '>
                <button
                  type='button'
                  className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </Transition>

  )
}

export default UpdateRoomModal;