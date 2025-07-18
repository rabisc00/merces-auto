import { NextFunction, Request, Response } from "express"
import { ZodType, ZodError } from "zod"

const formatZodErrors = (issues: ZodError['issues']) => {
    const formatted: Record<string, string> = {};
    for (const issue of issues) {
        const path = issue.path.join('.');
        formatted[path] = issue.message;
    }

    return formatted;
};

export const validate = (schema: ZodType<any, any>) =>
    (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ error: formatZodErrors(result.error.issues) });
    }

    req.body = result.data;
    next();
};