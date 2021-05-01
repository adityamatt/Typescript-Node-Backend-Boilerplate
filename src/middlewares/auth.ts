import express from 'express'
import { RESPONSE_CODES } from '../constants'
import jwt from 'jsonwebtoken'
const extractToken = (req: express.Request) => {
  return req.headers.authorization.split(' ')[1]
}
const sendUnAuthorizedResponse = (res: express.Response) => {
  res.status(RESPONSE_CODES.UNAUTHORIZED)
  res.json('Invalid Authorizaiton Token')
}
export function auth(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const token = extractToken(req)
    //Validate Token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
    next()
  } catch (err) {
    sendUnAuthorizedResponse(res)
  }
}
