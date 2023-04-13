const express = require('express');
const route = express.Router();
const uuid4 = require("uuid4");
const fs = require('fs');
const axios = require("axios");

const { republish } = require('../../controllers/vinted/republish.controller.js');
const vinted = require('../../services/scrapper/vinted/vinted.js');
const { uploadProductImage } = vinted.Product;
const { getUserID, getAllHeaders } = vinted.User;

route.post('/republish', republish);

route.get('/status', async (req, res) => {

    const token = "bXR0bTZMeHgvRm80VHYrZDJmNkhsbXcyRXBNanRhbzZIdGJrcjFKelhaVEVlS3NOS2pJeVhDMnFlbE4zVitsQWp5Wk9UTXhGSTJVZElSOGlQVEdOWXlaUUpJWVpPSGVZVGUrQXIxMHpRajBVaGRBYUExZENqVjlQamlJZWpoUW1VbWZaalFCeW9yYVdNVVB3SG1WVW44cHFlcHFrSmtMeFFpUkZkWGNWTXdHNVJDUU1MeUpQZHljdE5DNFZKNkF4TFhJbmZsRlN5OEc0eU1IMG03TjZlYXNGSUdtb3BxbEhEWCtiOVZDcklSSWtpalcrSVNSVzRpZldqb1BLZElOQmZBeGplNnR5U2xXL0VxNWZLVVhwR1g3ZVB0QXRkZXlYazhMOEJsdElNTHMxVzFlMGExODg0VWRUbzMwN0g4cmFxM0tYNmFIaU44dW1yam81blV5OXVKcGZTQndEZE9oSnpWQ2ROakRCZmVNeHh0WHRsc1NRVHlkbVMzcWdCaWlxMjZPZkkrMmVGWlhYQ3BaOEY2U1dDdVV6eUI0Qk0vSUxoNzVyVFpCRURjdExJdWFuZ2ltZ1FiOU5NS2JJeENoVzdPNzU4SnNQUWl5c2NERWExWExIZEllUXJpWkp1elJaTUFEZXVKSUovaFhRSDRKWmF3N21MbXIxQklNOXJzT0RLWVRvZ2xvaDFvdzljZXU2L3laYmRDVktVS3VnVmI3alJwK0lQVUdqbGhkcnozZEtkV0VyQ2NYVUtBL3lvVHhyektneWN4R20vbXdBcjVoL3kzRmo1NmQ2bS9Dc3hmdTNmR2NWK1d4enVISm5BWGpkdGMxT3dUMDVvWXJIaUw0RUt3ZzV3cmg0TnQzMTkrcWhSemxrd3k4NDlBZUFmb1BnbE13aFZoTGlEV2gwQ0xJVk5jODdpWWNPMm5CcTZFREZSRThkci9xSHE3bFFKelRRbEhrTGlxazR1MVdKSDR3VXpxdllHdDlyN21xRGl3WWNKVStlSmt4amV1VnFMWGxoZ0gxZGhjQld2WlQ2b2lTMjZYZGdWdUcrejNlSXUyUURVSXlWMjdkV1NGejlFUHVxdnNuUytaNnhtR3RHQXF1dTdGLzYxZkNSOE1POUlwcitxMHRpdDBqOUZ2U3dmTENpWUUvVXR4QldlRWtzaFliNGlTWFRodjRWYm5ZdVFITVdxTzFlbFR2MkxOQWpwa1YxYWtqWWdSZFhEZzhwUjdTK3Y3WlRQOHpieGdvWTVwT2c2Q0JBRUxYaHoxYkRwOWl6ajRORW1ybGZ4M2kxR3duZG5mMkhEM1J3N3BDK09MNk9JQ2JsOHV5cHlrK2l0VCtuSG9wQXU2amd4ZndMZEdRcTZUWGxIelJ2eTl0VmZmNXJ4WFlocWF5S0dBRVR2SjVhRm1NTVhCdTgrbTFENUt5QVhNalIwS0h6SDA5OC9nRnQwYk9oYk4wOTJoZGFvcXF0Ty8wdWNQZlhzNm1GZDVEMTVnYVdUd0w4OUlQOUpmUFFGOGlNUS9GbEl0aHVSbGFGb3VONUxnUjEzby9FQm1BV01BQXZKOFJDaWlNU3NSMk05eEhXMVE1ZU9xekE4R251QlZXV0pjTUZ4RGJ4VHJBZ2k2YVVrV2l3Q1d0RmFMZXJ4N0NPUFhPQ2lVTDJtbktZSHl3Q2I3NTliVm8vWkpZQVlIWkFydnRqd0srT2srNEtaRTE1cDVCdFRIM2JqTi8wNlR4ZjA4d0NZbUNyYXdWSVRZN29uaVlDZDFWZndNNzJ1N3VFQUhrODlQWEVEaFczdmZrd0dvZWpjTlBpVzkzd3QyVGlhQytIU21VSE1jdWl3OEl2aktIVk5MTGdSOXN1ZTJDSXZqTkNwekdaa09kbXlaTmxyRHpCd20xNmpPOVNIZytLdjE0YmNoUkJtdWNITGlTSXh5akpZaUlOMkZLZE40a2I5bU5ZS0hVcFhwU2RObUdTOFFiM3JKOWo0QytzdXJTSU9sYzU1Q1FlU1h4YWttb3hvUnlEdkZJPS0tN0lmQXNmMm5VYWFmNXlybDUyUnA2UT09--b126ce331aab2cd70593ac7df846ec18c7a8d380"
    const cookie = `_vinted_fr_session=${token};`;
    const idOfUser = await getUserID({ cookie });
    let headers = await getAllHeaders({ cookie: cookie });
    let cookiesString = headers.join('; ');
    let uuid = uuid4();

    if(idOfUser == 136281222){
        const formData = new FormData();
        
        const filePath = 'C:/Users/Marce/Pictures/dark-blur-abstract-4k_1551646029.jpg';
        const fileContent = await fs.promises.readFile(filePath);
        const fileBlob = new Blob([fileContent], { type: 'image/jpeg' });

        formData.append('photo[type]', 'item');
        formData.append('photo[file]', fileBlob, 'dark-blur-abstract-4k_1551646029.jpg');
        formData.append('photo[temp_uuid]', uuid);
        
        axios.post('https://www.vinted.pt/api/v2/photos', formData, {
          headers: {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'pt-PT,pt;q=0.8',
            'content-type': 'multipart/form-data',
            'sec-ch-ua': '"Brave";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'sec-gpc': '1',
            'x-csrf-token': 'fNFhfbazo11h9vp-DpQm2j520LVmaOmFSwCIGYox_-DoHALr9IP_KP9IUF9iuU1LiUAwBJ4n3whk0yHsaMJYzA',
            'Cookie': cookiesString
          },
          referrer: 'https://www.vinted.pt/items/new',
          referrerPolicy: 'strict-origin-when-cross-origin',
          withCredentials: true,
        })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
    } else { 
        console.log("token invalido");
    }

  

})



module.exports = route;