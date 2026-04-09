import '@testing-library/jest-dom'
import { configure } from '@testing-library/react'

// The app uses data-test-id instead of data-testid
configure({ testIdAttribute: 'data-test-id' })

// jsdom doesn't implement scrollTo — required by Chakra UI Menu
window.HTMLElement.prototype.scrollTo = () => {}

// Keep localStorage clean between tests
beforeEach(() => {
  localStorage.clear()
})
