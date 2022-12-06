# Hospital IMS Project (Individual Portion)

## Members

By Connor Doman.

Originally by Team 24: Antonio Vazquez-Mackay, Connor Doman, Eric Launer, Leo Henon.

## Usage

### Description

The purpose of this project is to create an inventory management system for a hospital capable of tracking stored items, ordering new items, storing user information such as permission level, forecasting shortages, and automatically ordering new items when stocks are low.

### Installation

First, clone the repository:

```bash
$ git clone https://github.com/cosc310team24/project.git
```

You will need to install `node` and `yarn` to run this project. You can install `node` by following the instructions [here](https://nodejs.org/en/download/). You can install `yarn` by following the instructions [here](https://yarnpkg.com/en/docs/install).

You must build the project before running it. To do this, run the following command in the root directory of the project:

```bash
$ yarn produce
```

This is shorthand for `yarn build` follwed by `yarn start`. This will automatically compile the app and enable server-side rendering as well as start the server. You can access the project at `http://localhost:3000` or whatever IP it says.

(If this command fails due to server-side rendering issues, try `$ yarn dev`.)

---

## Individual Project Summary

The primary API used in the individual portion of this project is [Supabase](app.supabase.com). It is a hosted Postgres database with a REST API and a realtime websocket API. It also has a built-in authentication system. This enables both client and server-side databse queries with integrated row-level security through Postgres.

![New Look](/public/screenshots/new_look.png)

### New Feature 1: User Authorization and Protected Routes

Primary APIs used: `supabase`, `cookies-next`

Authorization is handled through Supabase's integrated authorization system. This is highly extensible and allows users to log in with many different third party services as well as email and password and one-time logins.

In my applicaiton, I make use of email/password and so-called "Magic Link" authentication, where the user is sent an email with a link that logs them in.

While there was some Supabase integration in previous assignments it was exploratory and not capable of fulfilling our project's needs. Now, users permission levels are stored and this restricts the types of data they are able to access. This is most evident in the "Profiles" (`/profiles`) page, where users can only see users with the same permission level or lower.

![Profiles page](/public/screenshots/users_list.png)

Cookies are used to store the user's session and `cookies-next` is a library that integrates Next.js systems with cookies. It also streamlines the setting and getting of cookies.

There is also a new version of the Content component called ProtectedContent which automatically redirects the user to login if they have not done so already. This makes securing pages straightforward with the assistance of additional helper functions created in [/public/utils/supabase.js](/public/utils/supabase.js).

![Protected Route](/public/screenshots/protected_route.png)

![Protected Route Login](/public/screenshots/protected_route_login.png)

![Successfully signed in](/public/screenshots/successful_sign_in.png)

### New Feature 2: Database Integration

Primary APIs used: `supabase`, `moment-timezone`, `next`

Next.js has a server-side method called `getStaticPaths` that allows arbitrary data to be applied to a path. This allows for dynamic routing, where data can evolve on the database and automatically have a page available on the web without having to manually create each entry.

An ideal use case is for any field that can change/update frequently, like a product or a user. In my application, this is used in the page for a single user (`/[id].jsx`). When the server renders the page, it first queries the database to find all IDs and then generates a page with the ID as the path. This allows for a user to be created and then immediately have a page for them. In my case, it summarizes the user's information and allows them to edit it.

![User profile](/public/screenshots/single_user_profile.png)

`moment-timezone` is used to format dates and times. It is a very powerful library that allows for easy formatting of dates and times. It also has built-in timezone support. This is utilized in each users' page for their `created_at` field, adjusting the timezone to be relevant for the current user (or as close as possible).

> **Note:** all users are technically accessible through this method, regardless of their permission level. This is because the page is generated on the server and the user's permission level is not known until the page is rendered. This is a security risk and should be addressed in the future. In the meantime, user IDs are not easily guessable and the user's permission level is not exposed on the page.

Additionally, products are stored in the database and can be updated. This is visible in the "Order" (`/order`) page. With further development, the logged in user would only be able to see products that they have permission to order.

![Order page logged in](/public/screenshots/signed_in_inventory.png)

In order to assist in the generation of items, I created a Python script that generates an `INSERT` statement for each item outlined by the [U.S. Bureau of Industry and Security](https://www.bis.doc.gov/index.php/documents/product-guidance/894-comprehensive-medical-supplies-updated-list-2014/file) as a comprehensive list of medical supplies. While this is not truly a list of products and more of a checklist of groups of products, it is useful for visualizing the finished state of the system. This script and the generated SQL are available in the `scripts` folder.

### Other improvements

#### Styling

Styling has been refined somewhat, making this project distinct from the group project. The main changes are the color and rudimentary mobile support through CSS media queries.

![Mobile view logged in](/public/screenshots/mobile_logged_in.png)

(There is also a little karate guy in the footer now. )

---

**The remainder is the original README.md from the group project.**

---

## Class descriptions

### Warehouse

This class defines a warehouse used for storage item and tracks the total storage space, remaining storage space, warehouse ID, and a changelog of the warehouse's items. It allows the addition and removal of items while keeping track of which staff member removed what items and notifies users if they attempt to remove an item above their permission level.

### Cart

This class keeps a list of items along with their quantities in the system's cart and allows the addition or removal of one or multiple items at a time.

## Testing

Testing is done using the Cypress testing framework. It can perform tests on the components themselves as well as by mimicking user stories and verifying the functionality of the application as a whole.

Component tests are in `cypress/component`.

### How to create a Component Test

Inside the `cypress/component` folder, create a new file with the name of the component you are testing. For example, if you are testing the `Button` component, create a file called `Button.cy.jsx` (or `.js`).

Inside the file, import the component you are testing:

```jsx
import Button from "/components/Button.jsx";

//...
```

Then place all your unit tests inside the `describe` block:

```jsx
// imports...

describe("Button.cy.jsx", () => {
    //...
});
```

Tests, as much as possible, are designed to be coded in a way that feels like natural language. For each test you want to perform, use the `it()` function with a description of the test as the first argument. For example, if a button needed to be disabled when it's mounted:

```jsx
// imports...

describe("Button.cy.jsx", () => {
    it("should be disabled on mount", () => {
        //...
    });
});
```

Then, inside the callback (the second argument), write the code that will perform the test. For example, if the button is disabled when it's mounted, you can check if the button is disabled by using the `cy.get()` function to get the button and then using the `should()` function to check if the button is disabled:

```jsx
// imports...

describe("Button.cy.jsx", () => {
    it("should be disabled on mount", () => {
        cy.get('[data-cy="button"]').should("be.disabled");
    });
});
```

The first argument of `cy.get()`, `'[data-cy="button"]'` is an attribute of the actual button element. This is used to identify the button in the DOM.

```jsx
function Button() {
    // const handleClick = ()...

    return (
        <button data-cy="button" onClick={handleClick}>
            Click me
        </button>
    );
}
```

You can write multiple `it()` blocks inside a `describe()` block to test multiple things about the component.

### Running Component Tests

Once you're satisfied with the component tests, you can run them by running the following command:

```bash
yarn cypress
```

This will open the Cypress test runner. Select `Component Testing`. Then select the browser you'd like to run the tests in. Choose the component you'd like to test and then your results will be displayed.

If your component fails the tests, Cypress will inform you where and how the failure occurred. Edit your components appropriately.

---

## Features

### Profile Displays

Allows users to see the profiles of staff members including their id, first name, last name, email, and permission level. The example image shows the profile page with some test profiles.
![image](https://user-images.githubusercontent.com/113552143/201818540-2286f133-5cdc-45ff-b4af-f9e96b5bca2c.png)

### Pass Cart to Checkout

Allows for items in the cart/order page to be passed to checkout. The example images show how items from the order page can be moved to checkout.
![image](https://user-images.githubusercontent.com/113552143/201818929-81775b20-395c-4ea7-ac68-0797b9d87e49.png)
![image](https://user-images.githubusercontent.com/113552143/201826641-143ff46e-6c9a-4571-8d00-87d19b444231.png)

### Filter and Search Shipments + GUI to Modify Active Shipments

Allows users to search the shipments page by shipment ID, date, status, price, and priority. Also allows for the cancellation of active shipments or the option of rushing them if they are needed sooner by changing their priority. The example image shows the shipments list sorted by ID in the first image and by status in the second.
![image](https://user-images.githubusercontent.com/113552143/201818981-f3b0ed64-f046-4508-bb3a-064c49d94b54.png)
![image](https://user-images.githubusercontent.com/113552143/201820384-a5988e4d-a00d-4535-a4a4-366fd511c2b2.png)

### Warehouse GUI for Modifying and Reviewing Inventory

Allows for the viewing of warehouse inventory, adding/removing of items, and viewing of change history. The example image shows warehouse 123 after an item with ID 123 was added.
![image](https://user-images.githubusercontent.com/113552143/201820182-68c32d32-b3ef-4909-9473-6f341ea59751.png)
