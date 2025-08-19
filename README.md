# Admin Website

A modern admin dashboard built with Next.js, TypeScript, and Firebase.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Firebase** for authentication and database
- **Tailwind CSS** for styling
- **Responsive Design** for all devices
- **Admin Dashboard** with authentication
- **Firebase Hosting** ready

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd admin-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Firebase**
   - Create a new Firebase project
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Enable Storage (if needed)

4. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

## 🏃‍♂️ Development

```bash
# Start development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📦 Build

```bash
# Build for production
npm run build
# or
yarn build
```

## 🚀 Deployment

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

4. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard pages
│   ├── auth/              # Authentication pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
├── lib/                   # Utility libraries
│   └── firebase.ts        # Firebase configuration
└── types/                 # TypeScript type definitions
```

## 🔐 Authentication

The application uses Firebase Authentication with email/password. To create an admin user:

1. Go to Firebase Console
2. Navigate to Authentication > Users
3. Add a new user with email and password
4. Use these credentials to log in to the admin dashboard

## 🎨 Customization

- **Styling**: Modify `tailwind.config.js` for custom colors and themes
- **Components**: Add new components in `src/components/`
- **Pages**: Create new pages in `src/app/`
- **Firebase**: Configure additional Firebase services in `src/lib/firebase.ts`

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request








