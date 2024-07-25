import { render, screen } from '@testing-library/react'
import * as React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/jest-globals'
import { MainContent, MainContentProps } from './main-content'
import { data } from './data.js'

test('Render and check layout', async () => {
    render(<MainContent {...(data as unknown as MainContentProps)} />)

    await screen.findByRole('heading')

    expect(screen.getByRole('heading')).toHaveTextContent('Deployment Dashboard')

    await screen.findByRole('grid')
})
