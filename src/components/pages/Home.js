import React from 'react'
import '../../App.css'
import SideNav from '../auth/SideNav'

function Home () {
  return (
    <>
      <SideNav className='home-left-sidebar' />
      <div className='home-container'>
        <div className='home-main-content'>

          <div className='home-text-div'>
            <span>Stay up to date with Trello...</span>
          </div>
          <div className='background-image-div' />
        </div>
        <div className='home-right-sidebar'>
          <strong>Recently Viewed...</strong>
        </div>
      </div>
    </>
  )
}
export default Home
