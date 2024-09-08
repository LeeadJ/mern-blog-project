# MERN Blog Project

This project implements a MERN stack-based blogging platform where users can register, login, create, edit, and view posts.

## Features

- **Authentication:** Users can register with a username and password, login securely, and logout.
- **Authorization:** Protected routes ensure only authenticated users can create and edit posts.
- **Post Management:** Users can create new posts with a title, summary, content, and an optional cover image. They can also edit existing posts.
- **Post Viewing:** Posts are displayed on the homepage, and users can click through to view full posts.
- **File Upload:** Uses multer for file upload capabilities, allowing users to upload cover images for their posts.
- **Responsive UI:** Simple and responsive UI using React and React Router for navigation.


## Setup Instructions

1. **Clone the Repository**
    - `git clone https://github.com/LeeadJ/mern-blog-project.git`
    - `cd mern-blog-project`

2. **Install Dependencies**
    - `yarn install`

3. **Backend Setup:**
   - Navigate to the `api/` directory and run `yarn install` to install dependencies.
   - Start the backend server with nodemon `nodemon index.js`.

2. **Frontend Setup:**
   - Navigate to the `client/` directory and run `yarn install` to install dependencies.
   - Start the frontend development server with `yarn start`.

3. **Database Setup:**
   - MongoDB Atlas is used as the database. Ensure you have a valid connection string in `api/index.js`.

4. **Usage:**
   - Open your browser and go to `https://frontend-proj-7zgz.onrender.com` to view the application.

## Technologies Used

- **Frontend:** React.js, React Router, React Quill (for text editing), Axios (for API calls), HTML, CSS.
- **Backend:** Node.js, Express.js, MongoDB (mongoose for ORM), JWT (for authentication), multer (for file uploads).
- **Deployment:** Local development setup. For production deployment, consider deploying frontend and backend separately.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your suggested changes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.



