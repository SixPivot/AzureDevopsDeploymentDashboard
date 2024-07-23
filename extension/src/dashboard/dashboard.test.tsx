import { render } from '@testing-library/react'
import * as React from 'react'
import '@testing-library/jest-dom'
import { Dashboard } from './dashboard'

jest.mock('azure-devops-extension-sdk', () => {
    return {
        init: () => {},
    }
})

test('check basic test', async () => {
    render(<Dashboard />)
})

test('check basic test', async () => {
    expect(1+1).toBe(2)
})
