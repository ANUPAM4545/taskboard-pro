"use client"

import { useState } from "react"
import { Trash2, Calendar, Edit, Bell, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
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
    <div className="relative group/card">
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className={`group relative overflow-hidden bg-background/40 backdrop-blur-xl border-white/5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 ${isArchived ? "opacity-60 grayscale" : ""}`}>
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <CardContent className="p-5 relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2.5">
                <h4 className={`font-bold text-lg tracking-tight leading-tight group-hover:text-primary transition-colors ${task.completed ? "line-through text-muted-foreground" : ""}`}>{task.title}</h4>
                <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed font-medium">{task.description}</p>

                {taskLabels.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {taskLabels.map((labelId) => {
                      const label = labels[labelId]
                      return (
                        <Badge
                          key={labelId}
                          variant="secondary"
                          className="text-[10px] px-2.5 py-1 font-black uppercase tracking-wider border-white/5 shadow-sm"
                          style={{ backgroundColor: label.color + "15", color: label.color }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full mr-2 shadow-[0_0_8px_currentColor]" style={{ backgroundColor: label.color }}></div>
                          {label.name}
                        </Badge>
                      )
                    })}
                  </div>
                )}
              </div>
              {/* Premium Priority Indicator */}
              <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 animate-pulse ${task.priority === 'high' ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]' :
                task.priority === 'medium' ? 'bg-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.6)]' :
                  'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]'
                }`}
              />
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center relative z-10">
            <div className="flex items-center gap-3">
              {dueDateStatus && (
                <Badge variant="outline" className={`flex items-center px-2 py-0.5 rounded-lg border-white/5 bg-background/20 backdrop-blur-md text-[10px] font-black uppercase tracking-widest ${dueDateStatus.className.replace("bg-", "text-").replace("text-", "text-").split(" ")[1] || "text-muted-foreground"}`}>
                  <div className="opacity-70 group-hover:opacity-100 transition-opacity">
                    {dueDateStatus.icon}
                  </div>
                  <span className="ml-1.5">{dueDateStatus.label.replace("Due ", "")}</span>
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1.5 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors" onClick={() => setIsEditDialogOpen(true)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/80 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

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
    </div >
  )
}
