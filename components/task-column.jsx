"use client"

import { Droppable, Draggable } from "@hello-pangea/dnd"
import TaskCard from "@/components/task-card"
import { Badge } from "@/components/ui/badge"

export default function TaskColumn({ column, tasks, labels = {}, onDeleteTask, onEditTask }) {
  // Get column color based on title
  const getColumnDetails = () => {
    switch (column.title) {
      case "Backlog":
        return { border: "border-t-4 border-t-gray-500", bg: "bg-gray-50/50 dark:bg-gray-900/20" }
      case "To Do":
        return { border: "border-t-4 border-t-blue-500", bg: "bg-blue-50/50 dark:bg-blue-900/10" }
      case "In Progress":
        return { border: "border-t-4 border-t-yellow-500", bg: "bg-yellow-50/50 dark:bg-yellow-900/10" }
      case "Review":
        return { border: "border-t-4 border-t-purple-500", bg: "bg-purple-50/50 dark:bg-purple-900/10" }
      case "Done":
        return { border: "border-t-4 border-t-green-500", bg: "bg-green-50/50 dark:bg-green-900/10" }
      case "Archived":
        return { border: "border-t-4 border-t-gray-400", bg: "bg-gray-100/50 dark:bg-gray-900/30" }
      default:
        return { border: "border-t-4 border-t-primary", bg: "bg-muted/30" }
    }
  }

  const { border, bg } = getColumnDetails()

  return (
    <div className={`flex flex-col rounded-2xl border border-white/10 shadow-xl ${bg} backdrop-blur-2xl transition-all duration-300 relative overflow-hidden group/column`}>
      {/* Premium Gradient Top Border */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${border.replace('border-t-4 ', 'bg-')} opacity-80`} />

      <div className="p-5 border-b border-white/5 relative bg-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="font-black text-xl tracking-tighter uppercase opacity-90">{column.title}</h3>
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          </div>
          <Badge variant="secondary" className="bg-background/40 backdrop-blur-md shadow-sm border-white/5 font-black text-xs px-2.5 py-0.5">
            {tasks.length}
          </Badge>
        </div>
      </div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-3 flex flex-col gap-3 ${snapshot.isDraggingOver ? "bg-muted/60" : ""
              } min-h-[200px] transition-colors duration-200 overflow-y-auto max-h-[calc(100vh-250px)]`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
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

