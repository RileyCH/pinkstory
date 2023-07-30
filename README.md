<div align="center">
  <a href="https://pinkstory.vercel.app/" style="margin-bottom:20px; display:block;">
    <img src="./public/pinkStory.png" alt="Logo" width="100px">
  </a>
</div>

# PinkStory

[PinkStory](https://pinkstory.vercel.app/) is a photo sharing social media with real-time live streaming and messaging features. Inspired with abounding advertisements on the Internet platforms, PinkStory is equipped with shopping record and stocks managing feature to prevent over-shopping.

## Features

- Interactive live streaming
- Shopping record and stocks managing system
- Real-Time messaging
- Creating and exploring posts
- Following and tagging users

## About PinkStory

- Implemented `Next server-side rendering (server component)` to improve SEO performance and user experience of article pages
- Concatenated `100ms`, the third party SDK's `WebRTC` technology, to implement interactive live streaming services; also utilizing `Next` built-in `serverless APIs` and `Ngrok` to receive 100ms’ POST requests and passed the live streaming data to firebase datastore
- Managed and stored reusable and global state with `Redux Toolkit` preventing prop drilling issue
- Adopted `TypeScript` for type checking to enhance code reliability and reduce unexpected bugs
- Utilized `Tailwind CSS` to rapidly realize `responsive web design(RWD)` layout
- Leveraged `Firebase Firestore` and `Cloud Storage` for NoSQL data storage and retrieval
- Combined `Geolocation API` and `Google Maps` to record the user’s location and show the city and area information of each post
- Used `Canvas API` and `React-easy-crop` library to crop post image before uploading pictures
- Implemented `skeleton` materials to optimize user experience
- Leveraged `Jest` to conduct unit testing.

## Built with

#### Base

- React
- Next App Router
- TypeScript
- Redux(RTK)
- Tailwind CSS
- Firebase
- Git
- ESLint
- Jest

#### Libraries & Tools

- 100ms WebRTC SDK
- React-easy-crop
- Emoji-picker-react
- Day.js
- @Mui/x-date-pickers
- @Mui/material
- Firebase Firestore
- Firebase Cloud Storage
- Firebase Auth
- Ngrok
- Axios
- Geolocation API and Google Maps

#### Contact

  <a href="https://www.linkedin.com/in/yucingchang/" text-decoration="none">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
  <a href="mailto:fantasy821116@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" />
  </a>
