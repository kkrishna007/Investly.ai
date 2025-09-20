"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Upload, FileText, CheckCircle2, Loader2, File, FileImage, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
}

interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  category: "pitch-deck" | "transcript" | "email" | "financial" | "memo" | "other"
}

const documentCategories = [
  { value: "pitch-deck", label: "Pitch Deck", icon: FileText },
  { value: "transcript", label: "Call Transcript", icon: File },
  { value: "email", label: "Email/Update", icon: FileText },
  { value: "financial", label: "Financial Model", icon: FileImage },
  { value: "memo", label: "Investment Memo", icon: File },
  { value: "other", label: "Other Document", icon: File },
]

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("pitch-deck")

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      handleFiles(files)
    }
  }

  const handleFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      category: selectedCategory as any,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const updateFileCategory = (fileId: string, category: string) => {
    setUploadedFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, category: category as any } : file)))
  }

  const simulateUpload = () => {
    if (uploadedFiles.length === 0) return

    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setUploadComplete(true)
      setTimeout(() => {
        onClose()
        setUploadComplete(false)
        setUploadedFiles([])
        // In a real app, this would refresh the dashboard
        window.location.reload()
      }, 2000)
    }, 3000)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getCategoryIcon = (category: string) => {
    const cat = documentCategories.find((c) => c.value === category)
    return cat ? cat.icon : File
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto glow"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Upload Investment Documents</h2>
              <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-muted/50">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {!uploadComplete ? (
              <>
                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block">Document Category</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {documentCategories.map((category) => {
                      const Icon = category.icon
                      return (
                        <button
                          key={category.value}
                          onClick={() => setSelectedCategory(category.value)}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            selectedCategory === category.value
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border/50 hover:border-primary/50"
                          }`}
                        >
                          <Icon className="h-4 w-4 mb-1" />
                          <div className="text-xs font-medium">{category.label}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 mb-6 ${
                    isDragOver ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/50"
                  } ${isUploading ? "pointer-events-none opacity-50" : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {isUploading ? (
                    <div className="space-y-4">
                      <Loader2 className="h-12 w-12 text-primary mx-auto animate-spin" />
                      <div>
                        <p className="text-lg font-semibold">Processing {uploadedFiles.length} document(s)...</p>
                        <p className="text-sm text-muted-foreground">AI is analyzing your investment materials</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-lg font-semibold mb-2">Drop your files here</p>
                        <p className="text-sm text-muted-foreground mb-4">or click to browse multiple files</p>
                        <input
                          type="file"
                          accept=".pdf,.ppt,.pptx,.doc,.docx,.txt,.csv,.xlsx"
                          onChange={handleFileSelect}
                          className="hidden"
                          id="file-upload"
                          multiple
                        />
                        <label
                          htmlFor="file-upload"
                          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 transition-colors"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Choose Files
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-3">Uploaded Files ({uploadedFiles.length})</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {uploadedFiles.map((file) => {
                        const Icon = getCategoryIcon(file.category)
                        return (
                          <div key={file.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                              <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium truncate">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {formatFileSize(file.size)} •{" "}
                                  {documentCategories.find((c) => c.value === file.category)?.label}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <select
                                value={file.category}
                                onChange={(e) => updateFileCategory(file.id, e.target.value)}
                                className="text-xs bg-background border border-border/50 rounded px-2 py-1"
                              >
                                {documentCategories.map((cat) => (
                                  <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                  </option>
                                ))}
                              </select>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeFile(file.id)}
                                className="h-6 w-6 p-0 hover:bg-red-500/10 hover:text-red-400"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      Supported formats: PDF, PPT, PPTX, DOC, DOCX, TXT, CSV, XLSX
                    </p>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <Button
                      onClick={simulateUpload}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow"
                      disabled={isUploading}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Analyze {uploadedFiles.length} Document{uploadedFiles.length > 1 ? "s" : ""}
                    </Button>
                  )}
                </div>
              </>
            ) : (
              /* Success State */
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <CheckCircle2 className="h-16 w-16 text-green-400 mx-auto" />
                </motion.div>
                <div>
                  <p className="text-lg font-semibold text-green-400">Analysis Complete!</p>
                  <p className="text-sm text-muted-foreground">
                    {uploadedFiles.length} document{uploadedFiles.length > 1 ? "s have" : " has"} been analyzed
                    successfully
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
