// CREATE

import { NextFunction, Request, Response } from "express";

export const CreateProject = (
  res: Response,
  req: Request
  //   next: NextFunction
) => {
  const frontend_data = req.body;

  console.log(req.body);

  //   res.json(frontend_data)
};

// READ
export const getAllProjects = (res: Response, req: Request) => {};
// UPDATE
// DELETE
