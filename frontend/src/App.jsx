import '@/styles/App.css'

import UserStories from '@/pages/UserStories'

import { Navigationbar } from '@/components/layout/navbar/Navbar'


function App() {
  return (
    <div className='p-4'>
      <Navigationbar />
      <UserStories />
    </div>
  )
}

export default App
