# FUANIME

FUANIME is a web application designed to help users search and watch anime videos. It uses a custom-built API to fetch and display video content.

## Features

- **User Authentication**: Users can log in and log out using OAuth2 authentication.
- **Video Search**: Search for anime videos using keywords.
- **Video Playback**: Watch videos directly on the platform.
- **Suggested Videos**: Get video suggestions based on the current video being watched.
- **Load More Videos**: Load more videos as you scroll down the page.
- **Light Mode & Dark Mode**: Able to change to meet user preferences.

## Technologies Used

- **Frontend**: React.js, React Router, SCSS, HTML, Javascript
- **Backend**: None (API provided externally)
- **Authentication**: OAuth2

## Installation

### Prerequisites

- Node.js
- npm or yarn

### Frontend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/phu3112004/fuanime.git
    ```

2. Navigate to the project directory:

    ```bash
    cd fuanime
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Update the API configuration in `src/config/apikeys.js` with your API server URL.
  ```
   const CLIENT_ID = get by OAuth2;

   const apikey = {
    API_KEY: //get by using YouTube Data API v3 on Google Cloud,
    CHANNEL_ID: //any Anime Youtube channel id you want,
    GET_LINK_TOKEN = "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&response_type=token&redirect_uri=http://localhost:3000/&client_id=${CLIENT_ID}"
   }

export default apikey;
```
5. Start the frontend server:

    ```bash
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Log in using the OAuth2 authentication method.
3. Use the search bar to find anime videos.
4. Click on a video to watch it.
5. Explore suggested videos and load more content as you scroll.

## API Documentation

The FUANIME API provides endpoints for fetching video data, user authentication, and more.

### Authentication

- **GET /auth/login**: Redirects to the OAuth2 login page.
- **GET /auth/callback**: Handles the OAuth2 callback and retrieves the access token.

### Videos

- **GET /api/videos**: Fetch a list of videos. Supports query parameters for searching and pagination.
- **GET /api/videos/:id**: Fetch details of a specific video.

## Contributing

Welcome contributions from the community! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch to your fork.
4. Create a pull request with a detailed description of your changes.
   
## Contact

If you have any questions or suggestions, please feel free to contact me at 22521105@gm.uit.edu.vn.

## Video Demo
[Link to video](https://drive.google.com/file/d/1cMRScVjQr5iMb6Yn7OVYrKOr9FPrF-Iv/view?usp=sharing)

