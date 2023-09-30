import React from 'react'
import Homebanner from '../../assets/assets/160780265-692d37ac-7209-4d53-957a-e94b37d123c0-2.png'
import './HomePage.css'
import Items from '../ItemsGrid/ItemsGrid'

import HomeBottombanner from '../../assets/assets/160780701-7bb38a57-76bd-49a2-a4ec-49f89c50a7c7-2.png'




export default function HomePage() {
  return (
    <div>
        <div>
        <img src={Homebanner} className="homebanner" alt="logo" />
        </div>
        <div className='titleHomePage'>
          <h3>Best Seller Products</h3>
          <p>Speaker There are many variations passages</p>
        </div>
        <div>
          <Items/>
        </div>
        <div>
        <img src={HomeBottombanner} className="homebanner" alt="logo" />
        </div>
    </div>
  )
}
