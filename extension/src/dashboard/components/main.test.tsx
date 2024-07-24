import { render, screen } from '@testing-library/react'
import * as React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/jest-globals'
import { MainContent } from './main-content'
import state from './state.json'
import { IDashboardContentState } from './IDashboardContentState'

test('Render and check layout', async () => {
    render(
        <MainContent
            state={state as unknown as IDashboardContentState}
        />
    )

    await screen.findByRole('heading')

    expect(screen.getByRole('heading')).toHaveTextContent('Deployment Dashboard')
})