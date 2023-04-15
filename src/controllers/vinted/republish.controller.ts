import { Request, Response } from 'express';
import { AxiosError } from 'axios';
import { VintedAuthorization, getXCSRFToken, getUserID } from '../../services/vinted/user.scrapper';
import { Product, ProductInfo, getAllProducts, getInfoFromProduct, republishProduct } from '../../services/vinted/product.scrapper';

async function republish(req: Request, res: Response): Promise<Response> {
  try { 
    let token = req.body.token || req.params.token || req.query.token;

    if (!token) {
      return res.status(400).json({
        code: 400,
        message: 'Bad Request: token is missing',
      });
    }

    // Your republish logic here
    let xcsrftoken = await getXCSRFToken(token);
    let userid = await getUserID({ sessionToken: token, csrfToken: xcsrftoken });
    let userDetails: VintedAuthorization = {
        id: userid,
        token: token,
        xcsrftoken: xcsrftoken,
    }
    
    // Getting all products from user
    let productsWithoutInformation:Product[] = await getAllProducts(userDetails);
    
    // Getting all products informations
    let queueGettingInformations = [];
    for(var product of productsWithoutInformation){
        queueGettingInformations.push(
            getInfoFromProduct(product.id, userDetails)
        );
    }
    let products:ProductInfo[] = await Promise.all(queueGettingInformations);

    // Republish every product.
    let queueRepublish = [];
    for(var prod of products){
        queueRepublish.push(
            republishProduct(prod, userDetails)
        );
    }
    await Promise.all(queueRepublish);

    // Return a success response if everything went well
    return res.status(200).json({
      code: 200,
      message: 'Product republished successfully',
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      // Handle Axios error
      if(err.response){
        console.log(err.response);
      }
    }

    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });

  }
}

export default republish;