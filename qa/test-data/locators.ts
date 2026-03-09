// locators.ts
export const locators = {
  login: {
    username: 'input[id="username"]',
    password: 'input[name="password"]',
    loginButton: 'span:has-text("Login")',
    registerLink: 'a[href="/register"]'
  },
  register: {
    username: 'input[id="username"]',
    email: 'input[id="email"]',
    password: 'input[name="password"]',
    createAccountButton: 'span:has-text("Create account")'
  },
  heading: (username: string) => `h2:has-text('Hi ${username}!')`
};