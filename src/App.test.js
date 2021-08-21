/* eslint-disable no-undef */
import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen  } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App'

test('renders link to homepage', () => {
  render(
    <Router>
      <App />
    </Router>
  )
  expect(screen.getByText(/bbc paws/i)).toBeInTheDocument()
})