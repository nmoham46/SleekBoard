import '@/styles/App.css'

import UserStories from '@/pages/UserStories'

import { Navigationbar } from '@/components/layout/navbar/Navbar'


function App() {
  return (
    <div>
      <Navigationbar />
      <UserStories />
    </div>
  )
}

export default App
