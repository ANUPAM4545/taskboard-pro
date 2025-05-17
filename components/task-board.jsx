"use client"

import { useState, useEffect } from "react"
import { DragDropContext } from "@hello-pangea/dnd"
import { Plus, X, Search, Filter, Tag, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { MultiSelect } from "@/components/multi-select"
import { LabelManager } from "@/components/label-manager"
import { TaskStatistics } from "@/components/task-statistics"
import TaskColumn from "@/components/task-column"
import CalendarView from "@/components/calendar-view"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Helper function to add days to a date
function addDays(date, days) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

// Initial labels
const initialLabels = {
  "label-1": { id: "label-1", name: "Frontend", color: "#3b82f6" },
  "label-2": { id: "label-2", name: "Backend", color: "#10b981" },
  "label-3": { id: "label-3", name: "Design", color: "#8b5cf6" },
  "label-4": { id: "label-4", name: "Bug", color: "#ef4444" },
  "label-5": { id: "label-5", name: "Feature", color: "#f59e0b" },
  "label-6": { id: "label-6", name: "Documentation", color: "#6366f1" },
}

// Initial sample data with 13 tasks and 6 columns
const initialData = {
  tasks: {
    "task-1": {
      id: "task-1",
      title: "Create project plan",
      description: "Outline the project goals, milestones, and timeline for the next quarter",
      priority: "high",
      dueDate: addDays(new Date(), 3).toISOString().split("T")[0],
      reminder: true,
      labels: ["label-5", "label-6"],
    },
    "task-2": {
      id: "task-2",
      title: "Design mockups",
      description: "Create UI/UX designs for the main screens of the mobile application",
      priority: "medium",
      dueDate: addDays(new Date(), 5).toISOString().split("T")[0],
      reminder: true,
      labels: ["label-3"],
    },
    "task-3": {
      id: "task-3",
      title: "Setup development environment",
      description: "Install necessary tools and dependencies for the new project",
      priority: "low",
      dueDate: addDays(new Date(), 1).toISOString().split("T")[0],
      reminder: false,
      labels: ["label-1", "label-2"],
    },
    "task-4": {
      id: "task-4",
      title: "Client meeting preparation",
      description: "Prepare presentation slides and demo for the upcoming client meeting",
      priority: "high",
      dueDate: addDays(new Date(), 2).toISOString().split("T")[0],
      reminder: true,
      labels: ["label-5"],
    },
    "task-5": {
      id: "task-5",
      title: "Update documentation",
      description: "Update the API documentation with the latest changes and examples",
      priority: "medium",
      dueDate: addDays(new Date(), 4).toISOString().split("T")[0],
      reminder: true,
      labels: ["label-6", "label-2"],
    },
    "task-6": {
      id: "task-6",
      title: "Code review",
      description: "Review pull requests and provide feedback to team members",
      priority: "high",
      dueDate: addDays(new Date(), 1).toISOString().split("T")[0],
      reminder: true,
      labels: ["label-1", "label-2"],
    },
    "task-7": {
      id: "task-7",
      title: "Bug fixes for release",
      description: "Address critical bugs before the upcoming release",
      priority: "high",
      dueDate: addDays(new Date(), 2).toISOString().split("T")[0],
      reminder: true,
      labels: ["label-4", "label-1"],
    },
    "task-8": {
      id: "task-8",
      title: "Team retrospective",
      description: "Facilitate team retrospective meeting for the last sprint",
      priority: "medium",
      dueDate: addDays(new Date(), 6).toISOString().split("T")[0],
      reminder: false,
      labels: [],
    },
    "task-9": {
      id: "task-9",
      title: "Performance optimization",
      description: "Identify and fix performance bottlenecks in the application",
      priority: "medium",
      dueDate: addDays(new Date(), 7).toISOString().split("T")[0],
      reminder: true,
      labels: ["label-1", "label-2"],
    },
    "task-10": {
      id: "task-10",
      title: "User testing session",
      description: "Conduct user testing session with the prototype and gather feedback",
      priority: "high",
      dueDate: addDays(new Date(), 4).toISOString().split("T")[0],
      reminder: true,
      labels: ["label-3", "label-5"],
    },
    "task-11": {
      id: "task-11",
      title: "Update dependencies",
      description: "Update project dependencies to the latest versions and test compatibility",
      priority: "low",
      dueDate: addDays(new Date(), 10).toISOString().split("T")[0],
      reminder: false,
      labels: ["label-1", "label-2"],
    },
    "task-12": {
      id: "task-12",
      title: "Create marketing materials",
      description: "Design and create marketing materials for the product launch",
      priority: "medium",
      dueDate: addDays(new Date(), 8).toISOString().split("T")[0],
      reminder: true,
      labels: ["label-3", "label-5"],
    },
    "task-13": {
      id: "task-13",
      title: "Quarterly budget review",
      description: "Review and adjust the quarterly budget based on current expenses",
      priority: "high",
      dueDate: addDays(new Date(), 5).toISOString().split("T")[0],
      reminder: true,
      labels: [],
    },
    "task-14": {
      id: "task-14",
      title: "Research new technologies",
      description: "Research emerging technologies that could benefit our product roadmap",
      priority: "medium",
      dueDate: addDays(new Date(), 15).toISOString().split("T")[0],
      reminder: false,
      labels: ["label-2"],
    },
    "task-15": {
      id: "task-15",
      title: "Competitor analysis",
      description: "Analyze competitor products and identify opportunities for differentiation",
      priority: "high",
      dueDate: addDays(new Date(), 7).toISOString().split("T")[0],
      reminder: true,
      labels: ["label-5"],
    },
    "task-16": {
      id: "task-16",
      title: "Security audit",
      description: "Conduct a security audit of the application and address any vulnerabilities",
      priority: "high",
      dueDate: addDays(new Date(), -2).toISOString().split("T")[0],
      reminder: true,
      labels: ["label-2", "label-4"],
    },
  },
  columns: {
    "column-0": {
      id: "column-0",
      title: "Backlog",
      taskIds: ["task-14", "task-15"],
    },
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-2", "task-3", "task-8", "task-11", "task-12", "task-13"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: ["task-4", "task-6", "task-7", "task-10"],
    },
    "column-3": {
      id: "column-3",
      title: "Review",
      taskIds: ["task-9", "task-16"],
    },
    "column-4": {
      id: "column-4",
      title: "Done",
      taskIds: ["task-5"],
    },
    "column-5": {
      id: "column-5",
      title: "Archived",
      taskIds: [],
    },
  },
  columnOrder: ["column-0", "column-1", "column-2", "column-3", "column-4", "column-5"],
  labels: initialLabels,
}

export default function TaskBoard({ viewMode = "board" }) {
  const [boardData, setBoardData] = useState(null)
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [isLabelManagerOpen, setIsLabelManagerOpen] = useState(false)
  const [showStatistics, setShowStatistics] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    reminder: true,
    labels: [],
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(null)
  const { toast } = useToast()
  const [activeView, setActiveView] = useState(viewMode)
  const [priorityFilter, setPriorityFilter] = useState({
    high: true,
    medium: true,
    low: true,
  })
  const [labelFilter, setLabelFilter] = useState([])

  useEffect(() => {
    setActiveView(viewMode)
  }, [viewMode])

  useEffect(() => {
    // In a real app, you would fetch this from your backend
    // For demo purposes, we'll use localStorage to persist data
    const savedData = localStorage.getItem("taskBoardData")
    if (savedData) {
      setBoardData(JSON.parse(savedData))
    } else {
      setBoardData(initialData)
    }
  }, [])

  useEffect(() => {
    if (boardData) {
      localStorage.setItem("taskBoardData", JSON.stringify(boardData))
    }
  }, [boardData])

  // Check for due date reminders
  useEffect(() => {
    if (boardData) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      // Find tasks that are due today or tomorrow and have reminders enabled
      Object.values(boardData.tasks).forEach((task) => {
        if (!task.reminder) return

        // Skip tasks in the "Done" or "Archived" columns
        const isTaskDone =
          boardData.columns["column-4"].taskIds.includes(task.id) ||
          boardData.columns["column-5"].taskIds.includes(task.id)

        if (isTaskDone) return

        const dueDate = new Date(task.dueDate)
        dueDate.setHours(0, 0, 0, 0)

        // Check if the task is due today
        if (dueDate.getTime() === today.getTime()) {
          toast({
            title: "Task due today!",
            description: `"${task.title}" is due today.`,
            variant: "warning",
          })
        }
        // Check if the task is due tomorrow
        else if (dueDate.getTime() === tomorrow.getTime()) {
          toast({
            title: "Task due tomorrow",
            description: `"${task.title}" is due tomorrow.`,
          })
        }
        // Check if the task is overdue
        else if (dueDate < today) {
          toast({
            title: "Task overdue!",
            description: `"${task.title}" is overdue.`,
            variant: "destructive",
          })
        }
      })
    }
  }, [boardData, toast])

  useEffect(() => {
    if (boardData) {
      // Create a copy of the board data for filtering
      const filteredBoardData = { ...boardData }

      // Filter tasks that match the search term, priority filter, and label filter
      const matchingTaskIds = Object.keys(boardData.tasks).filter((taskId) => {
        const task = boardData.tasks[taskId]

        // Check if task matches search term
        const matchesSearch =
          !searchTerm ||
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())

        // Check if task matches priority filter
        const matchesPriority = priorityFilter[task.priority]

        // Check if task matches label filter
        const matchesLabel = labelFilter.length === 0 || labelFilter.some((labelId) => task.labels?.includes(labelId))

        return matchesSearch && matchesPriority && matchesLabel
      })

      // Create a new filtered tasks object
      const filteredTasks = {}
      matchingTaskIds.forEach((taskId) => {
        filteredTasks[taskId] = boardData.tasks[taskId]
      })

      // Update each column to only include the matching tasks
      const filteredColumns = {}
      Object.keys(boardData.columns).forEach((columnId) => {
        const column = boardData.columns[columnId]
        const filteredTaskIds = column.taskIds.filter((taskId) => matchingTaskIds.includes(taskId))

        filteredColumns[columnId] = {
          ...column,
          taskIds: filteredTaskIds,
        }
      })

      // Set the filtered data
      setFilteredData({
        ...boardData,
        tasks: filteredTasks,
        columns: filteredColumns,
      })
    }
  }, [boardData, searchTerm, priorityFilter, labelFilter])

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result

    // If there's no destination or the item was dropped back in its original position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    const startColumn = boardData.columns[source.droppableId]
    const finishColumn = boardData.columns[destination.droppableId]

    // If moving within the same column
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      }

      const newBoardData = {
        ...boardData,
        columns: {
          ...boardData.columns,
          [newColumn.id]: newColumn,
        },
      }

      setBoardData(newBoardData)
      return
    }

    // Moving from one column to another
    const startTaskIds = Array.from(startColumn.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    }

    const finishTaskIds = Array.from(finishColumn.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishTaskIds,
    }

    const newBoardData = {
      ...boardData,
      columns: {
        ...boardData.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    }

    setBoardData(newBoardData)

    // Show completion toast when moving to Done column
    if (finishColumn.id === "column-4" && startColumn.id !== "column-4") {
      toast({
        title: "Task completed!",
        description: `"${boardData.tasks[draggableId].title}" has been marked as done.`,
      })
    }

    // Show archive toast when moving to Archived column
    if (finishColumn.id === "column-5") {
      toast({
        title: "Task archived",
        description: `"${boardData.tasks[draggableId].title}" has been archived.`,
      })
    }
  }

  const handleAddTask = () => {
    if (!newTask.title) {
      toast({
        title: "Error",
        description: "Task title is required",
        variant: "destructive",
      })
      return
    }

    const taskId = `task-${Date.now()}`
    const updatedBoardData = {
      ...boardData,
      tasks: {
        ...boardData.tasks,
        [taskId]: {
          id: taskId,
          title: newTask.title,
          description: newTask.description,
          priority: newTask.priority,
          dueDate: newTask.dueDate,
          reminder: newTask.reminder,
          labels: newTask.labels,
        },
      },
      columns: {
        ...boardData.columns,
        "column-1": {
          ...boardData.columns["column-1"],
          taskIds: [...boardData.columns["column-1"].taskIds, taskId],
        },
      },
    }

    setBoardData(updatedBoardData)
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      reminder: true,
      labels: [],
    })
    setIsAddTaskOpen(false)

    toast({
      title: "Task added",
      description: "Your new task has been added to the board.",
    })
  }

  const handleDeleteTask = (taskId) => {
    // Create a copy of the board data
    const newBoardData = { ...boardData }

    // Remove the task from all columns
    Object.keys(newBoardData.columns).forEach((columnId) => {
      const column = newBoardData.columns[columnId]
      newBoardData.columns[columnId] = {
        ...column,
        taskIds: column.taskIds.filter((id) => id !== taskId),
      }
    })

    // Remove the task from the tasks object
    const { [taskId]: deletedTask, ...remainingTasks } = newBoardData.tasks
    newBoardData.tasks = remainingTasks

    setBoardData(newBoardData)

    toast({
      title: "Task deleted",
      description: "The task has been removed from the board.",
    })
  }

  const handleEditTask = (taskId, updatedTask) => {
    const newBoardData = {
      ...boardData,
      tasks: {
        ...boardData.tasks,
        [taskId]: {
          ...boardData.tasks[taskId],
          ...updatedTask,
        },
      },
    }

    setBoardData(newBoardData)

    toast({
      title: "Task updated",
      description: "Your changes have been saved.",
    })
  }

  const handleAddLabel = (label) => {
    const labelId = `label-${Date.now()}`
    const newBoardData = {
      ...boardData,
      labels: {
        ...boardData.labels,
        [labelId]: {
          id: labelId,
          name: label.name,
          color: label.color,
        },
      },
    }

    setBoardData(newBoardData)

    toast({
      title: "Label added",
      description: `Label "${label.name}" has been added.`,
    })

    return labelId
  }

  const handleEditLabel = (labelId, updatedLabel) => {
    const newBoardData = {
      ...boardData,
      labels: {
        ...boardData.labels,
        [labelId]: {
          ...boardData.labels[labelId],
          ...updatedLabel,
        },
      },
    }

    setBoardData(newBoardData)

    toast({
      title: "Label updated",
      description: `Label "${updatedLabel.name}" has been updated.`,
    })
  }

  const handleDeleteLabel = (labelId) => {
    // Create a copy of the board data
    const newBoardData = { ...boardData }

    // Remove the label from all tasks
    Object.keys(newBoardData.tasks).forEach((taskId) => {
      const task = newBoardData.tasks[taskId]
      if (task.labels && task.labels.includes(labelId)) {
        newBoardData.tasks[taskId] = {
          ...task,
          labels: task.labels.filter((id) => id !== labelId),
        }
      }
    })

    // Remove the label from the labels object
    const { [labelId]: deletedLabel, ...remainingLabels } = newBoardData.labels
    newBoardData.labels = remainingLabels

    // Update label filter if needed
    if (labelFilter.includes(labelId)) {
      setLabelFilter(labelFilter.filter((id) => id !== labelId))
    }

    setBoardData(newBoardData)

    toast({
      title: "Label deleted",
      description: `Label "${deletedLabel.name}" has been deleted.`,
    })
  }

  const toggleView = () => {
    setActiveView(activeView === "board" ? "calendar" : "board")
  }

  const togglePriorityFilter = (priority) => {
    setPriorityFilter({
      ...priorityFilter,
      [priority]: !priorityFilter[priority],
    })
  }

  const toggleLabelFilter = (labelId) => {
    if (labelFilter.includes(labelId)) {
      setLabelFilter(labelFilter.filter((id) => id !== labelId))
    } else {
      setLabelFilter([...labelFilter, labelId])
    }
  }

  const clearFilters = () => {
    setPriorityFilter({
      high: true,
      medium: true,
      low: true,
    })
    setLabelFilter([])
    setSearchTerm("")
  }

  const isFiltering = () => {
    return searchTerm || !priorityFilter.high || !priorityFilter.medium || !priorityFilter.low || labelFilter.length > 0
  }

  if (!filteredData) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Toaster />
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 min-w-[240px]">
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-8"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </button>
            )}
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Filter className="h-4 w-4" />
                {isFiltering() && <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary"></span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Filter by Priority</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="filter-high"
                        checked={priorityFilter.high}
                        onCheckedChange={() => togglePriorityFilter("high")}
                      />
                      <Label htmlFor="filter-high" className="flex items-center">
                        <Badge
                          variant="outline"
                          className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        >
                          High
                        </Badge>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="filter-medium"
                        checked={priorityFilter.medium}
                        onCheckedChange={() => togglePriorityFilter("medium")}
                      />
                      <Label htmlFor="filter-medium" className="flex items-center">
                        <Badge
                          variant="outline"
                          className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                        >
                          Medium
                        </Badge>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="filter-low"
                        checked={priorityFilter.low}
                        onCheckedChange={() => togglePriorityFilter("low")}
                      />
                      <Label htmlFor="filter-low" className="flex items-center">
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        >
                          Low
                        </Badge>
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Filter by Label</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {Object.values(boardData.labels).map((label) => (
                      <div key={label.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`filter-label-${label.id}`}
                          checked={labelFilter.includes(label.id)}
                          onCheckedChange={() => toggleLabelFilter(label.id)}
                        />
                        <Label htmlFor={`filter-label-${label.id}`} className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: label.color }}></div>
                          {label.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full justify-start">
                    Clear all filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsLabelManagerOpen(true)}
            className="relative"
            title="Manage Labels"
          >
            <Tag className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowStatistics(!showStatistics)}
            className={`relative ${showStatistics ? "bg-primary/10" : ""}`}
            title="Task Statistics"
          >
            <BarChart className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2">
            <Switch id="view-toggle" checked={activeView === "calendar"} onCheckedChange={toggleView} />
            <Label htmlFor="view-toggle" className="text-sm">
              {activeView === "board" ? "Board View" : "Calendar View"}
            </Label>
          </div>
          <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Task description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                    >
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="labels">Labels</Label>
                  <MultiSelect
                    options={Object.values(boardData.labels).map((label) => ({
                      value: label.id,
                      label: label.name,
                      color: label.color,
                    }))}
                    selected={newTask.labels}
                    onChange={(selected) => setNewTask({ ...newTask, labels: selected })}
                    onCreateOption={(name) => {
                      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`
                      const labelId = handleAddLabel({ name, color })
                      return labelId
                    }}
                    placeholder="Select labels"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="reminder"
                    checked={newTask.reminder}
                    onCheckedChange={(checked) => setNewTask({ ...newTask, reminder: checked })}
                  />
                  <Label htmlFor="reminder" className="text-sm font-normal">
                    Enable reminders for this task
                  </Label>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleAddTask}>Add Task</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {showStatistics && (
        <div className="mb-6">
          <TaskStatistics boardData={boardData} />
        </div>
      )}

      {activeView === "board" ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {filteredData.columnOrder.map((columnId) => {
              const column = filteredData.columns[columnId]
              const tasks = column.taskIds.map((taskId) => filteredData.tasks[taskId])

              return (
                <TaskColumn
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  labels={filteredData.labels}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                />
              )
            })}
          </div>
        </DragDropContext>
      ) : (
        <CalendarView boardData={filteredData} onDeleteTask={handleDeleteTask} onEditTask={handleEditTask} />
      )}

      {activeView === "board" &&
        Object.values(filteredData.columns).every((column) => column.taskIds.length === 0) &&
        isFiltering() && (
          <div className="col-span-1 md:col-span-3 py-8 text-center">
            <div className="mx-auto max-w-md space-y-4">
              <Search className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">No tasks found</h3>
                <p className="text-muted-foreground">
                  No tasks match your current filters. Try adjusting your search or filters.
                </p>
              </div>
              <Button variant="outline" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          </div>
        )}

      <Dialog open={isLabelManagerOpen} onOpenChange={setIsLabelManagerOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Labels</DialogTitle>
          </DialogHeader>
          <LabelManager
            labels={boardData.labels}
            onAddLabel={handleAddLabel}
            onEditLabel={handleEditLabel}
            onDeleteLabel={handleDeleteLabel}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
