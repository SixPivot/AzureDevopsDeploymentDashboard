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
    expect(screen.getByRole('grid')).not.toBeUndefined()
})

test('Check all pipelines are included', async () => {
    render(<MainContent {...(data as unknown as MainContentProps)} />)

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(8) // includes header

    for (const pipeline of data.pipelines.value) {
        const row = screen.getByText(pipeline.name)
        expect(row).toBeInTheDocument()
    }
})

test('Check all environments are included', async () => {
    render(<MainContent {...(data as unknown as MainContentProps)} />)
    for (const env of data.environments) {
        const column = screen.getByText(env.name)
        expect(column).toBeInTheDocument()
    }
})
