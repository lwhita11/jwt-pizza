// import { test, expect } from 'playwright-test-coverage';
import { test, expect } from 'playwright-test-coverage';

test('home page', async ({ page }) => {
  await page.goto('/');

  expect(await page.title()).toBe('JWT Pizza');
});

test('buy pizza with login', async ({ page }) => {await page.goto('/');
    await page.goto('/');

    await page.getByRole('button', { name: 'Order now' }).click();
    await page.getByRole('combobox').selectOption('6');
    await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
    await expect(page.locator('h2')).toContainText('Awesome is a click away');
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
    await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading')).toContainText('So worth it');
    await expect(page.getByRole('main')).toContainText('Send me that pizza right now!');
    await page.getByRole('button', { name: 'Pay now' }).click();
    await expect(page.getByRole('heading')).toContainText('Here is your JWT Pizza!');

    //open and close a franchise

    await page.getByRole('button', { name: 'Verify' }).click();
    await expect(page.locator('h3')).toContainText('JWT Pizza - valid');
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByRole('link', { name: 'Admin' }).click();
    await expect(page.getByRole('heading')).toContainText('Mama Ricci\'s kitchen');
    await page.getByRole('button', { name: 'Add Franchise' }).click();
    await page.getByRole('textbox', { name: 'franchise name' }).click();
    await page.getByRole('textbox', { name: 'franchise name' }).fill('Test');
    await page.getByRole('textbox', { name: 'franchisee admin email' }).click();
    await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('f@jwt.com');
    await page.getByRole('button', { name: 'Create' }).click();
    await expect(page.getByRole('table')).toContainText('pizza franchisee');
    await page.getByRole('row', { name: 'Test pizza franchisee Close' }).getByRole('button').click();
    await expect(page.getByRole('heading')).toContainText('Sorry to see you go');
    await page.getByRole('button', { name: 'Close' }).click();
});


test('navigates to the About page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL('/about');
    await page.getByText('The secret sauce').click();
    await expect(page.getByRole('main')).toContainText('The secret sauce');
    await page.getByRole('link', { name: 'about', exact: true }).click();
    await page.getByText('The secret sauce').click();
    });

test('Login page', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByRole('heading')).toContainText('Welcome back');
    
    });

test('Franchising', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
    await expect(page.getByRole('main')).toContainText('So you want a piece of the pie?');
    await page.getByRole('link', { name: 'Login', exact: true }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
    await page.getByRole('button', { name: 'Login' }).click();
    // await page.waitForNavigation();
    await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();

    await page.getByRole('button', { name: 'Create store' }).click();
    await page.getByRole('textbox', { name: 'store name' }).click();
    await page.getByRole('textbox', { name: 'store name' }).fill('Test');
    await page.getByRole('button', { name: 'Create' }).click();
    await expect(page.locator('tbody')).toContainText('Test');
    await page.getByRole('row', { name: 'Test 0 ₿ Close' }).getByRole('button').click();
    await expect(page.getByRole('main')).toContainText('Are you sure you want to close the pizzaPocket store Test ? This cannot be restored. All outstanding revenue with not be refunded.');
    await page.getByRole('button', { name: 'Close' }).click();


});

test('Diner Dashboard', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('d@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('diner');
    await page.getByRole('button', { name: 'Login' }).click();
    // await page.waitForNavigation();
    await page.getByRole('link', { name: 'pd' }).click();
    await expect(page.getByRole('heading')).toContainText('Your pizza kitchen');

    await page.getByRole('link', { name: 'History' }).click();
    await expect(page.getByRole('heading')).toContainText('Mama Rucci, my my');
    await page.getByRole('link', { name: 'Logout' }).click();
    // await page.waitForNavigation();
    await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
    await page.getByRole('textbox', { name: 'Password' }).press('Enter');
    await page.getByRole('button', { name: 'Login' }).click();
    // await page.waitForNavigation();
    await page.getByRole('link', { name: 'pf' }).click();
    await expect(page.getByRole('main')).toContainText(', Franchisee on 2');

});