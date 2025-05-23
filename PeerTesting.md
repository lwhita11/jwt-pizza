Koby Cutler and Landon Whitaker

Self Attack:

Landon

| Item | Result |
| -------------- | --------------------------------------------------------------- |
| Date | April 14th, 2023 |
| Target | [pizza.landonwhitaker.click](http://pizza.kobycut.click) |
| Classification | Security Misconfiguration |
| Severity | 4 |
| Description | Able to view the database host with no authorization. While not inherently able to be attacked, shows a vulnerability of another feature that can be targeted |
| Images | ![Screenshot 2025-04-14 at 4.06.00 PM](https://hackmd-prod-images.s3-ap-northeast-1.amazonaws.com/uploads/upload_f77b8fac6490d538c4ce4df292b05a66.png?AWSAccessKeyId=AKIA3XSAAW6AWSKNINWO&Expires=1744670865&Signature=wnABA3%2FGCQjAiedA8xtuFbWK9kY%3D)
 |
| Corrections | Hide the database from the /api/docs endpoint |

Koby


| Item | Result |
| -------------- | --------------------------------------------------------------- |
| Date | April 14th, 2023 |
| Target | [pizza.kobycut.click](http://pizza.kobycut.click) |
| Classification | Software Logging and Monitoring Failures |
| Severity | 2 |
| Description | Able to repeatedly order more than 20 pizzas which causes the latency logs to spike up to 10,000 ms which covers up any successfull pizza purchase latency logs. Ordering the 20 pizzas over and over also causes the failed pizza purchases to look like there were a lot of failed orders. |
| Images | ![incorrect logs](https://hackmd-prod-images.s3-ap-northeast-1.amazonaws.com/uploads/upload_bc0167cad86af12bbc69a94571908000.png?AWSAccessKeyId=AKIA3XSAAW6AWSKNINWO&Expires=1744671380&Signature=PskzHPYX4aFC%2Fia5o3M3%2BemUioI%3D) |
| Corrections | Limit the user to being able to only order less than 20 pizzas. Also if one user seems to be persistently crashing one portion, block them or disable their access somehow. |

Peer Attack:

Landon --> Koby

| Item | Result |
| -------------- | --------------------------------------------------------------- |
| Date | April 14th, 2023 |
| Target | [pizza.kobycut.click](http://pizza.kobycut.click) |
| Classification | Broken Access Control |
| Severity | 4 |
| Description | A user's email can be changed to something that should not be possible. If a user tries to initially register with an invalid email, the formatting is not correct and it will not let it. If an admin updates the email, it will not stop it from happening on the backend |
| Images | ![Screenshot 2025-04-14 at 4.14.23 PM](https://hackmd-prod-images.s3-ap-northeast-1.amazonaws.com/uploads/upload_578187ce86514f49075b45d9423deff5.png?AWSAccessKeyId=AKIA3XSAAW6AWSKNINWO&Expires=1744670969&Signature=bo0RZiRoCHAmuBJo120uuGPcqjA%3D) |
| Corrections | Hide the database from the /api/docs endpoint |

| Item | Result |
| -------------- | --------------------------------------------------------------- |
| Date | April 14th, 2023 |
| Target | [pizza.kobycut.click](http://pizza.kobycut.click) |
| Classification | Insecure Design |
| Severity | 4 |
| Description | Multiple users can be registered with the same email address. This creates the potential to flood a database with duplicate accounts. If there are different passwords, the duplicate accounts cannot be logged into. |
| Images | ![Screenshot 2025-04-14 at 4.28.44 PM](https://hackmd-prod-images.s3-ap-northeast-1.amazonaws.com/uploads/upload_259d20194173158387eb282379ed70b8.png?AWSAccessKeyId=AKIA3XSAAW6AWSKNINWO&Expires=1744671049&Signature=6mI7IhhlgWwcBx2BePvQfPWe7JQ%3D)
 |
| Corrections | Validate that the email field is unique during registration |

Koby --> Landon

| Item           | Result                                                                                                                                                                                          |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Date           | April 14th, 2023                                                                                                                                                                                |
| Target         | [pizza.landonwhitaker.click](http://pizza.landonwhitaker.click)                                                                                                                                 |
| Classification | Broken Access Control                                                                                                                                                                           |
| Severity       | 6                                                                                                                                                                                               |
| Description    | Able to call the delete endpoint and supply the id as a small number such as 1, 2, 3, 4, 5, etc. that correlates to the franchiseId. Franchises were closed and no longer appeared in database. |
| Images         | ![no more franchises](https://hackmd-prod-images.s3-ap-northeast-1.amazonaws.com/uploads/upload_0ccef25b9455faad1cc2be731844e571.png?AWSAccessKeyId=AKIA3XSAAW6AWSKNINWO&Expires=1744671431&Signature=8XmcATxgwSPJKZ3S9GIkmPQYbbI%3D)                                                                                                                                                    |
| Corrections    | make the id for each franchise a random large number instead of couting.                                                                                                                        |


Summary of learnings:
-
- Throughout this I realized how easy it can be to mess with a websites information, database information, and ultimately crash a system in someway.
- There are many tools such as BurpSuite that make it relatively easy to pick apart an application on the web and discover how the application functions.
- It is critical to understand how your code works and it can be very valuable to think like an attacker would so that we can prepare for attacks
- Little errors or bugs that seem like they will not impact the application at all could present a huge security risk.
- There are many different types of ways for people to crash a website so it is important to understand what those are and where in the code there might be vulnerabilities.
- When exploited, small oversights can cause big latency andd security issues
