"use client"

import { useState, useMemo } from "react"
import { BarChart, AlertTriangle, Tag, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { parseISO } from "date-fns"

export function TaskStatistics({ boardData }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate statistics
  const stats = useMemo(() => {
    if (!boardData) return null

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Tasks per column
    const tasksPerColumn = Object.values(boardData.columns).map((column) => ({
      id: column.id,
      title: column.title,
      count: column.taskIds.length,
      color: getColumnColor(column.title),
    }))

    // Total tasks
    const totalTasks = Object.keys(boardData.tasks).length

    // Tasks by priority
    const tasksByPriority = {
      high: 0,
      medium: 0,
      low: 0,
    }

    // Tasks by status (done, in progress, etc.)
    const tasksByStatus = {
      backlog: boardData.columns["column-0"]?.taskIds.length || 0,
      todo: boardData.columns["column-1"]?.taskIds.length || 0,
      inProgress: boardData.columns["column-2"]?.taskIds.length || 0,
      review: boardData.columns["column-3"]?.taskIds.length || 0,
      done: boardData.columns["column-4"]?.taskIds.length || 0,
      archived: boardData.columns["column-5"]?.taskIds.length || 0,
    }

    // Tasks by label
    const tasksByLabel = {}

    // Overdue tasks
    let overdueTasks = 0

    // Tasks due this week
    let tasksDueThisWeek = 0

    // Tasks with no due date
    let tasksWithNoDueDate = 0

    // Process each task
    Object.values(boardData.tasks).forEach((task) => {
      // Count by priority
      if (task.priority) {
        tasksByPriority[task.priority]++
      }

      // Count by label
      if (task.labels && task.labels.length > 0) {
        task.labels.forEach((labelId) => {
          if (boardData.labels[labelId]) {
            const labelName = boardData.labels[labelId].name
            tasksByLabel[labelName] = (tasksByLabel[labelName] || 0) + 1
          }
        })
      }

      // Check due dates
      if (task.dueDate) {
        const dueDate = parseISO(task.dueDate)

        // Check if overdue and not in done/archived
        if (
          dueDate < today &&
          !boardData.columns["column-4"].taskIds.includes(task.id) &&
          !boardData.columns["column-5"].taskIds.includes(task.id)
        ) {
          overdueTasks++
        }

        // Check if due this week
        const oneWeekFromNow = new Date(today)
        oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7)

        if (dueDate >= today && dueDate <= oneWeekFromNow) {
          tasksDueThisWeek++
        }
      } else {
        tasksWithNoDueDate++
      }
    })

    // Calculate completion rate
    const completionRate =
      totalTasks > 0 ? Math.round(((tasksByStatus.done + tasksByStatus.archived) / totalTasks) * 100) : 0

    // Sort labels by count
    const sortedLabels = Object.entries(tasksByLabel)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5) // Top 5 labels
      .map(([name, count]) => {
        const labelId = Object.values(boardData.labels).find((label) => label.name === name)?.id
        return {
          name,
          count,
          color: labelId ? boardData.labels[labelId].color : "#888888",
        }
      })

    return {
      tasksPerColumn,
      totalTasks,
      tasksByPriority,
      tasksByStatus,
      sortedLabels,
      completionRate,
      overdueTasks,
      tasksDueThisWeek,
      tasksWithNoDueDate,
    }
  }, [boardData])

  // Helper function to get column color
  function getColumnColor(title) {
    switch (title) {
      case "Backlog":
        return "#6b7280" // gray-500
      case "To Do":
        return "#3b82f6" // blue-500
      case "In Progress":
        return "#eab308" // yellow-500
      case "Review":
        return "#8b5cf6" // purple-500
      case "Done":
        return "#22c55e" // green-500
      case "Archived":
        return "#9ca3af" // gray-400
      default:
        return "#6b7280" // gray-500
    }
  }

  // Helper function to get priority color
  function getPriorityColor(priority) {
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

  if (!stats) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="priorities" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Priorities</span>
          </TabsTrigger>
          <TabsTrigger value="labels" className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            <span>Labels</span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Timeline</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalTasks}</div>
                <p className="text-xs text-muted-foreground">Across all columns</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completionRate}%</div>
                <div className="mt-2 h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${stats.completionRate}%` }} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.tasksByStatus.inProgress}</div>
                <p className="text-xs text-muted-foreground">Tasks currently being worked on</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">{stats.overdueTasks}</div>
                <p className="text-xs text-muted-foreground">Tasks past their due date</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Tasks by Column</CardTitle>
              <CardDescription>Distribution of tasks across workflow stages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.tasksPerColumn.map((column) => (
                  <div key={column.id} className="flex items-center">
                    <div className="w-28 min-w-[7rem] text-sm">{column.title}</div>
                    <div className="flex-1">
                      <div className="flex h-9 items-center">
                        <div className="relative h-2 w-full rounded-full bg-muted">
                          <div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{
                              width: `${stats.totalTasks ? (column.count / stats.totalTasks) * 100 : 0}%`,
                              backgroundColor: column.color,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-12 text-right text-sm">{column.count}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Priorities Tab */}
        <TabsContent value="priorities" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Priority Distribution</CardTitle>
                <CardDescription>Tasks by priority level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[240px] items-end gap-2 pt-4">
                  {Object.entries(stats.tasksByPriority).map(([priority, count]) => {
                    const percentage = stats.totalTasks ? (count / stats.totalTasks) * 100 : 0
                    return (
                      <div key={priority} className="flex flex-1 flex-col items-center gap-2">
                        <div
                          className="w-full rounded-t-md"
                          style={{
                            height: `${Math.max(percentage, 5)}%`,
                            backgroundColor:
                              priority === "high" ? "#ef4444" : priority === "medium" ? "#eab308" : "#22c55e",
                          }}
                        />
                        <div className="text-sm font-medium capitalize">{priority}</div>
                        <div className="text-xs text-muted-foreground">{count} tasks</div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Priority Breakdown</CardTitle>
                <CardDescription>Detailed view of task priorities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(stats.tasksByPriority).map(([priority, count]) => (
                    <div key={priority} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getPriorityColor(priority)}>
                          {priority}
                        </Badge>
                        <span className="text-sm font-medium">{count} tasks</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stats.totalTasks ? Math.round((count / stats.totalTasks) * 100) : 0}%
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="mb-4 text-sm font-medium">Priority by Status</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-md border p-2 text-center">
                      <div className="text-xs text-muted-foreground">To Do</div>
                      <div className="mt-1 text-lg font-semibold">{stats.tasksByStatus.todo}</div>
                      <div className="mt-1 flex justify-center gap-1">
                        <div className="h-1 w-1 rounded-full bg-red-500" />
                        <div className="h-1 w-1 rounded-full bg-yellow-500" />
                        <div className="h-1 w-1 rounded-full bg-green-500" />
                      </div>
                    </div>
                    <div className="rounded-md border p-2 text-center">
                      <div className="text-xs text-muted-foreground">In Progress</div>
                      <div className="mt-1 text-lg font-semibold">{stats.tasksByStatus.inProgress}</div>
                      <div className="mt-1 flex justify-center gap-1">
                        <div className="h-1 w-1 rounded-full bg-red-500" />
                        <div className="h-1 w-1 rounded-full bg-yellow-500" />
                        <div className="h-1 w-1 rounded-full bg-green-500" />
                      </div>
                    </div>
                    <div className="rounded-md border p-2 text-center">
                      <div className="text-xs text-muted-foreground">Done</div>
                      <div className="mt-1 text-lg font-semibold">
                        {stats.tasksByStatus.done + stats.tasksByStatus.archived}
                      </div>
                      <div className="mt-1 flex justify-center gap-1">
                        <div className="h-1 w-1 rounded-full bg-red-500" />
                        <div className="h-1 w-1 rounded-full bg-yellow-500" />
                        <div className="h-1 w-1 rounded-full bg-green-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Labels Tab */}
        <TabsContent value="labels" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Labels</CardTitle>
              <CardDescription>Most used labels across all tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {stats.sortedLabels.length > 0 ? (
                  stats.sortedLabels.map((label) => (
                    <div key={label.name} className="flex items-center">
                      <div className="w-28 min-w-[7rem] flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: label.color }} />
                        <span className="text-sm truncate">{label.name}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex h-9 items-center">
                          <div className="relative h-2 w-full rounded-full bg-muted">
                            <div
                              className="absolute inset-y-0 left-0 rounded-full"
                              style={{
                                width: `${stats.totalTasks ? (label.count / stats.totalTasks) * 100 : 0}%`,
                                backgroundColor: label.color,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-12 text-right text-sm">{label.count}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No labels have been assigned to tasks yet
                  </div>
                )}

                {stats.sortedLabels.length > 0 && (
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-4">Label Distribution</h4>
                    <div className="flex h-4 w-full overflow-hidden rounded-full">
                      {stats.sortedLabels.map((label, index) => (
                        <div
                          key={index}
                          className="h-full"
                          style={{
                            width: `${stats.totalTasks ? (label.count / stats.totalTasks) * 100 : 0}%`,
                            backgroundColor: label.color,
                          }}
                          title={`${label.name}: ${label.count} tasks`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Due This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.tasksDueThisWeek}</div>
                <p className="text-xs text-muted-foreground">Tasks due in the next 7 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">{stats.overdueTasks}</div>
                <p className="text-xs text-muted-foreground">Tasks past their due date</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">No Due Date</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.tasksWithNoDueDate}</div>
                <p className="text-xs text-muted-foreground">Tasks without a specified deadline</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Task Timeline</CardTitle>
              <CardDescription>Overview of task status and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="text-sm">Overdue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span className="text-sm">Due This Week</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="text-sm">Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-700" />
                    <span className="text-sm">No Due Date</span>
                  </div>
                </div>

                <div className="relative pt-6">
                  <div className="absolute left-0 right-0 top-0 flex justify-between text-xs text-muted-foreground">
                    <span>Past Due</span>
                    <span>This Week</span>
                    <span>Future</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div className="flex h-full">
                      <div
                        className="bg-red-500 h-full"
                        style={{ width: `${stats.totalTasks ? (stats.overdueTasks / stats.totalTasks) * 100 : 0}%` }}
                      />
                      <div
                        className="bg-yellow-500 h-full"
                        style={{
                          width: `${stats.totalTasks ? (stats.tasksDueThisWeek / stats.totalTasks) * 100 : 0}%`,
                        }}
                      />
                      <div
                        className="bg-green-500 h-full"
                        style={{
                          width: `${stats.totalTasks ? ((stats.tasksByStatus.done + stats.tasksByStatus.archived) / stats.totalTasks) * 100 : 0}%`,
                        }}
                      />
                      <div
                        className="bg-gray-300 dark:bg-gray-700 h-full"
                        style={{
                          width: `${stats.totalTasks ? (stats.tasksWithNoDueDate / stats.totalTasks) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-2">
                  <h4 className="text-sm font-medium">Task Status Timeline</h4>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <div className="font-medium">To Do</div>
                      <div className="text-muted-foreground">
                        {stats.tasksByStatus.backlog + stats.tasksByStatus.todo} tasks
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">In Progress</div>
                      <div className="text-muted-foreground">
                        {stats.tasksByStatus.inProgress + stats.tasksByStatus.review} tasks
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Completed</div>
                      <div className="text-muted-foreground">
                        {stats.tasksByStatus.done + stats.tasksByStatus.archived} tasks
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
