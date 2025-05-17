"use client"

import { useState } from "react"
import { Pencil, Trash2, Plus, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function LabelManager({ labels, onAddLabel, onEditLabel, onDeleteLabel }) {
  const [newLabel, setNewLabel] = useState({ name: "", color: "#3b82f6" })
  const [editingLabel, setEditingLabel] = useState(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [labelToDelete, setLabelToDelete] = useState(null)

  const handleAddLabel = () => {
    if (newLabel.name.trim() === "") return

    onAddLabel(newLabel)
    setNewLabel({ name: "", color: getRandomColor() })
  }

  const handleEditLabel = () => {
    if (!editingLabel || editingLabel.name.trim() === "") return

    onEditLabel(editingLabel.id, {
      name: editingLabel.name,
      color: editingLabel.color,
    })

    setEditingLabel(null)
  }

  const handleDeleteLabel = () => {
    if (!labelToDelete) return

    onDeleteLabel(labelToDelete)
    setLabelToDelete(null)
    setDeleteConfirmOpen(false)
  }

  const startEditing = (label) => {
    setEditingLabel({ ...label })
  }

  const cancelEditing = () => {
    setEditingLabel(null)
  }

  const confirmDelete = (labelId) => {
    setLabelToDelete(labelId)
    setDeleteConfirmOpen(true)
  }

  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="new-label-name">Add New Label</Label>
        <div className="flex items-center space-x-2">
          <div className="flex-1 flex items-center space-x-2">
            <Input
              id="new-label-name"
              placeholder="Label name"
              value={newLabel.name}
              onChange={(e) => setNewLabel({ ...newLabel, name: e.target.value })}
              className="flex-1"
            />
            <Input
              type="color"
              value={newLabel.color}
              onChange={(e) => setNewLabel({ ...newLabel, color: e.target.value })}
              className="w-12 p-1 h-9"
            />
          </div>
          <Button size="sm" onClick={handleAddLabel} disabled={!newLabel.name.trim()}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-medium mb-2">Existing Labels</h3>
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
          {Object.values(labels).length === 0 ? (
            <p className="text-sm text-muted-foreground">No labels created yet.</p>
          ) : (
            Object.values(labels).map((label) => (
              <div key={label.id} className="flex items-center justify-between group">
                {editingLabel && editingLabel.id === label.id ? (
                  <div className="flex-1 flex items-center space-x-2">
                    <Input
                      value={editingLabel.name}
                      onChange={(e) => setEditingLabel({ ...editingLabel, name: e.target.value })}
                      className="flex-1"
                    />
                    <Input
                      type="color"
                      value={editingLabel.color}
                      onChange={(e) => setEditingLabel({ ...editingLabel, color: e.target.value })}
                      className="w-12 p-1 h-9"
                    />
                    <Button size="icon" variant="ghost" onClick={handleEditLabel} className="h-8 w-8">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={cancelEditing} className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Badge
                      variant="outline"
                      className="px-2 py-1 h-8"
                      style={{ backgroundColor: label.color + "20", color: label.color, borderColor: label.color }}
                    >
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: label.color }}></div>
                      {label.name}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => startEditing(label)}
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => confirmDelete(label.id)}
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the label from all tasks. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteLabel} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
