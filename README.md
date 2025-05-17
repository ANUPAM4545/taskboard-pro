# TaskBoard Pro

TaskBoard Pro is a modern, feature-rich task management application built with Next.js and React. It provides an intuitive interface for managing tasks through a customizable kanban board with drag-and-drop functionality, task categorization, calendar view, and detailed statistics.

website images:
<img width="1461" alt="Screenshot 2025-05-17 at 11 31 29" src="https://github.com/user-attachments/assets/f1b3c2cb-5495-4a61-8b86-a207b867fea8" />
<img width="1448" alt="Screenshot 2025-05-17 at 11 32 24" src="https://github.com/user-attachments/assets/d90fcc6f-8d0e-4ede-9b5c-dbebb80ce5d9" />
<img width="1464" alt="Screenshot 2025-05-17 at 11 33 34" src="https://github.com/user-attachments/assets/f580e690-bf84-4cee-92be-08ca09f43dd9" />
<img width="700" alt="Screenshot 2025-05-17 at 11 33 55" src="https://github.com/user-attachments/assets/c587570f-4b55-476c-a861-ac4163c735b6" />
<img width="643" alt="Screenshot 2025-05-17 at 11 34 21" src="https://github.com/user-attachments/assets/6db6d9a2-624e-4a2f-9da9-35573ece3f2b" />
<img width="644" alt="Screenshot 2025-05-17 at 11 34 48" src="https://github.com/user-attachments/assets/4dfe9ba9-2443-43d6-ac93-bd5d967655a8" />
<img width="1432" alt="Screenshot 2025-05-17 at 11 35 15" src="https://github.com/user-attachments/assets/991e5c6f-3bdb-4f1e-b195-b40a8a24953c" />
<img width="1428" alt="Screenshot 2025-05-17 at 11 35 31" src="https://github.com/user-attachments/assets/00b686a0-1571-4439-aba6-feb296388cd5" />
<img width="1382" alt="Screenshot 2025-05-17 at 11 35 51" src="https://github.com/user-attachments/assets/3c2af417-5d2b-4083-80f8-63be98462fb1" />
<img width="1402" alt="Screenshot 2025-05-17 at 11 36 05" src="https://github.com/user-attachments/assets/e31e57aa-67c5-45db-bc3d-03f25955086c" />
<img width="1418" alt="Screenshot 2025-05-17 at 11 36 17" src="https://github.com/user-attachments/assets/1411c4cd-c042-4852-967e-c606565601f4" />












## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Workflow](#workflow)
- [Components](#components)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)

## Features

- **User Authentication**: Secure login and registration system
- **Kanban Board**: Visual task management with 6 columns (Backlog, To Do, In Progress, Review, Done, Archived)
- **Drag-and-Drop Interface**: Intuitive task movement between columns
- **Task Management**: Create, edit, delete, and organize tasks
- **Priority Levels**: Assign High, Medium, or Low priority to tasks
- **Due Dates**: Set and track task deadlines with visual indicators
- **Custom Labels**: Create and assign color-coded labels to tasks
- **Multiple Views**: Switch between Board and Calendar views
- **Search & Filtering**: Find tasks quickly with powerful search and filtering options
- **Statistics Dashboard**: Visualize task distribution and progress
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Choose your preferred theme
- **Newsletter Subscription**: Stay updated with the latest features

## Project Structure


vercel link: https://v0-task-board-pro-clone-anupamp24-7774s-projects.vercel.app

\`\`\`
taskboard-pro/
├── app/                    # Next.js app directory
│   ├── dashboard/          # Dashboard page
│   ├── login/              # Login page
│   ├── signup/             # Signup page
│   ├── globals.css         # Global styles
│   ├── layout.jsx          # Root layout
│   └── page.jsx            # Landing page
├── components/             # React components
│   ├── ui/                 # UI components
│   ├── auth-provider.jsx   # Authentication context
│   ├── calendar-view.jsx   # Calendar view
│   ├── dashboard-header.jsx # Dashboard header
│   ├── label-manager.jsx   # Label management
│   ├── multi-select.jsx    # Multi-select component
│   ├── newsletter-form.jsx # Newsletter form
│   ├── site-footer.jsx     # Site footer
│   ├── task-board.jsx      # Main task board
│   ├── task-card.jsx       # Individual task card
│   ├── task-column.jsx     # Task column
│   ├── task-statistics.jsx # Task statistics
│   ├── theme-provider.jsx  # Theme context
│   └── theme-toggle.jsx    # Theme toggle
├── actions/                # Server actions
│   └── newsletter.js       # Newsletter subscription
├── lib/                    # Utility functions
│   └── utils.js            # Helper functions
└── tailwind.config.js      # Tailwind CSS configuration
\`\`\`

## Workflow

```mermaid title="TaskBoard Pro Workflow" type="diagram"
graph TD;
    A["User Authentication"] -->|Login/Signup| B["Dashboard"]
    B -->|"Add Task"| C["Create Task"]
    B -->|"View Tasks"| D["Task Board"]
    B -->|"Switch View"| E["Calendar View"]
    B -->|"Manage Labels"| F["Label Manager"]
    B -->|"View Statistics"| G["Statistics Dashboard"]
    D -->|"Drag & Drop"| H["Move Tasks"]
    D -->|"Edit"| I["Edit Task"]
    D -->|"Delete"| J["Delete Task"]
    D -->|"Filter"| K["Filter Tasks"]
    D -->|"Search"| L["Search Tasks"]
    E -->|"Select Date"| M["View Tasks by Date"]
    F -->|"Create"| N["Add Label"]
    F -->|"Edit"| O["Modify Label"]
    F -->|"Delete"| P["Remove Label"]
    G -->|"View Tabs"| Q["Analyze Task Data"]

