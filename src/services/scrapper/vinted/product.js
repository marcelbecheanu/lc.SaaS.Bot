const axios = require('axios');

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
  });
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
  });
}

async function uploadProductImage({ cookie, imgPath }) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `https://www.vinted.pt/api/v2/photos`,
      timeout: 4000,
      headers: {
        'Cookie': cookie
      },
      body: {

      },
    }).then(response => {
      resolve(response.data);
    }).catch(error => {
      reject(error);
    });
  });
}

function createProduct({ cookie, imgPath, details }) {
  return new Promise((resolve, reject) => {
    	try {


      } catch (err) {
        reject(err);
      }
  });
}

module.exports = { getAllProductUser, getInfoProduct, uploadProductImage };