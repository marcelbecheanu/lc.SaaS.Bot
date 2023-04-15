console.clear();
import express, { json, urlencoded } from 'express';
import compression from 'compression';

import settings from './configs/settings.json';

const app = express();
const { port, domain } = settings.server;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(compression());

import vinted from './routes/vinted/vinted.route';
app.use('/v1/vinted', vinted);

    

app.listen(port || 9000, () => console.log(`Server running on http://${domain}:${port}.`));

/*
import { VintedAuthorization, getUserID, getUserProfile, getXCSRFToken } from './services/vinted/user.scrapper'
import { getAllProducts, getInfoFromProduct, deleteProductById, republishProduct } from './services/vinted/product.scrapper';

async function test() {
    let token = "UHNERHRrVHUybmcrMUg3NWcxamhObFpJSWVOYWR1d2t3RUJ0UnRSUy9EVmZ5alRQRXZiZ011TkJqZ2pGSVYrL3pNaEFOaHk3ZDBMbXkxL3M0K05FVTlqR1d6bVl1YUJFaEFmMXNYKzdwS1FrdVFFSm85MGJCQkczMGRCM0t6RGlLYkN1cHFJU1lLUDNRTS8zVU9lQTRSRmo2enYraVNFVXRPY3JtTVluME9QYVl4MUpjMGFTdHdsUnRveUlTc2dYSGVibTVoZnBnTENHdWJmcTJnckFMbU1ZM1VpcDNuN2VvVkoxUkx0UDRocXFGeGVUZnhjOTlnQmVJeGhaeUJBNzNrMWE3NFZpZDhPRDZpQTdIZkY5QmwvNVM4NWFlTnIxcEVUcm5ZUnM4ZG9ldDN6N2t5UC9HTjNPNGZaMy9BSFJmMGFmdmJqazFlYWFxOVl3ZjBJSml6UUc3d3lkTzZOMXJUMXN6ZnhtN0MwcFh3M29ETUgzS3JqVDdoZHdKazVISGRtVEVqR1BzTUd4QUFtclNjYmEyZFd2SDdnejBzQUZZVWpPTTFBWkdYOVBBRGF4M1orTngvT05ZLzdNWTVzMmxlRTJ4ZmNDWGFPRWNTNFhBdXR6OUNJcHFIMDl2Y0tvTDIycy9rdTc4bjhxWnNZKzhGYWU5bHRUeTYrbXRwL0NualNCRW02QW5TdEt1c1JXMCs0aG1VczFXOU9JRVQ5bkY2djBPKzFQUktQTzh6Uzd1dEFyZHlBR2NtRG5uaXB0UGdYcW5EUytKQm5jMjIwbHlveXNFbXF5bVJQZDRrK1JXcG9qbDVmaUEwbThvYm5jQmFqVHlNUTMrR0lwbER6bXpCNjh3YkJrOW9FRUFURURMcFRtdHZFSkhkb1ZsRHg4aHMzSVVPQUJQMktmTnRVVjFRdnR4dkZmcHh2eWRaUnpBUnU2cnFLSGg1ekpUUUFxdFFJTDdkMUR5cGpCVWRFUThCMzFmbE9YQW1lQ2xGZzRWdFNJRThTSXZzNjlybFdwR2VtR2hPeEFoTFlST2pKZ0x2a2daTHNLSlk5b0l3b3NoTzVrdW5RWUhuajdhYzZQZE1TQlVoRjhPVzNNdE5yeW1lcWExWUdtSWNQbXh2ZkREdlViM3E3QmV5MkRXaUJYNTNiK0kwT1M1VnhxWUdmTm5kNXh0M09BalpXdWcxemwrTkRzNWdTVWlkRjU0ZVdCTlJvUGNKVlN3OXJ0MEJZaU4rODUwaUFiN1ZoMnQ2MzlET3R6bEhvZW1mYUJ4eXZ0VXI4VG9iSHhGZmVwTGF3UVpEMy9hSm90ZFp6VE5jNW1uMy9IOFdGZmFKVW45ampzaVk3cWdOMjFJSVI1ZmhYRkxFcXJObUVYYXhqci9iSnVsQlh6ek0wY1dRUVpRdjhVMStGSVJKL0Z0ekdtRm9TTXY0MlJpSE85bDJXb0tqL2hlemhSb1Bwc2xpeTAxVm9UaGxDMU5NeDdmNnVISjlQSjZoM2NCc2RXZjJERzBrYnlKOGxXWmE5blJ5T0kvaDhsc0pSTlVGVHk2a1NHS3NkVXhSbE1LYjlybndQcVNnZVRWS3diQzZ4SnRqRUxsK3FvMXlma05DUlREcjduaFZobFN2OWxqejI3QXlxa05ZUUJaVCtsL3ErMUkwaWF3bGhzcmFOUkpEQlNmc0RXZnNHZk1Ca25JQjhFZU5TSW4rZVdMN1NhcEhXZjA3WDk5TE9qZzRTNThnPT0tLVNwbG9UVzRwdmFhaTNGbm5OeDM4OXc9PQ%3D%3D--db8b05d73a45143f8a9e2573db7752b5367f0543";
    let xcsrftoken = await getXCSRFToken(token);
    let userid = await getUserID({
        sessionToken: token,
        csrfToken: xcsrftoken
    });
    let userDetails: VintedAuthorization = {
        id: userid,
        token: token,
        xcsrftoken: xcsrftoken,
    }
    //console.log(userDetails);

    let profile = await getUserProfile(userDetails);
    //console.log(profile);

    let products = await getAllProducts(userDetails);


    if(products.length > 0) {
        let product = products[0];
        let productInfo = await getInfoFromProduct(product.id, userDetails);
        //console.log(productInfo);
        
       // let republish = await republishProduct(productInfo, userDetails);
        

        //let isDeleted = await deleteProductById(product.id, userDetails);
        //console.log("Product:" + isDeleted);
    
    }else{
        console.log("sem produtos");
    }


}
test();
*/