# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# product-cartlist
# Product-Cart-
# ProductCart - Inventory Management System

A modern, professional inventory management application built with React, Vite, and Tailwind CSS. Manage your products efficiently with an intuitive user interface, real-time analytics, and comprehensive product management features.

## 📋 Features

- **User Authentication**: Secure login system with hardcoded credentials for testing
- **Product Management**: Add, edit, and delete products with ease
- **Real-time Analytics**: View comprehensive inventory statistics and category distributions
- **Responsive Design**: Fully responsive UI that works on all devices
- **Modern UI/UX**: Beautiful gradient backgrounds, smooth animations, and professional styling
- **Dual View Modes**: Switch between list and grid views for product display
- **Category Management**: Filter and organize products by category
- **Inventory Tracking**: Monitor stock levels and inventory value
- **Search Functionality**: Quick search for products by name or category

## 🚀 Steps to Run

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone the Repository**
	```bash
	git clone https://github.com/Sachidanand-sah/Product-Cart-.git
	cd ProductCartList
	```

2. **Install Dependencies**
	```bash
	npm install
	```

3. **Start Development Server**
	```bash
	npm run dev
	```
	The application will be available at `http://localhost:5173`

4. **Build for Production**
	```bash
	npm run build
	```

5. **Preview Production Build**
	```bash
	npm run preview
	```

## 🔐 Login Credentials

Use the following hardcoded credentials to access the application:

| Field | Value |
|-------|-------|
| **Email/Username** | `DemoUser` |
| **Password** | `DemoUser` |

> ⚠️ **Note**: These are test credentials for development purposes only.

## 📡 API Used

**Fake Store API** - https://fakestoreapi.com

The application uses the Fake Store API for product data. Endpoints utilized:

- **GET** `/products` - Fetch all products
- **POST** `/products` - Create a new product
- **PUT** `/products/{id}` - Update a product
- **DELETE** `/products/{id}` - Delete a product

> **Note**: Since Fake Store API is read-only for modifications, the create, update, and delete operations are simulated in the application's state management.

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI Framework |
| **Vite 7** | Build Tool |
| **Tailwind CSS 4** | Styling |
| **Recharts 3** | Data Visualization |
| **Axios** | HTTP Client |
| **Lucide React** | Icons |
| **React Router DOM 7** | Navigation |

## 📁 Project Structure

```
ProductCartList/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation header
│   │   ├── ProductForm.jsx       # Product add/edit form
│   │   ├── AnalyticsPanel.jsx    # Analytics & statistics dashboard
│   │   └── ConfirmDialog.jsx     # Confirmation dialog
│   ├── pages/
│   │   ├── Login.jsx             # Login page with signup
│   │   └── ProductsPage.jsx      # Main products management page
│   ├── App.jsx                   # Main app component
│   ├── api.js                    # API configuration
│   ├── auth.js                   # Authentication utilities
│   └── main.jsx                  # Entry point
├── public/                       # Static assets
├── package.json                  # Dependencies and scripts
├── vite.config.js               # Vite configuration
└── tailwind.config.js           # Tailwind CSS configuration
```

## 🎨 Key UI Enhancements

- **Professional Gradient Backgrounds**: Modern animated gradients throughout the application
- **Responsive Grid System**: Automatically adapts to different screen sizes
- **Interactive Charts**: Real-time analytics with pie and bar charts
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Modal Dialogs**: Beautiful modals for forms and confirmations
- **Category Breakdown**: Detailed statistics and visual representations

## 💻 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Quality

The project uses ESLint for code quality and follows React best practices.

## 📊 Analytics Dashboard

The application includes a comprehensive analytics panel showing:

- **Total Products**: Count of all products in inventory
- **Total Stock**: Sum of all product quantities
- **Average Price**: Mean price across all products
- **Inventory Value**: Total monetary value of all stock
- **Category Distribution**: Visual breakdown of products by category
- **Category Statistics**: Detailed charts and tables for each category

## 🔄 Authentication Flow

1. User opens the application
2. Redirected to login page if not authenticated
3. Enter credentials:
	- Email: `Sachit@gmail.com`
	- Password: `Sachit@123`
4. System validates credentials (hardcoded for testing)
5. Token is generated and stored in localStorage
6. User is redirected to products dashboard
7. Logout clears token and returns to login page

## 🛡️ Security Notes

- Tokens are stored in localStorage
- Authentication state is persisted across page refreshes
- Protected routes prevent unauthorized access
- All passwords should be properly hashed in production

## 📱 Responsive Breakpoints

- **Mobile**: Up to 640px
- **Tablet**: 641px to 1024px
- **Desktop**: 1025px and above

## 🚀 Performance

- Optimized images with lazy loading
- Efficient state management
- Minimized re-renders
- Production-ready build with tree-shaking

## 🎯 Future Enhancements

- User registration system
- Password reset functionality
- Product image upload
- Advanced filtering and sorting
- Inventory alerts and notifications
- Export functionality (CSV, PDF)
- Multi-user support with roles
- Database integration

## 👨‍💻 Developer Information

**Full Name**: Sachidanand Sah

**Email**: Sachit@gmail.com

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Support

For issues, suggestions, or contributions, please open an issue or submit a pull request on the GitHub repository.

---

**Task Completed: Yes**
