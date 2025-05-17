"use client"

import { useState } from "react"
import { Trash2, Calendar, Edit, Bell, AlertCircle } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { MultiSelect } from "@/components/multi-select"
import { format, isBefore, isToday, isTomorrow, parseISO } from "date-fns"

export default function TaskCard({ task, labels = {}, onDelete, onEdit, isArchived = false }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editedTask, setEditedTask] = useState({ ...task })

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getDueDateStatus = () => {
    if (!task.dueDate) return null

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const dueDate = parseISO(task.dueDate)

    if (isToday(dueDate)) {
      return {
        label: "Due today",
        className: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
        icon: <AlertCircle className="mr-1 h-3 w-3" />,
      }
    } else if (isTomorrow(dueDate)) {
      return {
        label: "Due tomorrow",
        className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
        icon: <Calendar className="mr-1 h-3 w-3" />,
      }
    } else if (isBefore(dueDate, today)) {
      return {
        label: "Overdue",
        className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
        icon: <AlertCircle className="mr-1 h-3 w-3" />,
      }
    } else {
      return {
        label: `Due ${format(dueDate, "MMM d")}`,
        className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
        icon: <Calendar className="mr-1 h-3 w-3" />,
      }
    }
  }

  const dueDateStatus = getDueDateStatus()

  const handleSaveEdit = () => {
    onEdit(editedTask)
    setIsEditDialogOpen(false)
  }

  const taskLabels = task.labels?.filter((id) => labels[id]) || []

  return (
    <>
      <Card className={`group hover:shadow-md transition-all duration-200 ${isArchived ? "opacity-75" : ""}`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-base">{task.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{task.description}</p>

              {taskLabels.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {taskLabels.map((labelId) => {
                    const label = labels[labelId]
                    return (
                      <Badge
                        key={labelId}
                        variant="outline"
                        className="text-xs px-1.5 py-0"
                        style={{ backgroundColor: label.color + "20", color: label.color, borderColor: label.color }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full mr-1" style={{ backgroundColor: label.color }}></div>
                        {label.name}
                      </Badge>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2 p-4 pt-0 border-t">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>

            {dueDateStatus && (
              <Badge variant="outline" className={dueDateStatus.className}>
                {dueDateStatus.icon}
                {dueDateStatus.label}
              </Badge>
            )}

            {task.reminder && (
              <Badge
                variant="outline"
                className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
              >
                <Bell className="mr-1 h-3 w-3" />
                Reminder
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsEditDialogOpen(true)} className="h-8 w-8 p-0">
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit task</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete} className="h-8 w-8 p-0">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete task</span>
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-priority">Priority</Label>
                <Select
                  value={editedTask.priority}
                  onValueChange={(value) => setEditedTask({ ...editedTask, priority: value })}
                >
                  <SelectTrigger id="edit-priority">
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
                <Label htmlFor="edit-dueDate">Due Date</Label>
                <Input
                  id="edit-dueDate"
                  type="date"
                  value={editedTask.dueDate || ""}
                  onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-labels">Labels</Label>
              <MultiSelect
                options={Object.values(labels).map((label) => ({
                  value: label.id,
                  label: label.name,
                  color: label.color,
                }))}
                selected={editedTask.labels || []}
                onChange={(selected) => setEditedTask({ ...editedTask, labels: selected })}
                placeholder="Select labels"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-reminder"
                checked={editedTask.reminder}
                onCheckedChange={(checked) => setEditedTask({ ...editedTask, reminder: checked })}
              />
              <Label htmlFor="edit-reminder" className="text-sm font-normal">
                Enable reminders for this task
              </Label>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
