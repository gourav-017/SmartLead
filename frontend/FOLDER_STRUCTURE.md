# Frontend Folder Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx       # App header with title and icons
│   │   ├── StatsCard.jsx    # Individual statistic card component
│   │   ├── StatsGrid.jsx    # Grid layout for statistics cards
│   │   ├── LeadForm.jsx     # Form for processing leads
│   │   ├── FilterButtons.jsx # Status filter buttons
│   │   └── LeadsTable.jsx   # Table displaying leads data
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useLeads.js      # Hook for managing leads data
│   │   └── useStats.js      # Hook for managing statistics
│   │
│   ├── services/            # API service layer
│   │   └── api.js           # Axios client and API functions
│   │
│   ├── utils/               # Utility functions
│   │   ├── formatters.js    # Data formatting utilities
│   │   └── validators.js    # Input validation utilities
│   │
│   ├── constants/           # Constants and configuration
│   │   ├── api.js           # API endpoints and base URL
│   │   └── status.js        # Status constants and colors
│   │
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles and Tailwind directives
│
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── postcss.config.js       # PostCSS configuration
```

## Component Responsibilities

### Components
- **Header.jsx**: Displays app title with animated icons
- **StatsCard.jsx**: Reusable card for displaying statistics with icons
- **StatsGrid.jsx**: Container for statistics cards grid
- **LeadForm.jsx**: Form component with validation and async handling
- **FilterButtons.jsx**: Filter buttons with icons and active states
- **LeadsTable.jsx**: Data table with loading states and animations

### Hooks
- **useLeads.js**: Manages leads data fetching, loading, and error states
- **useStats.js**: Manages statistics data with auto-refresh

### Services
- **api.js**: Centralized API client with interceptors and error handling

### Utils
- **formatters.js**: Data formatting functions (confidence, dates, etc.)
- **validators.js**: Input validation logic

### Constants
- **api.js**: API endpoints and base URL configuration
- **status.js**: Status constants and color mappings

## Best Practices Followed

✅ **Separation of Concerns**: Each file has a single responsibility
✅ **Reusability**: Components are modular and reusable
✅ **Error Handling**: Proper try-catch blocks throughout
✅ **Async/Await**: Proper async handling with error boundaries
✅ **Type Safety**: Input validation and error checking
✅ **User Feedback**: Toast notifications for all user actions
✅ **Loading States**: Loading indicators for async operations
✅ **Accessibility**: Semantic HTML and ARIA labels where needed

