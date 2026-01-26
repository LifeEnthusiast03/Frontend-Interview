"use client"
import * as React from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useBlogs } from "@/context/BlogContext"
import type { Blog } from "@/service/blogservice"
// import { postBlogs } from "@/service/blogservice"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters.")
    .max(100, "Title must be at most 100 characters."),
  category: z
    .string()
    .min(1, "At least one category is required."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(200, "Description must be at most 200 characters."),
  coverImage: z
    .string()
    .url("Must be a valid URL.")
    .min(1, "Cover image URL is required."),
  content: z
    .string()
    .min(50, "Content must be at least 50 characters."),
})

export function BlogPostForm() {
  const { setIsCreatePost, blogs,createBlog } = useBlogs()
  
  const form = useForm({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      coverImage: "",
      content: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      // Convert comma-separated categories to array
      const categories = value.category
        .split(",")
        .map(cat => cat.trim().toUpperCase())
        .filter(cat => cat.length > 0)
      
      // Calculate next ID based on existing blogs
      const maxId = blogs.length > 0 
        ? Math.max(...blogs.map(blog => parseInt(blog.id) || 0))
        : 0
      const nextId = (maxId + 1).toString()
      
      const blogPost:Blog={
        id: nextId,
        title: value.title,
        category: categories,
        description: value.description,
        date: new Date().toISOString(),
        coverImage: value.coverImage,
        content: value.content,
      }
        const success = await createBlog(blogPost);
        // console.log(success);
        
      toast("Blog post submitted successfully!", {
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4 overflow-auto max-h-96">
            <code className="text-white text-xs">{JSON.stringify(blogPost, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius) + 4px)",
        } as React.CSSProperties,
      })
      
      setIsCreatePost(false)
    },
  })

  return (
    <Card className="w-full border-0 shadow-none relative">
      <button
        onClick={() => setIsCreatePost(false)}
        className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
      <CardHeader>
        <CardTitle>Create Blog Post</CardTitle>
        <CardDescription>
          Share your insights with the community.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form.Field
          name="title"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <FieldGroup>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Future of Fintech"
                  autoComplete="off"
                />
                {isInvalid && (
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                )}
              </FieldGroup>
            )
          }}
        />

        <form.Field
          name="category"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <FieldGroup>
                <FieldLabel htmlFor={field.name}>Categories</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="FINANCE, TECH"
                  autoComplete="off"
                />
                <FieldDescription>
                  Enter categories separated by commas
                </FieldDescription>
                {isInvalid && (
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                )}
              </FieldGroup>
            )
          }}
        />

        <form.Field
          name="description"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <FieldGroup>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <InputGroupTextarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="A brief summary of your blog post..."
                  rows={3}
                  className="resize-none"
                  aria-invalid={isInvalid}
                />
                <FieldDescription>
                  {field.state.value.length}/200 characters
                </FieldDescription>
                {isInvalid && (
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                )}
              </FieldGroup>
            )
          }}
        />

        <form.Field
          name="coverImage"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <FieldGroup>
                <FieldLabel htmlFor={field.name}>Cover Image URL</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="https://images.pexels.com/..."
                  autoComplete="off"
                />
                {isInvalid && (
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                )}
              </FieldGroup>
            )
          }}
        />

        <form.Field
          name="content"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <FieldGroup>
                <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                <InputGroupTextarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Write your blog post content here..."
                  rows={10}
                  className="resize-y"
                  aria-invalid={isInvalid}
                />
                <FieldDescription>
                  The main content of your blog post
                </FieldDescription>
                {isInvalid && (
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                )}
              </FieldGroup>
            )
          }}
        />
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            form.reset()
            setIsCreatePost(false)
          }}
        >
          Cancel
        </Button>
        <Button type="button" onClick={() => form.handleSubmit()}>
          Publish Post
        </Button>
      </CardFooter>
    </Card>
  )
}

export default BlogPostForm