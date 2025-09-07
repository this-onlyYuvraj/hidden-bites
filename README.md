Hidden Bites 🍴

Discover hidden food spots around you! Hidden Bites is a modern web application built with cutting-edge technologies to help food lovers explore, review, and share their favorite local restaurants.

### 🛠 Built With  
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![ShadCN/UI](https://img.shields.io/badge/ShadCN%2FUI-000000?style=for-the-badge&logo=radix-ui&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Google Maps API](https://img.shields.io/badge/Google%20Maps%20API-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white)
![Auth.js](https://img.shields.io/badge/Auth.js-000000?style=for-the-badge&logo=auth0&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

✨ Features

🗺 Google Maps Integration – Locate hidden restaurants and cafes nearby

📝 User Reviews – Submit and read reviews with avatar support

🔐 Authentication – Secure login/logout using Auth.js

🎨 Modern UI – Styled with Tailwind CSS & ShadCN components

⚡ Optimized Performance – Lazy-loaded images, efficient queries

📊 Prisma ORM – Simplified database management with type safety

📂 Project Structure
├── prisma/          # Prisma schema & migrations
├── app/             # Next.js App Router pages
├── components/      # Reusable UI components
├── lib/             # Utility functions & auth actions
├── public/          # Static assets
└── styles/          # Global styles

🔧 Installation & Setup

Clone the repository

git clone https://github.com/this-onlyYuvraj/hidden-bites.git
cd hidden-bites


Install dependencies

npm install


Setup environment variables
Create a .env file in the root and add:

DATABASE_URL="your-database-url"
GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
CLOUDINARY


Run Prisma migrations

npx prisma migrate dev


Start the development server

npm run dev


🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

created by: Yuvraj: [https://www.linkedin.com/in/yuvraj-095760328], Aman Singh: [https://www.linkedin.com/in/amancrafts-dev]
