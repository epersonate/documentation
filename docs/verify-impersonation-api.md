---
id: verify-impersonation-api
title: Verify Impersonation API
sidebar_label: Verify Impersonation API
---
  Returns impersonation data.

* **URL**

  https://api.epersonate.com
/api/v1/impersonations

* **Method:**

  `POST`
  
*  **Headers**

    **Required:**

    | Name        | Type           | Value  |
    | ------------- |:-------------:| -----:|
    | `Authorization` Personal Access Token generated previously in the [setup guide](https://docs.epersonate.com/docs/personal-access-token) | `string` | `Bearer <EPERSONATE_PERSONAL_ACCES_TOKEN>` |


* **Data Params**

    **Required:**
 
    | Name        | Type           | Value  |
    | ------------- |:-------------:| -----:|
    | `token` Generated in the [previous section of this guide](https://docs.epersonate.com/docs/back-end-authentication)| `string` | `<IMPERSONATION_TOKEN>` |

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ userId : 12, valid : true }`
 
* **Error Response:**

  * **Code:** 401 NOT AUTHORIZED <br />
    **Content:** `{ message : "Not Authorized" }`

