import React from 'react'
import { Sidebar } from '../../features/admin/components/Sidebar'
import { Outlet } from 'react-router-dom'

export const AdminLayout = () => {
  return (
    <>
<div className='flex min-h-screen bg-gray-200'>
  <Sidebar/>
  <main className='flex-1 bg-gray-400 p-4'>
    <Outlet/>

  </main>

</div>
    </>
  )
}
