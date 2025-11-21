import '@/styles/App.css'

import UserStories from '@/pages/UserStories'

import { Navigationbar } from '@/components/layout/navbar/Navbar'
import { ToastProvider } from '@/context/ToastContext'
import ToastContainer from '@/components/common/ToastContainer'


function App() {
  return (
    <ToastProvider>
      <div className='p-4'>
        <Navigationbar />
        <UserStories />
      </div>
      <ToastContainer />
    </ToastProvider>
  )
}

export default App
