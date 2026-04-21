# Organic Products E-Commerce Platform

This document outlines the implementation plan for the academic e-commerce web application tailored for buying and selling organic products. It features a Django REST Framework backend and a React.js (with Bootstrap) frontend.

## Proposed Changes

### Backend Setup (Django + DRF)

We will create a Django project named `backend` and an app named `api`.
The backend will expose a RESTful API and use SQLite as the database.

- **Dependencies**: `django`, `djangorestframework`, `djangorestframework-simplejwt`, `django-cors-headers`, `pillow`.
- **Models**:
  - `User`: Default Django User model (used for authentication).
  - `Product`: Fields will include `name` (Char), `image` (Image), `whatsapp_number` (Char), `location` (Char), `description` (Text), `seller` (ForeignKey to User), `created_at` (DateTime).
- **Authentication**: JWT-based authentication using `djangorestframework-simplejwt`.
  - Registration endpoint (creating a new User).
  - Login endpoint (returning JWT tokens).
- **Views**:
  - `ProductListCreateView`: For fetching all products (buyers browsing) and creating a product (authenticated sellers).
  - `ProductDetailView`: For retrieving product details.
  - `RegisterView`: For user registration.
- **Admin**: All models will be registered in `admin.py` for easy management.

### Frontend Setup (React.js + Bootstrap)

We will initialize a React project named `frontend` using Vite for faster development and tooling.
The UI will be minimal, styled with Bootstrap, and feature a prominent footer.

- **Dependencies**: `react-router-dom` (routing), `axios` (API calls), `bootstrap` (styling), `jwt-decode` (managing auth tokens).
- **Components**:
  - `Navbar`: Navigation links (Home, Sell, Login/Register or Logout).
  - `Footer`: A prominent footer with information about the platform.
  - `ProductCard`: A reusable component to display product summaries.
- **Pages**:
  - `Home`: Displays a grid of `ProductCard` components.
  - `ProductDetail`: Shows full details of a product, including the seller's WhatsApp number.
  - `SellProduct`: A form for authenticated users to list a new organic product.
  - `Login`: User login form.
  - `Register`: User registration form.
- **State Management**: Using React Context API or simple state management to hold the user's authentication status and token.

## Constraints Adhered To

- **NO Payment Gateway**: The platform solely connects buyers and sellers. Transactions happen outside the platform (facilitated by the provided WhatsApp number).
- **NO Delivery System**: Shipping and delivery coordination is left to the buyer and seller.
- **Clean Code**: Code will be modular, well-commented, and suitable for academic submission.

## User Review Required

> [!IMPORTANT]  
> Please review the plan above. 
> 
> A few details to confirm:
> 1. Are there any specific fields you want to add to the `Product` model other than Name, Image, WhatsApp number, Location, and Description?
> 2. For the "prominent footer", do you have any specific text or links you would like included?

Once you approve, I will begin implementing the project step-by-step.
