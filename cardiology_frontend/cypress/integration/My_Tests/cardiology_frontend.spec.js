import API from "../../../src/API";

describe('Cardiology App', () => {
  it ('homepage can be opened', () => {
    cy.visit('http://localhost:3001')
    cy.contains('Email')
  })

  it ('open register from login', () => {
    cy.contains('Register').click()
    cy.contains('Name')
  })

  it ('register', () => {
    cy.visit('http://localhost:3001/register')
    cy.get('input:first').type('Testing')
    cy.get('input[name=email]').type('testing@email.ts')
    cy.get('input[name=password]').type('123456')
    cy.get('input:last').type('123456')

    cy.get('select:first').select('Doctor')
    cy.get('select:last').select('Insular')

    cy.contains('Submit').click()

    cy.contains('Parameters')
  })

  it ('login', () => {
    cy.get('img[id=loginIcon]').click()
    cy.get('input:first').type('testing@email.ts')
    cy.get('input:last').type('123456')

    cy.contains('Sign In').click()

    cy.contains('Parameters')
  })

  it ('edit profile', () => {
    cy.get('img[id=loginIcon]').click()
    cy.get('input:first').type('testing@email.ts')
    cy.get('input:last').type('123456')

    cy.contains('Sign In').click()
    cy.contains('Edit Profile').click()

    cy.contains('Update')

    cy.get('input:first').type('Edited')
    cy.get('input[name=phoneNumber]').type('661616161')

    cy.contains('Update').click()

    cy.contains('Parameters')
  })

  it ('see parameters', () => {
    cy.get('img[id=loginIcon]').click()
    cy.get('input:first').type('testing@email.ts')
    cy.get('input:last').type('123456')

    cy.contains('Sign In').click()
    cy.contains('Parameters').click()

    cy.contains('Add parameter')
  })

  it ('create parameter', () => {
    cy.get('img[id=loginIcon]').click()
    cy.get('input:first').type('testing@email.ts')
    cy.get('input:last').type('123456')

    cy.contains('Sign In').click()
    cy.contains('Parameters').click()
    cy.contains('Add parameter').click()

    cy.get('input:first').type('TestParameter')
    cy.get('select:first').select('Numeric')
    cy.get('input:last').type('Daily')

    cy.contains('Submit').click()

    cy.contains('Add parameter')
  })

  it ('update parameter', () => {
    cy.get('img[id=loginIcon]').click()
    cy.get('input:first').type('testing@email.ts')
    cy.get('input:last').type('123456')

    cy.contains('Sign In').click()
    cy.contains('Parameters').click()
    cy.contains('TestParameter').click()

    cy.get('input:first').type('Edited')
    cy.get('select:first').select('Yes or No')
    cy.get('input:last').type('Edited')

    cy.contains('Update').click()

    cy.contains('Add parameter')
  })

  it ('delete parameter', () => {
    cy.get('img[id=loginIcon]').click()
    cy.get('input:first').type('testing@email.ts')
    cy.get('input:last').type('123456')

    cy.contains('Sign In').click()
    cy.contains('Parameters').click()
    cy.contains('TestParameterEdited').click()

    cy.contains('TestParameterEdited')

    cy.contains('Delete').click()

    cy.contains('Add parameter')
  })

  it ('logout', () => {
    cy.get('img[id=loginIcon]').click()
    cy.get('input:first').type('testing@email.ts')
    cy.get('input:last').type('123456')

    cy.contains('Sign In').click()
    cy.contains('Parameters').click()

    cy.get('img[id=logoutIcon').click()

    cy.contains('Sign In')
  })

  it ('destroy user', () => {
    cy.get('img[id=loginIcon]').click()
    cy.get('input:first').type('testing@email.ts')
    cy.get('input:last').type('123456')

    cy.contains('Sign In').click()
    cy.contains('Edit Profile').click()

    cy.contains('Delete account').click()
    
    cy.contains('Sign In')
  })

  
})
