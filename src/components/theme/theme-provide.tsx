'use client'

import React from 'react'
import { ThemeProvider as NextThemeProvider, ThemeProviderProps } from 'next-themes'
import Header from '../layout/header'
import { cn } from '@/lib/utils'

interface ExtendedThemeProviderProps extends ThemeProviderProps{
    containerClassName?: string
}

const ThemeProvider = ({children, containerClassName, ...props}: ExtendedThemeProviderProps) => {
  return (
    <NextThemeProvider {...props}>
        <Header />
        <main className={cn('container mx-auto px-4', containerClassName)}>{children}</main>
    </NextThemeProvider>
  )
}

export default ThemeProvider;
