import React from 'react'
import PaymentPage from '@/components/PaymentPage'

const Username = async ({ params }) => {
  const { username } = await params
  return (
    <>
      <PaymentPage resParams={username} />
    </>
  )
}

export default Username

export async function generateMetadata({ params }) {
  const { username } = await params
  return {
    title: `${username} - GetMeACoke`,
  }
}
