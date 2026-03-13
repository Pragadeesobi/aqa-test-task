export const locators = {
  login: {
    username: 'input[id="username"]',
    password: 'input[name="password"]',
    loginButton: 'span:has-text("Login")',
    registerLink: 'a[href="/register"]',
    errorMessage: 'div.message.danger'
  },
  register: {
    username: 'input[id="username"]',
    email: 'input[id="email"]',
    password: 'input[name="password"]',
    createAccountButton: 'span:has-text("Create account")',
    usernameError: 'p.help.is-danger:has-text("Please provide a username.")',
    emailError: 'p.help.is-danger:has-text("Please enter a valid email address.")',
    passwordError: 'p.help.is-danger:has-text("Password must have at least 8")',
    errorMessage: 'div.message.danger'
  },
  logout: {
    dropdown: 'svg.fa-chevron-down',
    button: 'button.dropdown-item:has-text("Logout")'
  },
  heading: (username: string) => `h2:has-text('Hi ${username}!')`
};