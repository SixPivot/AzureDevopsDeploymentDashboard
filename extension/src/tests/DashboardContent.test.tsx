import { render, screen } from '@testing-library/react'
import * as React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/jest-globals'
import { DashboardContent, DashboardContentProps } from '../dashboard/DashboardContent'
import { init as initTestData } from './testData'

let props: DashboardContentProps | undefined = undefined
beforeAll(async () => {
    const { environmentPipelines, projectInfo } = await initTestData()
    props = {
        environmentPipelines,
        isLoading: false,
        projectInfo,
    }

    console.log(props)
})

test('Render and check layout', async () => {
    render(<DashboardContent {...props!} />)

    await screen.findByRole('heading')

    expect(screen.getByRole('heading')).toHaveTextContent('Deployment Dashboard')

    await screen.findByRole('grid')
    expect(screen.getByRole('grid')).not.toBeUndefined()
})

// test('Check all pipelines are included', async () => {
//     render(<DashboardContent {...props!} />)

//     const rows = screen.getAllByRole('row')
//     expect(rows).toHaveLength(8) // includes header

//     const found = []
//     for (const row of rows.slice(1, 8)) {
//         const cells = await within(row!).findAllByRole('gridcell')
//         const maybePipeline = props!.environmentPipelines.find(async (x) => await within(cells[0]).findByText(x.name ?? ""))
//         if (maybePipeline) {
//             found.push(maybePipeline.name)
//         }
//     }
// })

// test('Check all environments are included', async () => {
//     render(<DashboardContent {...props!} />)
//     for (const env of props!.environmentPipelines) {
//         const column = screen.getByText(env.name!)
//         expect(column).toBeInTheDocument()
//     }
// })
