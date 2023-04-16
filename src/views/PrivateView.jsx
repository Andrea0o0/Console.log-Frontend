import React from 'react'

export default function PrivateView() {
  return (
    <div>
      <h5>This view can only be seen if the user is logged in because it's inside the IsPrivate component.</h5>
    </div>
  )
}


// {
//   "name": "project3-frontend",
//   "version": "0.1.0",
//   "private": true,
//   "dependencies": {
//     "@fortawesome/fontawesome-svg-core": "^6.4.0",
//     "@fortawesome/free-brands-svg-icons": "^6.4.0",
//     "@fortawesome/free-regular-svg-icons": "^6.4.0",
//     "@fortawesome/free-solid-svg-icons": "^6.4.0",
//     "@fortawesome/react-fontawesome": "^0.2.0",
//     "@testing-library/jest-dom": "^5.16.5",
//     "@testing-library/react": "^13.3.0",
//     "@testing-library/user-event": "^13.5.0",
//     "axios": "^0.27.2",
//     "codemirror": "^5.65.12",
//     "dotenv": "^16.0.2",
//     "jwt-decode": "^3.1.2",
//     "react": "^18.2.0",
//     "react-codemirror2": "^7.2.1",
//     "react-dom": "^18.2.0",
//     "react-hot-toast": "^2.3.0",
//     "react-router-dom": "^6.3.0",
//     "react-scripts": "5.0.1",
//     "tailwindcss": "^3.3.1",
//     "web-vitals": "^2.1.4"
//   },
//   "scripts": {
//     "start": "react-scripts start",
//     "build": "react-scripts build",
//     "test": "react-scripts test",
//     "eject": "react-scripts eject"
//   },
//   "eslintConfig": {
//     "extends": [
//       "react-app",
//       "react-app/jest"
//     ]
//   },
//   "browserslist": {
//     "production": [
//       ">0.2%",
//       "not dead",
//       "not op_mini all"
//     ],
//     "development": [
//       "last 1 chrome version",
//       "last 1 firefox version",
//       "last 1 safari version"
//     ]
//   }
// }