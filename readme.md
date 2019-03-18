# Comprehensive Technical Assessment - Practical

## Opening Remarks

This exam, like many exams before it, will be an **open-book, project-driven exam**.

You are permitted the use of online resources, including your notes. However, you are not permitted to discuss the exam with your peers or to share code. If you have questions, or would like to discuss details of the exam, please talk to an instructor or TA.

You are welcome (encouraged, required) to utilize GitHub and Git for this exam. Until the conclusion of the exam period, please **make your repositories private** and invite the Web Instructional staff as collaborators to your repo. 

As you continue to work through this project make regular commits because we will be monitoring your commit history for code consistency and educational integrity.

## Exam - Earworm Report

You are working at a start-up developer shop. Your new client has an idea for a web application that she's calling *Earworm Report*. Earworm Report will be a full-stack application where users can post, comment on, and favorite songs that get stuck in their heads. She is asking you to build a proof of concept - "nothing production-ready" - and is asking for a specific set of core features:

* The app does **not** need user authentication, and does not need passwords - only usernames. Create an example account and build your app as if that user is always logged in.
* Users should be able to **post songs** that get stuck in their heads. These songs are shared on their profile pages and also in the broader community feed with attribution to the user that posted the song.
* Users should be able to **browse and search** other users' songs. Users can search by name, sort by genre, or sort by number of favorites. They can also view the profile pages of other users.
* Users should be able to **favorite** other users' songs. Favoriting a song will improve that song's ranking when users sort by popularity, as well as adding it to a "favorites" section of the user's profile.
* Users should be able to **comment** on other users' songs. Comments should include the comment's text as well as the username of the user who posted the comment.

Based on this description, project managers in your team have created a specification for how they'd like the app to be structured and styled. If they don't specifically outline the implementation of a feature, consider the technique up to you.

They will start with the database (PostgreSQL), move toward the backend (Express), and finish with a spec of the frontend (React). Good luck!

### Database Structure

The following tables and columns will be necessary.

- **Users**
  - id
  - username - *Unique*
- **Genres**
  - id
  - genre_name - *Unique*
- **Songs**
  - id
  - title
  - img_url
  - user_id - *References Users*
  - genre_id - *References Genres*
- **Favorites**
  - id
  - user_id - *References Users*
  - song_id - *References Songs*
- **Comments**
  - id
  - comment_body
  - user_id - *References Users*
  - song_id - *References Songs*

Create an `.sql` file to create these tables and seed this database with at least **10 users**, **5 genres**, **15 songs**, **40 favorites**, and **20 comments**. Your first user should be your sample user - the user that we will automatically be logged-in as.

### API Endpoints

Your API Endpoints should include at least:

- **Users**
  - GET all users
  - GET single user
  - POST new user
  - DELETE single user
- **Genres**
  - GET all genres
  - POST new genre
- **Songs** - *You are welcome and encouraged (not required) to get the total number of favorites for each song in these queries. You are even more welcome to sort songs by popularity (number of favorites) in this query.*
  - GET all songs
  - GET all songs for specific genre
  - GET all songs posted by a specific user
  - GET one song
  - POST new song
  - DELETE single song
- **Favorites**
  - GET all favorites
  - GET all favorites for specific song
  - GET all favorites for specific user
  - POST new favorite
  - DELETE single favorite
- **Comments**
  - GET all comments
  - GET all comments for specific song
  - POST new comment
  - PATCH single comment
  - DELETE single comment

### Frontend Routing

You should have the following routes on your frontend:

- `/` - A homepage that reads "Earworm Report" in an `h1` tag.
  - Also renders a navigation bar across the top of the page, visible on every subsequent route.
  - Navbar should have the following links: "Home," "All Songs," "By Popularity," "By Genre," and "My Profile".
- `/songs` - AKA "All Songs." A page that renders all of the songs on the site, as well as offering search functionality by song title. Songs should, by default, be sorted how recently they were posted.
  - Includes a `form` tag containing a `text` input and a `submit` button. Label - "Search By Title."
    - When a user enters part or all of a song's title (not case sensitive) and clicks "Search" (submit), the list of songs should be filtered to only the songs with titles that correspond to what the user was searching for.
  - Each song should include title, image (based on the `img_url` column in the `Songs` table), and total number of favorites. They should also include the user's username, which should be a link to that user's profile (`/profile/:id`).
  - Each song should include a button, "Favorite," that allows the user to favorite a specific song.
    - When the user clicks to favorite a song, the button's text should change to "Unfavorite", and the button's functionality should change from sending a POST request to a DELETE.
    - Ensure that the song's total number of favorites always reflects the user's input.
  - Each song should include a comment section underneath the song title, displaying all comments for that song. Comments should include the user who submitted them. Clicking on their username should link you to that user's profile page (`/profile/:id`).
    - Underneath each list of comments, there should be a `form` tag with a `text` input and a `submit` button that reads: "Add Comment."
    - When the user submits this form, they should POST a new comment to the song. The list of comments should then reflect this new comment on the frontend.
- `/songs/bypop` - AKA "By Popularity." A list of all songs sorted by number of favorites. No search functionality required.
  - Songs should include favorites, comments, and their accompanying functionalities - exactly as described in the `/songs` route above.
- `/songs/bygenre` - AKA "By Genre."
  - At first, this route should look exactly like `/songs`, sorted by post date, and with each song including favorites, likes, and their accompanying functionalities.
  - However, there should be a `select` input in the form instead of a `text` input. By default, this should be blank, displaying all songs. It should be populated with `option` tags representing each genre in the `Genres` table of your database.
    - When the user selects a specific genre and submits the form, the feed should update to only include songs from the genre that the user selected.
- `/profile` - AKA "My Profile." The logged-in user's profile. On the top of the screen, in a header tag of your choice, should be the user's username.
  - Below this, there should be two buttons next to each other - "Posted" and "Favorites." One or the other should be highlighted (with a distinctive background color) depending on which one is selected. By default, "Posted" should be selected.
  - Below this should be a feed with all of the songs the user posted, if "Posted" is selected, or that the user favorited, if "Favorites" is selected. These song items should look and behave as described in the `/songs` route.
  - If "Posted" is selected, above this feed, there should be a form where a user may submit a new song. This form should have `text` inputs for a song's title and image URL (use Google Images results for image URLs).
    - When the form is submitted, submit a POST request to the backend, add it to the `Songs` table of your database, and ensure that all frontend feeds reflect the new song.
- `/profile/:id` - Any other user's profile. This route is accessed by clicking on a user's username, and is identical to the `/profile` route, with one exception - you should not be able to post a new song from another user's profile.

### Styling

- Please utilize the wireframes in the folder "wireframes" in this repository for layout instructions. If you are not given exact pixel measurements by the wireframes, then come up with your own - it's more important that you get the general layout of items than exact pixel widths.
  - `layout.png` provides you with a general sense of where content should go, and is the only file with exact pixel measurements. Please follow this to a T.
  - `home.png` gives you a sense of what the homepage should look like.
  - `feed.png` should give you a sense of what "All Posts", "By Genre", and "By Popularity" should look like.
  - `profile.png` should give you a sense of what a user's profile should look like, as well as how it should be laid out.
- Please import *at least* two fonts from Google Fonts, using one for large text and one for small text.
- The color scheme of the site should be as follows:
  - Primary color: A nice dark violet. Hex code #621389.
  - Secondary color: Light gray, but not white. Hex code #d1d1d1.
  - Highlight color: Seafoam! Hex code #00f281.
  - Text colors: Utilize #d1d1d1, black, or white, as needed for visibility.
  - Please utilize these colors in your design. Try to utilize your primary and secondary colors for most backgrounds, reserving the highlight color for selections, important borders - anything you want to make pop. However, ultimately, the way you utilize them is **up to you.** Have fun with it!
