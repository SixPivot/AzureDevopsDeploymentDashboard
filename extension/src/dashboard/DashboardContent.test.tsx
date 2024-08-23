import { render, screen, within } from '@testing-library/react'
import * as React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/jest-globals'
import { data } from './DashboardContent.test.data'
import { DashboardContent, DashboardContentProps } from './DashboardContent'

test('Render and check layout', async () => {
    render(<DashboardContent {...(data as unknown as DashboardContentProps)} />)

    await screen.findByRole('heading')

    expect(screen.getByRole('heading')).toHaveTextContent('Deployment Dashboard')

    await screen.findByRole('grid')
    expect(screen.getByRole('grid')).not.toBeUndefined()
})

test('Check all pipelines are included', async () => {
    render(<DashboardContent {...(data as unknown as DashboardContentProps)} />)

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(8) // includes header

    const found = []
    for (const row of rows.slice(1, 8)) {
        const cells = await within(row!).findAllByRole('gridcell')
        const maybePipeline = data.pipelines.find(async (x) => await within(cells[0]).findByText(x.name))
        if (maybePipeline) {
            found.push(maybePipeline.name)
        }
    }
})

test('Check all environments are included', async () => {
    render(<DashboardContent {...(data as unknown as DashboardContentProps)} />)
    for (const env of data.environments) {
        const column = screen.getByText(env.name)
        expect(column).toBeInTheDocument()
    }
})
