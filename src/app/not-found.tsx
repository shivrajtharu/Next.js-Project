import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <>
        <div className='flex flex-col items-center justify-center min-h-[70vh] text-center px-4'>
            <h1 className='text-6xl font-extrabold mb-4'>404</h1>
            <h2 className='text-2xl font-semibold mb-6'>Page Not Found!</h2>
            <p className='text-muted-foreground mb-8 max-w-md'>
                The Page You are Looking doesn't exists or has been moved
            </p>
            <Button asChild>
               <Link href={'/'}>Go to Home </Link>
            </Button>
        </div>
    </>
  )
}

export default NotFound
