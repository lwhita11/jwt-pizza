// import { test, expect } from 'playwright-test-coverage';
import { test, expect } from 'playwright-test-coverage';

test('home page', async ({ page }) => {
  await page.goto('/');

  expect(await page.title()).toBe('JWT Pizza');
});

test('buy pizza with login', async ({ page }) => {await page.goto('/');

    await page.route('*/**/api/order/menu', async (route) => {
        const menuRes = [
          { id: 1, title: 'Veggie', image: 'pizza1.png', price: 0.0038, description: 'A garden of delight' },
          { id: 2, title: 'Pepperoni', image: 'pizza2.png', price: 0.0042, description: 'Spicy treat' },
        ];
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: menuRes });
      });
    
      await page.route('*/**/api/franchise', async (route) => {
        const franchiseRes = [
          {
            id: 2,
            name: 'LotaPizza',
            stores: [
              { id: 4, name: 'Lehi' },
              { id: 5, name: 'Springville' },
              { id: 6, name: 'American Fork' },
            ],
          },
          { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
          { id: 4, name: 'topSpot', stores: [] },
        ];
        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: franchiseRes });
      });
    
      await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'd@jwt.com', password: 'a' };
        const loginRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
      });
    
      await page.route('*/**/api/order', async (route) => {
        const orderReq = {
          items: [
            { menuId: 1, description: 'Veggie', price: 0.0038 },
            { menuId: 2, description: 'Pepperoni', price: 0.0042 },
          ],
          storeId: '4',
          franchiseId: 2,
        };
        const orderRes = {
          order: {
            items: [
              { menuId: 1, description: 'Veggie', price: 0.0038 },
              { menuId: 2, description: 'Pepperoni', price: 0.0042 },
            ],
            storeId: '4',
            franchiseId: 2,
            id: 23,
          },
          jwt: 'eyJpYXQ',
        };
        expect(route.request().method()).toBe('POST');
        expect(route.request().postDataJSON()).toMatchObject(orderReq);
        await route.fulfill({ json: orderRes });
      });

      await page.route('*/**/api/order/verify', async (route) => {
        const verifyReq = {
            "jwt": "eyJpYXQ"
          };
        const verifyRes = {
            "message": "valid",
            "payload": {
                "vendor": {
                    "id": "lwhita11",
                    "name": "Landon Whitaker"
                },
                "diner": {
                    "id": 14,
                    "name": "pizza franchisee",
                    "email": "f@jwt.com"
                },
                "order": {
                    "items": [
                        {
                            "menuId": 2,
                            "description": "Veggie",
                            "price": 0.0038
                        },
                        {
                            "menuId": 3,
                            "description": "Pepperoni",
                            "price": 0.0042
                        }
                    ],
                    "storeId": "36",
                    "franchiseId": 2,
                    "id": 29
                }
            }
        };
        expect(route.request().postDataJSON()).toMatchObject(verifyReq);
        await route.fulfill({ json: verifyRes });
      });
    
      await page.goto('/');
    
      // Go to order page
      await page.getByRole('button', { name: 'Order now' }).click();
    
      // Create order
      await expect(page.locator('h2')).toContainText('Awesome is a click away');
      await page.getByRole('combobox').selectOption('4');
      await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
      await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();
      await expect(page.locator('form')).toContainText('Selected pizzas: 2');
      await page.getByRole('button', { name: 'Checkout' }).click();
    
      // Login
      await page.getByPlaceholder('Email address').click();
      await page.getByPlaceholder('Email address').fill('d@jwt.com');
      await page.getByPlaceholder('Email address').press('Tab');
      await page.getByPlaceholder('Password').fill('a');
      await page.getByRole('button', { name: 'Login' }).click();
    
      // Pay
      await expect(page.getByRole('main')).toContainText('Send me those 2 pizzas right now!');
      await expect(page.locator('tbody')).toContainText('Veggie');
      await expect(page.locator('tbody')).toContainText('Pepperoni');
      await expect(page.locator('tfoot')).toContainText('0.008 ₿');
      await page.getByRole('button', { name: 'Pay now' }).click();
    
      // Check balance
      await expect(page.getByText('0.008')).toBeVisible();


      await page.getByRole('button', { name: 'Verify' }).click();
      await expect(page.locator('h3')).toContainText('JWT Pizza - valid');
      

    //open and close a franchise

    // await page.getByRole('button', { name: 'Verify' }).click();
    // await expect(page.locator('h3')).toContainText('JWT Pizza - valid');
    // await page.getByRole('button', { name: 'Close' }).click();
    // await page.getByRole('link', { name: 'Admin' }).click();
    // await expect(page.getByRole('heading')).toContainText('Mama Ricci\'s kitchen');
    // await page.getByRole('button', { name: 'Add Franchise' }).click();
    // await page.getByRole('textbox', { name: 'franchise name' }).click();
    // await page.getByRole('textbox', { name: 'franchise name' }).fill('Test');
    // await page.getByRole('textbox', { name: 'franchisee admin email' }).click();
    // await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('f@jwt.com');
    // await page.getByRole('button', { name: 'Create' }).click();
    // await expect(page.getByRole('table')).toContainText('pizza franchisee');
    // await page.getByRole('row', { name: 'Test pizza franchisee Close' }).getByRole('button').click();
    // await expect(page.getByRole('heading')).toContainText('Sorry to see you go');
    // await page.getByRole('button', { name: 'Close' }).click();
});

test('open/close a franchise', async ({ page }) => {await page.goto('/');
    let i = 0;
    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'a@jwt.com', password: 'admin' };
        const loginRes = { user: { id: 2, name: '常用名字', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IuW4uOeUqOWQjeWtlyIsImVtYWlsIjoiYUBqd3QuY29tIiwicm9sZXMiOlt7InJvbGUiOiJhZG1pbiJ9XSwiaWF0IjoxNzM5Njc1MDc3fQ.Ltherp9MEo_1wXjJ11b0tLsoWEHIC1J68K-as5rGnW8' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
      });

      await page.route('*/**/api/franchise', async (route) => {
        const method = route.request().method();
        if (method === 'GET') {
            if (i == 0) {
                const getFranRes =
                [
                    {
                    "id": 2,
                    "name": "pizzaPocket",
                    "admins": [
                        {
                        "id": 14,
                        "name": "pizza franchisee",
                        "email": "f@jwt.com"
                        }
                    ],
                    "stores": [
                        {
                        "id": 6,
                        "name": "SLC",
                        "totalRevenue": 0.0988
                        }
                    ]
                    }
                ];

                expect(route.request().method()).toBe('GET');
                await route.fulfill({ json: getFranRes });
            }
            else {
                const getFranRes =
                [
                    {
                    "id": 9,
                    "name": "Test",
                    "admins": [
                        {
                        "id": 14,
                        "name": "pizza franchisee",
                        "email": "f@jwt.com"
                        }
                    ],
                    "stores": []
                    }
                ];

                expect(route.request().method()).toBe('GET');
                await route.fulfill({ json: getFranRes });
            }
        }
        else if (method == "POST") {
            const franReq = {
                "stores": [],
                "id": "",
                "name": "Test",
                "admins": [
                  {
                    "email": "f@jwt.com"
                  }
                ]
              };
            const franRes = {
                "stores": [],
                "id": 28,
                "name": "Test",
                "admins": [
                  {
                    "email": "f@jwt.com",
                    "id": 14,
                    "name": "pizza franchisee"
                  }
                ]
              };

            expect(route.request().method()).toBe('POST');
            expect(route.request().postDataJSON()).toMatchObject(franReq);
            await route.fulfill({ json: franRes });
        }
      });
    

    await page.goto('/');
    
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('admin');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Admin' }).click();
    await expect(page.getByRole('heading')).toContainText('Mama Ricci\'s kitchen');
    await page.getByRole('button', { name: 'Add Franchise' }).click();
    await page.getByRole('textbox', { name: 'franchise name' }).click();
    await page.getByRole('textbox', { name: 'franchise name' }).fill('Test');
    await page.getByRole('textbox', { name: 'franchisee admin email' }).click();
    await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('f@jwt.com');
    i = 1;
    await page.getByRole('button', { name: 'Create' }).click();
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

test('Create Store', async ({ page }) => {

    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'f@jwt.com', password: 'franchisee' };
        const loginRes = { user: { id: 14, name: 'pizza franchisee', email: 'f@jwt.com', roles: [
            {
              "role": "diner"
            },
            {
              "objectId": 2,
              "role": "franchisee"
            }
          ] }, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsIm5hbWUiOiJwaXp6YSBmcmFuY2hpc2VlIiwiZW1haWwiOiJmQGp3dC5jb20iLCJyb2xlcyI6W3sicm9sZSI6ImRpbmVyIn0seyJvYmplY3RJZCI6Miwicm9sZSI6ImZyYW5jaGlzZWUifV0sImlhdCI6MTczOTY3ODU3OH0.Kgq-DlT2EDIopPLItCwNmPEbSzJM52_IXjcuubc43SI' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
      });


      await page.route('*/**/api/franchise/2/store', async (route) => {
            const storeReq = {"id" : "", "name": "Test"};
            const storeRes = {"id":33,"franchiseId":2,"name":"Test"};

            expect(route.request().method()).toBe('POST');
            expect(route.request().postDataJSON()).toMatchObject(storeReq);
            await route.fulfill({ json: storeRes });
        });

        await page.route('*/**/api/franchise/14', async (route) => {
            const storeRes = [
                {
                  "id": 2,
                  "name": "pizzaPocket",
                  "admins": [
                    {
                      "id": 14,
                      "name": "pizza franchisee",
                      "email": "f@jwt.com"
                    }
                  ],
                  "stores": []
                }
              ];

            expect(route.request().method()).toBe('GET');
            await route.fulfill({ json: storeRes });
        });


    await page.goto('/');

    await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
    await expect(page.getByRole('main')).toContainText('So you want a piece of the pie?');
    await page.getByRole('link', { name: 'Login', exact: true }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForNavigation();
    await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();

    await page.getByRole('button', { name: 'Create store' }).click();
    await page.getByRole('textbox', { name: 'store name' }).click();
    await page.getByRole('textbox', { name: 'store name' }).fill('Test');
    await page.getByRole('button', { name: 'Create' }).click();
});

test('Close Store', async ({ page }) => {
    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'f@jwt.com', password: 'franchisee' };
        const loginRes = { user: { id: 14, name: 'pizza franchisee', email: 'f@jwt.com', roles: [
            {
              "role": "diner"
            },
            {
              "objectId": 2,
              "role": "franchisee"
            }
          ] }, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsIm5hbWUiOiJwaXp6YSBmcmFuY2hpc2VlIiwiZW1haWwiOiJmQGp3dC5jb20iLCJyb2xlcyI6W3sicm9sZSI6ImRpbmVyIn0seyJvYmplY3RJZCI6Miwicm9sZSI6ImZyYW5jaGlzZWUifV0sImlhdCI6MTczOTY3ODU3OH0.Kgq-DlT2EDIopPLItCwNmPEbSzJM52_IXjcuubc43SI' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
      });

      await page.route('*/**/api/franchise/14', async (route) => {
        const storeRes = [
            {
              "id": 2,
              "name": "pizzaPocket",
              "admins": [
                {
                  "id": 14,
                  "name": "pizza franchisee",
                  "email": "f@jwt.com"
                }
              ],
              "stores": [
                {
                  "id": 6,
                  "name": "Test",
                  "totalRevenue": 0
                }
              ]
            }
          ]

        expect(route.request().method()).toBe('GET');
        await route.fulfill({ json: storeRes });
    });

    await page.goto('/');

    await page.getByRole('link', { name: 'Login', exact: true }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForNavigation();
    await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
    await expect(page.locator('tbody')).toContainText('Test');
    await page.getByRole('row', { name: 'Test 0 ₿ Close' }).getByRole('button').click();
    await expect(page.getByRole('main')).toContainText('Are you sure you want to close the pizzaPocket store Test ?');
    await page.getByRole('button', { name: 'Close' }).click();


});

test('Franchise Diner Dashboard', async ({ page }) => {
    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'f@jwt.com', password: 'franchisee' };
        const loginRes = { user: { id: 14, name: 'pizza franchisee', email: 'f@jwt.com', roles: [
            {
              "role": "diner"
            },
            {
              "objectId": 2,
              "role": "franchisee"
            }
          ] }, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsIm5hbWUiOiJwaXp6YSBmcmFuY2hpc2VlIiwiZW1haWwiOiJmQGp3dC5jb20iLCJyb2xlcyI6W3sicm9sZSI6ImRpbmVyIn0seyJvYmplY3RJZCI6Miwicm9sZSI6ImZyYW5jaGlzZWUifV0sImlhdCI6MTczOTY3ODU3OH0.Kgq-DlT2EDIopPLItCwNmPEbSzJM52_IXjcuubc43SI' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
      });

      await page.route('*/**/api/order', async (route) => {
       const orderRes = {
        "dinerId": 13,
        "orders": [],
        "page": 1
      };
      expect(route.request().method()).toBe('GET');
      await route.fulfill({ json: orderRes });
      });

    await page.goto('/');

    await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
    await page.getByRole('textbox', { name: 'Password' }).press('Enter');
    // await page.waitForNavigation();
    await page.getByRole('link', { name: 'pf' }).click();
    await expect(page.getByRole('main')).toContainText(', Franchisee on 2');

});

test('Diner Dashboard', async ({ page }) => {
    await page.route('*/**/api/auth', async (route) => {
        if (route.request().method() === "DELETE") {
        const loginRes = {
            "message": "logout successful"
          };

        expect(route.request().method()).toBe('DELETE');
        await route.fulfill({ json: loginRes });
        }
        else {

            const loginReq = { email: 'd@jwt.com', password: 'diner' };
            const loginRes = {
                "user": {
                "id": 13,
                "name": "pizza diner",
                "email": "d@jwt.com",
                "roles": [
                    {
                    "role": "diner"
                    }
                ]
                },
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm5hbWUiOiJwaXp6YSBkaW5lciIsImVtYWlsIjoiZEBqd3QuY29tIiwicm9sZXMiOlt7InJvbGUiOiJkaW5lciJ9XSwiaWF0IjoxNzM5NjgwMTE5fQ.GY8pbffO3jeaOyd0x0fXYZkMPNLo27foqoYFDQAbhhg"
            }

            expect(route.request().method()).toBe('PUT');
            expect(route.request().postDataJSON()).toMatchObject(loginReq);
            await route.fulfill({ json: loginRes });
        }
      });

      await page.route('*/**/api/order', async (route) => {
       const orderRes = {
        "dinerId": 13,
        "orders": [],
        "page": 1
      };
      expect(route.request().method()).toBe('GET');
      await route.fulfill({ json: orderRes });
      });

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
    await page.getByRole('textbox', { name: 'Email address' }).fill('d@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('diner');
    await page.getByRole('textbox', { name: 'Password' }).press('Enter');
    // await page.waitForNavigation();
    await page.getByRole('link', { name: 'pd' }).click();    
    await expect(page.getByRole('main')).toContainText('diner');
    await page.goto('/admin');
    await expect(page.getByRole('heading')).toContainText('Oops');

});