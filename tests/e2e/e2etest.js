const { chromium } = require('playwright');

describe('End-to-End Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    // Launch a new browser instance before all tests
    browser = await chromium.launch({ headless: false }); 
    page = await browser.newPage(); 
  });

  afterAll(async () => {
    // Close the browser after all tests
    await browser.close();
  });

  it('should register a new user and log in', async () => {
    await page.goto('http://localhost:3000/register'); // Navigate to registration page
    await page.fill('input[name="username"]', 'testuser'); // Fill username
    await page.fill('input[name="email"]', 'testuser@example.com'); // Fill email
    await page.fill('input[name="password"]', 'testpass'); // Fill password
    await page.click('button[type="submit"]'); // Submit form

    // Verify registration success
    await page.waitForSelector('#dashboard'); // Adjust selector as needed
  });

  it('should log in an existing user', async () => {
    await page.goto('http://localhost:3000/login'); // Navigate to login page
    await page.fill('input[name="username"]', 'testuser'); // Fill username
    await page.fill('input[name="password"]', 'testpass'); // Fill password
    await page.click('button[type="submit"]'); // Submit form

    // Verify login success
    await page.waitForSelector('#dashboard'); // Adjust selector as needed
  });

  it('should create, update, and delete a task', async () => {
    await page.goto('http://localhost:3000/tasks'); // Navigate to tasks page
    await page.fill('input[name="title"]', 'New Task'); // Fill task title
    await page.fill('input[name="description"]', 'Task description'); // Fill task description
    await page.click('button[type="submit"]'); // Submit form

    // Verify task creation
    await page.waitForSelector('.task-item'); // Adjust selector as needed

    // Update the task
    await page.click('.task-item .edit-button'); // Adjust selector as needed
    await page.fill('input[name="title"]', 'Updated Task'); // Update task title
    await page.click('button[type="submit"]'); // Submit changes

    // Delete the task
    await page.click('.task-item .delete-button'); // Adjust selector as needed
    await page.waitForSelector('.task-item', { state: 'detached' }); // Verify task is removed
  });

  it('should log out the user', async () => {
    await page.click('#logout-button'); // Click logout button
    await page.waitForSelector('#login'); // Verify redirection to login
  });
});