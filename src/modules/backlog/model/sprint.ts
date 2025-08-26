import { z } from "zod"

export const sprintFormSchema = z.object({
    name: z.string().min(1, "Sprint name is required"),
    goal: z.string().optional(),
    startDate: z.string(),
    endDate: z.string(),
});

export const taskFormSchema = z.object({
    title: z.string().min(1, "Task title is required"),
    description: z.string().min(1, "Task description is required"),
    priorityId: z.enum(["low", "medium", "high"]).refine(
        (val) => ["low", "medium", "high"].includes(val),
        { message: "Invalid priority" }
    ),
    assignee: z.string().min(1, "Assignee is required"),
    sprint: z.string().min(1, "Sprint is required"),
    story: z.string().min(1, "Story is required"),
    dueDate: z.string().min(1, "Due date is required"),
    tags: z.array(z.string()),
});

export const storyFormSchema = z.object({
    title: z.string().min(1, "Story title is required"),
    description: z.string().min(1, "Story description is required"),
    acceptanceCriteria: z.string().optional(),
    priorityId: z.enum(["low", "medium", "high", "critical"]).refine(
        (val) => ["low", "medium", "high", "critical"].includes(val),
        { message: "Invalid priority" }
    ),
    point: z.number().refine(
        (val) => [1, 2, 3, 5, 8, 13, 21].includes(val),
        { message: "Invalid story points" }
    ),
    sprintId: z.string().nullable(),
    tags: z.array(z.string()),
    owner: z.string().optional(),
});
