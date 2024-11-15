
# **Meal Planner Pop**

Meal Planner Pop is a modern, visually engaging, and interactive meal-planning application. Designed with a focus on user experience and accessibility, the app leverages **Next.js**, **React**, **Tailwind CSS**, and **Prisma** to deliver a sleek and robust platform for personalized meal suggestions and management.

---

## **Table of Contents**
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Development Guide](#development-guide)
6. [Folder Breakdown](#folder-breakdown)
7. [Contributing](#contributing)
8. [Future Enhancements](#future-enhancements)

---

## **Features**

- **Mood-Based Meal Suggestions:**
  - Select your mood and get tailored meal suggestions for breakfast, lunch, or dinner.
- **Dynamic Greeting:**
  - AI-driven greetings based on the time of day.
- **Saved Meals:**
  - Easily view and manage your recently saved meals.
- **Quick Actions:**
  - Navigate to saved meals or spin a "Meal Wheel" for random suggestions.

---

## **Tech Stack**

### **Frontend**
- **Next.js (v15.0.3):** Handles routing, server-side rendering, and API integration.
- **React (v19.0.0-rc):** Provides dynamic and reusable UI components.
- **Tailwind CSS (v3.4.15):** Utility-first CSS framework for fast and responsive design.
- **Class Variance Authority (CVA):** Simplifies variant-based component styling.

### **Backend**
- **Prisma (v5.22.0):** Database ORM for managing meal data.

### **Other Tools**
- **Lucide-React:** Icon library for a modern aesthetic.
- **TypeScript:** Strongly typed language for code safety and scalability.

---

## **Project Structure**

```plaintext
meal-planner-pop/
├── .env                # Environment variables (e.g., database connection)
├── next.config.ts      # Next.js configuration
├── tailwind.config.ts  # Tailwind configuration
├── prisma/             # Database schema and migrations
├── public/             # Static assets (icons, images, etc.)
├── src/
│   ├── app/            # Main Next.js app directory
│   │   ├── page.tsx    # Entry point for the home page
│   │   ├── globals.css # Global styling
│   │   └── fonts/      # Local font files
│   ├── components/     # Reusable UI components
│   │   ├── meal-planner/
│   │   │   └── dashboard.tsx  # Main dashboard
│   │   └── ui/         # Shared UI components (Button, Card, etc.)
│   ├── lib/            # Utility functions (e.g., className merging)
│   └── prisma/         # Prisma schema and ORM configuration
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

---

## **Getting Started**

Follow these steps to set up and run the project locally:

### **1. Prerequisites**
Ensure you have the following installed:
- **Node.js (v16+ recommended)**
- **npm (v8+)**
- **A database** (e.g., PostgreSQL)

### **2. Clone the Repository**
```bash
git clone https://github.com/your-username/meal-planner-pop.git
cd meal-planner-pop
```

### **3. Install Dependencies**
```bash
npm install
```

### **4. Set Up Environment Variables**
Create a `.env` file in the root directory with the following structure:
```plaintext
DATABASE_URL=your-database-connection-string
```

### **5. Run Database Migrations**
Initialize the database schema using Prisma:
```bash
npx prisma migrate dev
```

### **6. Start the Development Server**
Run the development server:
```bash
npm run dev
```
Visit `http://localhost:3000` in your browser to view the app.

---

## **Development Guide**

### **Key Commands**
- **Start Development Server:**
  ```bash
  npm run dev
  ```
- **Build for Production:**
  ```bash
  npm run build
  ```
- **Lint Code:**
  ```bash
  npm run lint
  ```

### **Testing**
- Add unit and integration tests using your preferred testing library (e.g., Jest, React Testing Library).

---

## **Folder Breakdown**

### **1. `src/app/`**
- Contains Next.js-specific entry points (`page.tsx`, `layout.tsx`) and global styling.

### **2. `src/components/`**
- **`meal-planner/dashboard.tsx`:**
  - Core feature for mood-based meal planning and saved meals.
- **`ui/`:**
  - Reusable components like `Button` and `Card` to ensure consistent design.

### **3. `src/lib/`**
- Utility functions such as `cn` for merging CSS classes.

### **4. `prisma/`
- `schema.prisma`: Database schema for meal-related data.

---

## **Contributing**

We welcome contributions! Here's how you can get involved:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request.

---

## **Future Enhancements**

- **AI Meal Recommendations:**
  - Suggest meals dynamically based on mood and past preferences.
- **User Profiles:**
  - Save personalized meal plans and preferences.
- **API Integration:**
  - Fetch recipes and nutritional data from external APIs.

---

## **License**
This project is licensed under the [MIT License](LICENSE).
