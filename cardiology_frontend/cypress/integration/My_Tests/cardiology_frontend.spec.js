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

  it ('see templates', () => {
    cy.get('img[id=loginIcon]').click()
    cy.get('input:first').type('testing@email.ts')
    cy.get('input:last').type('123456')

    cy.contains('Sign In').click()
    cy.contains('Templates').click()

    cy.contains('Add template')
  })

  it ('create template', () => {
    cy.get('img[id=loginIcon]').click()
    cy.get('input:first').type('testing@email.ts')
    cy.get('input:last').type('123456')

    cy.contains('Sign In').click()
    cy.contains('Templates').click()

    cy.contains('Add template').click()

    cy.get('input').type('TestTemplate')
    cy.contains('Submit').click()

    cy.contains('Add template')
  })

  it ('update template name', () => {
    cy.get('img[id=loginIcon]').click()
    cy.get('input:first').type('testing@email.ts')
    cy.get('input:last').type('123456')

    cy.contains('Sign In').click()
    cy.contains('Templates').click()
    cy.contains('TestTemplate').click()

    cy.contains('TestTemplate')

    cy.get('input:first').type('Edited')

    cy.contains('Update').click()

    cy.contains('Add template')    
  })

  it ('update template parameters', () => {
    cy.get('img[id=loginIcon]').click()
    cy.get('input:first').type('testing@email.ts')
    cy.get('input:last').type('123456')

    cy.contains('Sign In').click()
    cy.contains('Templates').click()
    cy.contains('TestTemplateEdited').click()

    cy.contains('TestTemplateEdited')

    cy.get('input[id=parameter8]').click()
    cy.get('input[id=parameter9]').click()
    cy.contains('Add Parameter').click()

    cy.contains('TestTemplateEdited')

    cy.get('input[id=8]').click()
    cy.contains('Delete Parameter').click()

    cy.contains('TestTemplateEdited')
  })

  it ('see patients', () => {
    cy.get('img[id=loginIcon]').click()
    cy.get('input:first').type('testing@email.ts')
    cy.get('input:last').type('123456')

    cy.contains('Sign In').click()
    cy.contains('Patients').click()

    cy.contains('Add patient')
  })

  it ('see one patient', () => {
    cy.get('img[id=loginIcon]').click()
    cy.get('input:first').type('testing@email.ts')
    cy.get('input:last').type('123456')

    cy.contains('Sign In').click()
    cy.contains('Patients').click()

    cy.contains('Insular1').click()

    cy.contains('Follow-Ups')
  })

  it ('create follow-up', () => {
    cy.visit('http://localhost:3001/login')
    cy.get('input:first').type('testing@email.ts')
    cy.get('input:last').type('123456')

    cy.contains('Sign In').click()
    cy.contains('Patients').click()
    cy.contains('Insular1').click()
    cy.contains('Add Follow-Up').click()

    cy.contains('Start Date')
    cy.get('input[name=startDate]').type('2030-12-15')
    cy.get('input[name=endDate]').type('2030-12-25')
    cy.get('select:first').select('TestTemplateEdited')

    cy.contains('Submit').click()

    cy.contains('Follow-Ups')
  })

  it ('patients follow-ups list', () => {
    cy.visit('http://localhost:3001/login')
    cy.get('input:first').type('patient@test.ts')
    cy.get('input:last').type('123')

    cy.contains('Sign In').click()

    cy.contains('Follow-Ups').click()

    cy.contains('Follow-ups list')
  })

  it ('delete follow-up', () => {
    cy.get('img[id=loginIcon]').click()
    cy.get('input:first').type('testing@email.ts')
    cy.get('input:last').type('123456')

    cy.contains('Sign In').click()
    cy.contains('Patients').click()
    cy.contains('Insular1').click()
    cy.contains('Add Follow-Up')

    cy.contains('2030-12-15').click()
    cy.contains('Follow-Up')

    cy.contains('Delete').click()
    cy.contains('Follow-Ups')
  })

  it ('create chat', () => {
    cy.get('img[id=loginIcon]').click()
    cy.get('input:first').type('testing@email.ts')
    cy.get('input:last').type('123456')

    cy.contains('Sign In').click()
    cy.contains('Patients').click()
    cy.contains('Insular1').click()

    cy.contains('Chat name')
    cy.get('input[name]').type('TestChat')
    cy.contains('Start chat').click()

    cy.visit('http://localhost:3001/patients-list')
    cy.contains('Insular1').click()

    cy.contains('Chat name').should('not.exist')

    cy.contains('Chat').click()

    cy.contains('Send')
  })

  it ('send message', () => {
    cy.visit('http://localhost:3001/login')
    cy.get('input:first').type('testing@email.ts')
    cy.get('input:last').type('123456')

    cy.contains('Sign In').click()
    cy.contains('Patients').click()
    cy.contains('Insular1').click()

    cy.contains('Chat name').should('not.exist')

    cy.contains('Chat').click()

    cy.get('input').type('TestMessage')

    cy.contains('Send').click()

    cy.contains('TestMessage')
  })

  it ('delete template', () => {
    cy.visit('http://localhost:3001/login')
    // cy.get('img[id=loginIcon]').click()
    cy.get('input:first').type('testing@email.ts')
    cy.get('input:last').type('123456')

    cy.contains('Sign In').click()
    cy.contains('Templates').click()
    cy.contains('TestTemplateEdited').click()

    cy.contains('TestTemplateEdited')

    cy.contains('Delete').click()
    cy.contains('Confirm').click()

    cy.contains('Add template')
  })

  it ('update parameter', () => {
    cy.get('img[id=loginIcon]').click()
    cy.get('input:first').type('testing@email.ts')
    cy.get('input:last').type('123456')

    cy.contains('Sign In').click()
    cy.contains('Parameters').click()
    cy.contains('TestParameter').click()

    cy.contains('TestParameter')

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
