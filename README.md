# ThoughtseedOS — A web-based showcase of Thoughtseed Labs projects

A modern web-based portfolio site inspired by classic macOS, showcasing Thoughtseed Labs projects and services. Built with Next.js, TypeScript, and Tailwind CSS. Features an intuitive desktop-like interface that works seamlessly across all devices—mobile, tablet, and desktop. Inspired by ryOS 8.2

## Features

### Desktop Environment

- Authentic macOS-style desktop interactions
- Multi-instance window manager with support for multiple windows per app
- Interactive project and service windows
- Menubar with contextual menus and navigation
- Icon and list views for project browsing
- Customizable wallpapers
- System-wide sound effects for enhanced interactivity
- Responsive design that works on all devices

### Built-in Applications

- **Projects Folder**: Showcases all Thoughtseed Labs projects
  - Categorized by technology and type
  - Detailed project information and screenshots
  - Multiple image carousel for visual exploration
  - Links to live projects where available
  
- **Services Dialog**: Displays all services offered by Thoughtseed Labs
  - Grid layout of all available services
  - Detailed service information on selection
  - Visual representation of service offerings

- **About**: Information about Thoughtseed Labs
  - Company mission and vision
  - Team information
  - Core competencies

- **Contact**: Easy ways to get in touch
  - Contact form
  - Social media links
  - Business inquiries

## Technology Stack

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript for enhanced development
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Framer Motion**: Animation library for fluid UI transitions
- **Shadcn/UI**: UI component library with a focus on accessibility

## Directory Structure

```
├── public/
│   ├── assets/      # Project screenshots and images
│   └── icons/       # Application and project icons
├── src/
│   ├── components/  # Reusable UI components
│   │   ├── dialogs/ # Dialog components (Projects, Services, etc.)
│   │   ├── layout/  # Layout components (MenuBar, etc.)
│   │   └── ui/      # Base UI components
│   ├── data/        # JSON data files for projects and services
│   ├── hooks/       # Custom React hooks
│   ├── lib/         # Utility functions and libraries
│   └── styles/      # Global styles and theme configurations
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Development

The project uses:

- TypeScript for type safety
- ESLint for code quality
- Tailwind for utility-first CSS
- shadcn/ui components built on Radix UI primitives
- Lucide icons
- Vercel for deployment

## Deployment

The site is optimized for deployment on Vercel, Netlify, or any other Next.js compatible hosting service.

## License

Copyright © 2025 Thoughtseed Labs. All rights reserved.
