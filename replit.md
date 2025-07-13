# Sachii Career Coach - Career Counseling Website

## Overview

Sachii Career Coach is a static website for a professional career counseling service. The website provides information about career counseling services, including career assessment, resume writing, interview coaching, and career planning. It's built as a multi-page HTML website with modern CSS styling and JavaScript functionality.

## System Architecture

### Frontend Architecture
- **Technology Stack**: Pure HTML5, CSS3, and vanilla JavaScript
- **Design Pattern**: Multi-page static website with shared navigation and styling
- **CSS Architecture**: Modular CSS with separate files for main styles and responsive design
- **JavaScript Architecture**: Class-based modules for different functionality areas

### Page Structure
- **Home Page** (`index.html`): Hero section with call-to-action
- **About Page** (`about.html`): Company mission and team information
- **Services Page** (`services.html`): Detailed service offerings
- **Contact Page** (`contact.html`): Contact form and information

### Styling System
- **CSS Variables**: Centralized design tokens for colors, typography, and spacing
- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
- **Typography**: Google Fonts integration (Inter and Poppins)
- **Icons**: Font Awesome 6.4.0 for iconography

## Key Components

### Navigation System
- **Mobile-First Navigation**: Hamburger menu for mobile devices
- **Active State Management**: Automatic highlighting of current page
- **Smooth Scrolling**: Enhanced user experience for navigation
- **Responsive Behavior**: Transforms between mobile and desktop layouts

### Form Validation
- **Real-time Validation**: Field-level validation on blur and input events
- **Error Handling**: Dynamic error display and clearing
- **Accessibility**: Proper form labeling and error announcements

### Animation System
- **Scroll-triggered Animations**: Intersection Observer API for performance
- **Staggered Animations**: Progressive reveal of content elements
- **Counter Animations**: Animated statistics for engagement

### Responsive Design
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1199px  
  - Desktop: 1200px+
  - Large Desktop: 1400px+
- **Flexible Layouts**: CSS Grid and Flexbox for adaptive layouts
- **Mobile Menu**: Collapsible navigation for mobile devices

## Data Flow

### Static Content Flow
1. HTML pages serve as content containers
2. CSS provides styling and responsive behavior
3. JavaScript enhances interactivity and user experience
4. External resources (fonts, icons) load asynchronously

### User Interaction Flow
1. User navigates between pages via navigation menu
2. Form submissions trigger validation and processing
3. Scroll events trigger animations and visual feedback
4. Mobile menu interactions modify navigation state

## External Dependencies

### CDN Resources
- **Google Fonts**: Inter and Poppins font families
- **Font Awesome**: Version 6.4.0 for icons
- **Performance**: All external resources loaded via CDN for optimal performance

### No Backend Dependencies
- Pure frontend implementation
- No database requirements
- No server-side processing needed

## Deployment Strategy

### Static Hosting
- **Development Server**: Python HTTP server on port 5000
- **Production Ready**: Can be deployed to any static hosting service
- **No Build Process**: Direct deployment of source files
- **CDN Compatible**: All resources optimized for CDN delivery

### Replit Configuration
- **Modules**: Node.js 20 and Python 3.11 available
- **Development**: Python HTTP server for local development
- **Workflows**: Automated server startup configuration

### Scalability Considerations
- Static files can be served from any web server
- CDN integration for global performance
- No server-side dependencies simplify deployment

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 19, 2025. Initial setup