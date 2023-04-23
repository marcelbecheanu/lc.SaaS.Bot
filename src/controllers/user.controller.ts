import { Request, Response } from 'express';
import { getXCSRFToken, getUserID, getUserProfile, VintedAuthorization } from '../models/user.model';

async function getVintedUserData( req: Request, res: Response ): Promise<any> {
    try {
        let token = req.body.token || req.params.token || req.query.token;
        let csrfToken = req.body.csrfToken || req.params.csrfToken || req.query.csrfToken;

        if (!token) {
          return res.status(400).json({
            code: 400,
            data: {
                message: 'Bad Request: token is missing',
            }
          });
        }

        let user = await getUserProfile();

        return res.status(200).json({
            code: 200,
            data: {

            }
        })
    

    } catch (err) {
        return res.status(500).json({
            code: 500,
            data: {
                message: "Internal Error Server"
            }
        })
    } 
}


export { getVintedUserData };