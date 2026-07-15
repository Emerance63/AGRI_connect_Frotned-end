# AgriConnect Rwanda

A modern web application built with Next.js 14 and TypeScript, designed to connect farmers, cooperatives, and buyers in Rwanda's agricultural ecosystem.

## Features

-  **Product Marketplace**: Browse and discover agricultural products
-  **User Authentication**: Secure login and registration system
-  **Dashboard**: Analytics and statistics for users
-  **Dark Mode**: Toggle between light and dark themes
-  **Responsive Design**: Mobile-first approach with Tailwind CSS
-  **Internationalization**: Multi-language support with translation hooks

## Tech Stack

- **Framework**: Next.js 14.2.0 (App Router)
- **Language**: TypeScript 5.4.0
- **Styling**: Tailwind CSS 3.4.0
- **State Management**: Zustand 4.5.7
- **Data Fetching**: TanStack React Query 5.45.0
- **Theme Management**: next-themes 0.3.0
- **Utilities**: clsx, tailwind-merge

## Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

## Project Structure

```
agriconnect-rwanda/
├── public/
│   └── images/                    # Static assets and images
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── (auth)/                # Authentication routes (route group)
│   │   │   ├── login/
│   │   │   │   └── page.tsx      # Login page
│   │   │   └── layout.tsx        # Auth layout wrapper
│   │   ├── dashboard/             # Dashboard pages
│   │   │   ├── layout.tsx        # Dashboard layout with sidebar
│   │   │   └── page.tsx          # Dashboard home
│   │   ├── products/              # Products pages
│   │   │   └── page.tsx          # Products listing page
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page (landing)
│   │   └── globals.css           # Global styles
│   ├── components/                # Reusable React components
│   │   ├── auth/                  # Authentication components
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── dashboard/             # Dashboard components
│   │   │   ├── Sidebar.tsx
│   │   │   └── StatsCards.tsx
│   │   ├── landing/               # Landing page components
│   │   │   ├── Hero.tsx
│   │   │   └── WhyChooseUs.tsx
│   │   ├── layout/                # Layout components
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── ThemeProvider.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── products/              # Product-related components
│   │   │   └── ProductCard.tsx
│   │   └── ui/                    # Base UI components
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Input.tsx
│   ├── hooks/                     # Custom React hooks
│   │   └── translate/             # Translation/internationalization hooks
│   ├── lib/                       # Utility functions and helpers
│   │   └── utils.ts               # Common utility functions
│   ├── store/                     # Zustand state management
│   └── types/                     # TypeScript type definitions
│       └── product.ts             # Product-related types
├── tailwind.config.ts             # Tailwind CSS configuration
├── package.json                   # Project dependencies and scripts
└── README.md                      # This file
```

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd agriconnect-rwanda
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `npm run dev` - Start the development server on http://localhost:3000
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Configuration

### Tailwind CSS

The project uses a custom Tailwind configuration with:
- **Brand Colors**: Green palette derived from AgriConnect branding
- **Accent Colors**: Amber palette for CTAs and highlights
- **Dark Mode**: Class-based dark mode support
- **Custom Fonts**: Sans and display font families

### Theme System

The application supports light and dark modes using `next-themes`. The theme toggle component is available in `src/components/layout/ThemeToggle.tsx`.

## Key Components

### Layout Components
- **Navbar**: Main navigation bar with responsive design
- **Footer**: Site footer with links and information
- **ThemeProvider**: Wraps the app to provide theme context

### Page Components
- **Landing Page**: Hero section and feature highlights
- **Products Page**: Product listing and browsing
- **Dashboard**: User dashboard with statistics
- **Authentication**: Login and registration forms

### UI Components
- **Button**: Customizable button component
- **Card**: Card container for content
- **Input**: Form input fields
- **Badge**: Status and category badges

## State Management

The application uses Zustand for global state management. Store files are located in `src/store/`.

## TypeScript Types

Type definitions are organized in `src/types/` for better maintainability:
- `product.ts` - Product-related interfaces and types

## Styling Guidelines

- Use Tailwind CSS utility classes for styling
- Follow the design system colors defined in `tailwind.config.ts`
- Ensure responsive design with mobile-first approach
- Support both light and dark themes

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For questions or support, please contact the development team.

---

Built with for Rwanda's agricultural community