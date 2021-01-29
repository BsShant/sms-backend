import { IUserWithUserNamePasswordRole } from './../users/user.Interface';

import { verify } from "jsonwebtoken";

export const authenticateToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: IUserWithUserNamePasswordRole) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}
