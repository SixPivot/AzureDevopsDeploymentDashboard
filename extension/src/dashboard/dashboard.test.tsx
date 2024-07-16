import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import { Dashboard } from './dashboard'
import * as React from 'react'
import '@testing-library/jest-dom'
import { TestComponent } from './testcomponent'

jest.mock('azure-devops-extension-sdk', () => {
  return {
    init: () => {}
  }
})

// todo: rewrite test
test('loads and displays greeting', async () => {
  // ARRANGE
  render(<TestComponent />)

  // ACT
  await userEvent.click(screen.getByText('Load Greeting'))
  await screen.findByRole('heading')

  // ASSERT
  expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  expect(screen.getByRole('button')).toBeDisabled()
})