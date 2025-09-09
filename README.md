# Movies Catalog

A React web application that lets users search movies using the OMDb API, save movies to a personal favorites list or custom lists they create, and persist user data using Firebase (Auth + Firestore).

## Features

- **Authentication**: Sign up and sign in with email/password using Firebase Authentication
- **Movie Search**: Search movies using OMDb API with poster, title, year, and type display
- **Movie Details**: View detailed information including plot, director, actors, and ratings
- **List Management**: Create custom lists and add/remove movies from lists
- **Firestore Persistence**: User data and lists are stored in Firestore
- **Responsive Design**: Works on mobile and desktop using TailwindCSS

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase project
- OMDb API key

### 1. Clone the Repository

```bash
git clone <repository-url>
cd movies-catalog
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Get API Keys

#### OMDb API Key
- Go to [OMDb API](https://www.omdbapi.com/apikey.aspx)
- Sign up for a free API key
- Copy the API key

#### Firebase Configuration
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project or use an existing one
- Enable Authentication with Email/Password provider
- Enable Firestore Database
- Go to Project Settings > General > Your apps > Add Web App
- Copy the Firebase config object

### 4. Environment Variables

Create a `.env.local` file in the root directory and add your API keys:

```env
# OMDb API Key
REACT_APP_OMDB_API_KEY=your_omdb_api_key_here

# Firebase Config
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 5. Run the Application

```bash
npm start
```

The app will run on `http://localhost:3000`

### 6. Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── api/
│   └── omdb.js              # OMDb API functions
├── components/
│   ├── AddToListModal.js    # Modal for adding movies to lists
│   ├── MovieCard.js         # Movie card component
│   ├── MovieList.js         # List of movie cards
│   ├── Navbar.js            # Navigation bar
│   └── SearchBar.js         # Search input component
├── contexts/
│   └── AuthContext.js       # Authentication context
├── firebase/
│   ├── firebaseConfig.js    # Firebase configuration
│   └── firestore.js         # Firestore utility functions
├── pages/
│   ├── Auth.js              # Authentication page
│   ├── Home.js              # Home page with search
│   ├── Lists.js             # User lists page
│   └── MovieDetails.js      # Movie details page
├── App.js                   # Main app component
├── index.js                 # App entry point
└── index.css                # Global styles with Tailwind
```

## Firestore Schema

### Users Collection
```
users/
  {uid}/
    - displayName: string
    - email: string
    - createdAt: timestamp
    - lists (subcollection)
      - {listId}/
        - name: string
        - createdAt: timestamp
        - isDefault: boolean
        - isPublic: boolean
        - listItems (subcollection)
          - {itemId}/
            - imdbID: string
            - title: string
            - year: string
            - poster: string
            - addedAt: timestamp
```

## Deployment

### Netlify

1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Set environment variables in Netlify dashboard

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`
3. Set environment variables in Vercel dashboard

## Technologies Used

- React 18
- React Router DOM
- Firebase Authentication
- Firestore
- OMDb API
- TailwindCSS
- Axios
- Create React App

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
