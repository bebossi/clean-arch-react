import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    fixturesFolder: false,
    supportFile: false,
    specPattern: './src/main/**/*.cy.{ts, tsx}',
    setupNodeEvents(on, config) {
      const webpackPreprocessor = require('@cypress/webpack-preprocessor')

      on('file:preprocessor', webpackPreprocessor())

      return config
    },
  },
})
