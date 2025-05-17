"use client"

import { useState, useMemo } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
  startOfWeek,
  endOfWeek,
} from "date-fns"
import { ChevronLeft, ChevronRight, CalendarIcon, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import TaskCard from "@/components/task-card"

export default function CalendarView({ boardData, onDeleteTask, onEditTask }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)

  // Get all tasks with due dates (excluding archived tasks)
  const tasksWithDueDates = useMemo(() => {
    if (!boardData) return []

    return Object.values(boardData.tasks).filter((task) => {
      // Check if the task has a due date
      if (!task.dueDate) return false

      // Check if the task is not in the Archived column
      const isArchived = boardData.columns["column-5"]?.taskIds.includes(task.id)
      return !isArchived
    })
  }, [boardData])

  // Get days in current month with padding for full weeks
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const calendarStart = startOfWeek(monthStart)
    const calendarEnd = endOfWeek(monthEnd)

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  }, [currentMonth])

  // Get tasks for a specific date
  const getTasksForDate = (date) => {
    return tasksWithDueDates.filter((task) => {
      const taskDate = parseISO(task.dueDate)
      return isSameDay(taskDate, date)
    })
  }

  // Get the column a task belongs to
  const getTaskColumn = (taskId) => {
    for (const columnId in boardData.columns) {
      if (boardData.columns[columnId].taskIds.includes(taskId)) {
        return boardData.columns[columnId].title
      }
    }
    return null
  }

  // Handle month navigation
  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  // Handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date)
    const tasksForDate = getTasksForDate(date)
    if (tasksForDate.length > 0) {
      setIsTaskDialogOpen(true)
    }
  }

  // Get priority color for calendar indicator
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get status color for task
  const getStatusColor = (taskId) => {
    const column = getTaskColumn(taskId)
    switch (column) {
      case "Backlog":
        return "border-gray-500"
      case "To Do":
        return "border-blue-500"
      case "In Progress":
        return "border-yellow-500"
      case "Review":
        return "border-purple-500"
      case "Done":
        return "border-green-500"
      case "Archived":
        return "border-gray-400"
      default:
        return ""
    }
  }

  // Check if a date has overdue tasks
  const hasOverdueTasks = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return (
      date < today &&
      getTasksForDate(date).some((task) => {
        // Check if the task is not in the "Done" or "Archived" column
        return (
          !boardData.columns["column-4"].taskIds.includes(task.id) &&
          !boardData.columns["column-5"].taskIds.includes(task.id)
        )
      })
    )
  }

  // Get tasks for selected date
  const selectedDateTasks = useMemo(() => {
    if (!selectedDate) return []
    return getTasksForDate(selectedDate)
  }, [selectedDate])

  // Get label colors for a task
  const getTaskLabels = (task) => {
    return (task.labels || [])
      .filter((labelId) => boardData.labels[labelId])
      .map((labelId) => boardData.labels[labelId])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Calendar View</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-medium px-4">{format(currentMonth, "MMMM yyyy")}</h3>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-medium py-2">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {calendarDays.map((date) => {
          const tasksForDay = getTasksForDate(date)
          const isCurrentMonth = isSameMonth(date, currentMonth)
          const isOverdue = hasOverdueTasks(date)

          return (
            <div
              key={date.toString()}
              className={`
                min-h-[120px] border rounded-md p-2 transition-colors
                ${isCurrentMonth ? "bg-card" : "bg-muted/30 text-muted-foreground"}
                ${isSameDay(date, new Date()) ? "border-primary border-2" : ""}
                ${isOverdue ? "border-red-500 border-2" : ""}
                hover:border-primary cursor-pointer
              `}
              onClick={() => handleDateClick(date)}
            >
              <div className="font-medium text-sm mb-2 flex justify-between items-center">
                <span>{format(date, "d")}</span>
                {isOverdue && <AlertCircle className="h-4 w-4 text-red-500" />}
              </div>

              {/* Task indicators */}
              <div className="space-y-1.5">
                {tasksForDay.slice(0, 3).map((task) => {
                  const taskLabels = getTaskLabels(task)
                  return (
                    <div
                      key={task.id}
                      className={`flex items-center space-x-1 p-1 rounded-sm text-xs border-l-2 ${getStatusColor(task.id)} bg-background/80`}
                    >
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                      <div className="truncate flex-1">{task.title}</div>
                      {taskLabels.length > 0 && (
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: taskLabels[0].color }} />
                      )}
                    </div>
                  )
                })}

                {tasksForDay.length > 3 && (
                  <div className="text-xs text-muted-foreground font-medium text-center mt-1">
                    +{tasksForDay.length - 3} more
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Task Dialog */}
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedDate && (
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5" />
                  <span>Tasks for {format(selectedDate, "MMMM d, yyyy")}</span>
                </div>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            {selectedDateTasks.length === 0 ? (
              <p className="text-center text-muted-foreground">No tasks for this date</p>
            ) : (
              selectedDateTasks.map((task) => (
                <div key={task.id} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge>{getTaskColumn(task.id)}</Badge>
                  </div>
                  <TaskCard
                    task={task}
                    labels={boardData.labels}
                    onDelete={() => onDeleteTask(task.id)}
                    onEdit={(updatedTask) => onEditTask(task.id, updatedTask)}
                    isArchived={getTaskColumn(task.id) === "Archived"}
                  />
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
