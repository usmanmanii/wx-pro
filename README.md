live vercel url : https://vercel.com/usmanmaniis-projects/wx-pro-new

Coverd Features
- UI for Leads form and Leads dashboard page
- Form validation and error handling
- Manage state with redux store 
- Mock API added (using mongodb)
- Filter, search and pagination added in dashboard page
- UI Responsive

Countinue/In progress Features: 
- Auth page for dashboard
- Dashboard Get leads api 
- test cases 

### Prerequisites

- Node.js v16+
- npm or yarn

### Installation

```bash
git clone https://github.com/usmanmanii/wx-pro
cd wx-pro
npm install 
```
### Run Cmd

```bash
npm run dev
```

Visit http://localhost:3000



### Folder Structure 
```
    └── 📁app
        └── 📁(pages)
            └── 📁lead-form
                └── page.tsx
            └── 📁lead-management
                └── page.tsx
            └── 📁thank-you
                └── page.tsx
        └── 📁api
            └── 📁leads
                └── route.ts
        └── 📁constant
            └── index.ts
        └── favicon.ico
        └── globals.css
        └── layout.tsx
        └── 📁lib
            └── database.js
            └── 📁services
                └── leads-service.ts
        └── 📁models
            └── Lead.ts
        └── not-found.tsx
        └── page.module.css
        └── page.tsx
        └── 📁store
            └── leadSlice.ts
            └── store.ts
        └── 📁types
            └── index.ts
    └── 📁public
        └── 📁assets
            └── dice.png
            └── heart.png
            └── info.png
        └── file.svg
        └── globe.svg
        └── next.svg
        └── vercel.svg
        └── window.svg
    └── .env
    └── .gitignore
    └── eslint.config.mjs
    └── next-env.d.ts
    └── next.config.ts
    └── package-lock.json
    └── package.json
    └── README.md
    └── tsconfig.json
```

Author
Your Name – Muhammad Usman
