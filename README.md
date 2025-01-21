# Twinkl React Posts Application

A React application that interacts with a Posts management API (https://jsonplaceholder.typicode.com/posts) to perform CRUD operations (Create, Read, Update, Delete). The application is be implemented using TypeScript.

## Thoughts

- The API doesn't actually delete posts, so refetching correct information to update the UI isn't possible - attempted to add optimistic updates but ran into issues since the response doesn't provide updated information
- Wireframes are very bare-bones, so I took some liberties and kept the UI simple given the short timeframe to do the test.

## Future Considerations

- Add debouncing to post-api queries (especially on search query)
- Make delete mutation optimistically update the UI / query cache
- Make re-fetch / optimistic UI smoother (grey-out deleted post)

#### Requirements

##### Fetch and display posts

- Implement a component that fetches the list of posts from https://jsonplaceholder.typicode.com/posts - [x]
- Display all fetched posts in a list format. - [x]

##### Search mechanism

- Implement a search bar that allows a user to search for posts by title and display only the desired posts. The search should be triggered on change. - [x]

##### Delete post

- For each post in the list, provide a "Remove" button. - [x]
- Implement the functionality to delete a post when the "Remove" button is clicked, using the appropriate server-side REST API method DELETE. - [x]

##### Testing

- Write sufficient tests to satisfy a production-ready application. - [x]

##### Documentation

- Add appropriate documentation for your application. - [x]

#### Wireframes

##### Mobile

![mobile_view](src/assets/mobile_view.png?raw=true)

##### Desktop

![pc_view](src/assets/pc_view.png?raw=true)

## Getting Started

### Prerequisites

- Node.js: Ensure you have Node.js version 20 or higher installed.

### Installation

#### Clone the repository:

```
git clone https://github.com/spn1/twinkl-post-application
```

```
cd twinkl-post-application
```

#### Install dependencies:

```
yarn
```

### Scripts

#### Development Server: Start the development server.

```
yarn dev
```

#### Lint: Lint the codebase.

```
yarn lint
```

#### Lint & Fix: Lint and automatically fix issues in the codebase.

```
yarn lint:fix
```

#### Format: Format the codebase using Prettier.

```
yarn format
```

#### Test: Run the test suite.

```
yarn test
```
