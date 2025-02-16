# Learning notes

## JWT Pizza code study and debugging

As part of `Deliverable ⓵ Development deployment: JWT Pizza`, start up the application and debug through the code until you understand how it works. During the learning process fill out the following required pieces of information in order to demonstrate that you have successfully completed the deliverable.

| User activity                                       | Frontend component | Backend endpoints | Database SQL |
| --------------------------------------------------- | ------------------ | ----------------- | ------------ |
| View home page                                      |    home.tsx        |                N/A|           N/A|
| Register new user<br/>(t@jwt.com, pw: test)         |      register.tsx  |POST /auth/api     |INSERT INTO user (name, email, password)|
| Login new user<br/>(t@jwt.com, pw: test)            |login.tsx           |PUT/auth/api       |INSERT INTO auth (token, userId)|
| Order pizza                                         |menu.tsx, payment.tsx, delivery.tsx| POST /api/order GET /api/order/menu|INSERT INTO dinerOrder (dinerId, franchiseId, storeId, date)|
| Verify pizza                                        |delivery.tsx        |POST /api/order/verify|N/A        |
| View profile page                                   |dinerDashboard.tsx  |GET /api/order     |N/A           |
| View franchise<br/>(as diner)                       |franchiseDashboard.tsx |N/A             |N/A           |
| Logout                                              |N/A |DELETE ck/api/auth |DELETE FROM auth WHERE token=?|
| View About page                                     |about.tsx           | N/A               | N/A          |
| View History page                                   |history.tsx, MamaRicci.png|N/A          |N/A           |
| Login as franchisee<br/>(f@jwt.com, pw: franchisee) |login.tsx|PUT ck/api/auth|INSERT INTO auth (token, userId) VALUES (?, ?)|
| View franchise<br/>(as franchisee)                  |franchiseDashboard.tsx|GET /api/franchise/:userId|N/A  |
| Create a store                                      |franchiseDashboard.tsx|POST /api/franchise/:franchiseId/store|INSERT INTO store (franchiseId, name) VALUES (?, ?)|
| Close a store                                       |franchiseDashboard.tsx|DELETE /api/franchise/:franchiseId/store/:storeId|DELETE FROM store WHERE franchiseId=? AND id=?|
| Login as admin<br/>(a@jwt.com, pw: admin)           |login.tsx|PUT /api/auth|INSERT INTO auth (token, userId) VALUES (?, ?)|
| View Admin page                                     |adminDashboard.tsx|GET /api/franchise|SELECT id, name FROM franchise, SELECT id, name FROM store WHERE franchiseId=?|
| Create a franchise for t@jwt.com                    |adminDashboard.tsx|POST /api/franchise|SELECT id, name FROM user WHERE email=?, INSERT INTO franchise (name) VALUES (?), INSERT INTO userRole (userId, role, objectId) VALUES (?, ?, ?)|
| Close the franchise for t@jwt.com                   |adminDashboard.tsx|DELETE /api/franchise/:franchiseId|DELETE FROM store WHERE franchiseId=?, DELETE FROM userRole WHERE objectId=?, DELETE FROM franchise WHERE id=?|
