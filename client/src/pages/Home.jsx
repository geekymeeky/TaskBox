import React from 'react'
import Card from '../components/Card'
import createIcon from './Create.svg'
import submitIcon from './Submit.svg'

const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        gap: '2rem',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card title={'Create'} icon={createIcon} />
      <Card title={'Submit'} icon={submitIcon} />
    </div>
  )
}

export default Home
