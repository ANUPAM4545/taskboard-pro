"use client"

import { Droppable, Draggable } from "@hello-pangea/dnd"
import TaskCard from "@/components/task-card"

export default function TaskColumn({ column, tasks, labels = {}, onDeleteTask, onEditTask }) {
  // Get column color based on title
  const getColumnColor = () => {
    switch (column.title) {
      case "Backlog":
        return "border-l-4 border-l-gray-500"
      case "To Do":
        return "border-l-4 border-l-blue-500"
      case "In Progress":
        return "border-l-4 border-l-yellow-500"
      case "Review":
        return "border-l-4 border-l-purple-500"
      case "Done":
        return "border-l-4 border-l-green-500"
      case "Archived":
        return "border-l-4 border-l-gray-400"
      default:
        return ""
    }
  }

  // Get column background color based on title
  const getColumnBackground = () => {
    switch (column.title) {
      case "Archived":
        return "bg-gray-50 dark:bg-gray-900/30"
      default:
        return "bg-card"
    }
  }

  return (
    <div className={`flex flex-col rounded-lg border shadow-sm ${getColumnColor()} ${getColumnBackground()}`}>
      <div className="border-b p-4">
        <h3 className="font-semibold text-lg">{column.title}</h3>
        <div className="mt-1 text-sm text-muted-foreground">{tasks.length} tasks</div>
      </div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-3 ${
              snapshot.isDraggingOver ? "bg-muted/50" : ""
            } min-h-[200px] transition-colors duration-200 overflow-y-auto max-h-[calc(100vh-250px)]`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-3"
                    style={{
                      ...provided.draggableProps.style,
                      opacity: snapshot.isDragging ? 0.8 : 1,
                    }}
                  >
                    <TaskCard
                      task={task}
                      labels={labels}
                      onDelete={() => onDeleteTask(task.id)}
                      onEdit={(updatedTask) => onEditTask(task.id, updatedTask)}
                      isArchived={column.title === "Archived"}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
