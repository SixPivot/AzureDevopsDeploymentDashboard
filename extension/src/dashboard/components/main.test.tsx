import { render } from '@testing-library/react'
import * as React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/jest-globals'
import { Main } from './main'

jest.mock('azure-devops-extension-sdk', () => {
    return {
        init: () => {},
        getService() {},
    }
})
jest.mock('azure-devops-extension-api', () => {})
jest.mock('azure-devops-extension-api/Pipelines/PipelinesClient', () => {})
jest.mock('azure-devops-extension-api/TaskAgent', () => {})

test('check basic test', async () => {
    render(<Main />)
})

test('check basic test', async () => {
    expect(1 + 1).toBe(2)
})
