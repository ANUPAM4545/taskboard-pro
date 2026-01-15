# FastBoard: Premium Task Management

![FastBoard Banner](https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2539&auto=format&fit=crop)

**FastBoard** is a modern, high-performance task management application built with Next.js 14, Tailwind CSS, and Shadcn UI. It features a beautiful drag-and-drop interface, dark mode support, and a premium user experience designed for speed and style.

## 🚀 Features

- **Intuitive Drag & Drop**: powered by `@hello-pangea/dnd` for smooth task organization.
- **Premium UI/UX**: Glassmorphism effects, refined animations, and a carefully curated color palette.
- **Dark Mode**: Fully supported dark/light themes with a deep, rich dark mode experience.
- **Task Management**: Create, edit, delete, and categorize tasks with ease.
- **Labels & Priorities**: Organize with colored labels and priority indicators.
- **Due Date Reminders**: Visual cues for upcoming and overdue tasks.
- **Statistics**: Visual breakdown of task progress.
- **Responsive**: Works seamlessly on desktop and mobile.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/) / Radix UI
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling**: React Hook Form + Zod
- **Drag & Drop**: @hello-pangea/dnd
- **Utility**: clsx, tailwind-merge, date-fns

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ANUPAM4545/taskboard-pro.git
    cd taskboard-pro
    ```

2.  **Install dependencies:**
    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000).

## 📦 Deployment

### Vercel (Recommended)

1.  Push your code to a GitHub repository.
2.  Log in to [Vercel](https://vercel.com/) and import your project.
3.  Vercel will detect Next.js. Just click **Deploy**.
4.  Your application will be live in minutes!

### Build Locally

To create an optimized production build:

```bash
npm run build
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
