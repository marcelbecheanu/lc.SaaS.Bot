import axios from 'axios';

function getInfoProduct({ cookie, productid }) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `https://www.vinted.pt/api/v2/items/${productid}`,
            timeout: 4000,
            headers: {
                'Cookie': cookie
              }
          }).then(response => {
            resolve(response.data);
          }).catch(error => {
            reject(error);
          });
    })
}

function getAllProductUser({ cookie, userid }) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `https://www.vinted.pt/api/v2/users/${userid}/items`,
            timeout: 4000,
            headers: {
                'Cookie': cookie
              }
          }).then(response => {
            resolve(response.data);
          }).catch(error => {
            reject(error);
          });
    })
}

export default { getAllProductUser, getInfoProduct };