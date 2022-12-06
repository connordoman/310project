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
