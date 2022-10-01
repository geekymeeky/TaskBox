import React from 'react'
import Card from '../components/Card'
import createIcon from './Create.svg'
import submitIcon from './Submit.svg'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        placeItems: 'center',
        height: '100vh',
      }}
    >
      <Link to="/create" style={{ textDecoration: 'none' }}>
        <Card title={'Create'} icon={createIcon} />
      </Link>
      <Link to="/submit" style={{ textDecoration: 'none' }}>
        <Card title={'Submit'} icon={submitIcon} />
      </Link>
    </div>
  )
}

export default Home
