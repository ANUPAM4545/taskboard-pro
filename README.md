# TaskBoard Pro

TaskBoard Pro is a modern, feature-rich task management application built with Next.js and React. It provides an intuitive interface for managing tasks through a customizable kanban board with drag-and-drop functionality, task categorization, calendar view, and detailed statistics.

![TaskBoard Pro](https://placeholder.svg?height=400&width=800)

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

