/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  // Create a cypress integration test that:
  // 1. types the word "puppy" into the search filter 
  // 2. then clicks the search button
  // results should return only 3 posts that contain the word puppy in the description
  // 3. Then clicks on the clear search button which should clear filters and return all the data again

  it('displays all the posts', () => {
    cy.wait(1000)
    cy.get('[data-cy=input]').first().type('puppy')
    cy.get('[data-cy=submit]').click()
    cy.wait(5000)
    cy.get('[data-cy=clear-all]').click()
  })
})
