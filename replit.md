# Overview

This is a full-stack job application portal for Trident Research Corporation, a scientific research company. The application allows users to submit job applications through a public form and provides an admin dashboard to view and manage applications. The system is built with a modern React frontend, Express.js backend, and PostgreSQL database with Drizzle ORM.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom corporate theme
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Validation**: Zod schemas shared between client and server
- **Session Storage**: Connect-pg-simple for PostgreSQL session storage
- **Development**: TSX for TypeScript execution

## Database Design
- **Applications Table**: Stores job application data (personal info, position, experience, education, skills, motivation)
- **Users Table**: Stores admin user credentials for dashboard access
- **Schema Location**: `shared/schema.ts` with Zod validation schemas

# Key Components

## Public Pages
- **Home Page**: Corporate landing page with company information, research areas, and job application form
- **Application Form**: Modal-based form with comprehensive validation for job applications

## Admin Dashboard
- **Authentication**: Simple username/password login stored in localStorage
- **Application Management**: View all applications, detailed application view, delete functionality
- **Data Visualization**: Applications displayed with badges for positions and timestamps

## Shared Components
- **Navigation**: Responsive navigation with mobile menu support
- **UI Components**: Comprehensive set of accessible UI components from Shadcn/ui
- **Form Components**: Reusable form elements with validation

# Data Flow

## Application Submission
1. User fills out application form on home page
2. Client-side validation using Zod schemas
3. Form data sent to `/api/applications` POST endpoint
4. Server validates data and stores in PostgreSQL database
5. Success/error feedback displayed to user

## Admin Authentication
1. Admin clicks admin login from navigation
2. Credentials sent to `/api/admin/login` endpoint
3. Authentication status stored in localStorage
4. Redirect to admin dashboard on success

## Application Management
1. Admin dashboard fetches applications from `/api/applications`
2. Applications displayed in sortable list with filtering options
3. Individual applications can be viewed in detail modal
4. Applications can be deleted with confirmation dialog

# External Dependencies

## Database
- **Neon Database**: Serverless PostgreSQL provider
- **Connection**: Via `@neondatabase/serverless` driver
- **Configuration**: Environment variable `DATABASE_URL` required

## UI Framework
- **Radix UI**: Headless UI components for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **Vite**: Fast build tool with HMR support
- **TypeScript**: Type safety across the entire stack
- **ESLint/Prettier**: Code quality and formatting (implied by project structure)

# Deployment Strategy

## Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations applied via `npm run db:push`

## Production Environment
- **Platform**: Replit with autoscaling deployment
- **Port Configuration**: Internal port 5000, external port 80
- **Environment**: NODE_ENV=production for optimized builds
- **Database**: PostgreSQL module enabled in Replit environment

## Development Workflow
- **Hot Reload**: Vite HMR for frontend, TSX for backend restart
- **Database Changes**: Schema changes via Drizzle push command
- **Type Safety**: Shared types between client/server via `shared/` directory

# Changelog

```
Changelog:
- June 26, 2025: Initial setup
- June 26, 2025: Removed phone number requirement from application form
- June 26, 2025: Fixed admin dashboard authentication and display issues
- June 26, 2025: Confirmed admin dashboard functionality with application management
```

# User Preferences

```
Preferred communication style: Simple, everyday language.
```