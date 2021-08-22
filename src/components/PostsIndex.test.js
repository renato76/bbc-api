/* eslint-disable no-undef */
import { render, screen, fireEvent  } from '@testing-library/react'
import { PostsIndex } from './PostsIndex'

test('Input container allows user to type text', () => {
  render(<PostsIndex />)
  const input = screen.getByTestId('filter')
  fireEvent.change(input, { target: { value: 'puppy' } })
  expect(input.value).toBe('puppy')
})