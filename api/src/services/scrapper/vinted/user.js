import axios from 'axios';

function getUserID({ cookie }) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'https://www.vinted.pt/api/v2/users/stats',
      timeout: 4000,
      headers: {
        'Cookie': cookie
      }
    }).then(response => {
        let data = response.headers["set-cookie"];
        let v_uid = data.map(cookie => cookie.split('; ').find(c => c.startsWith('v_uid='))).find(cookie => cookie !== undefined)?.split('=')[1];
        if(typeof v_uid !== null && typeof v_uid !== undefined)
            resolve(v_uid)
        else 
            reject({ code: 100 })
    }).catch(error => {
      reject(error)
    });
  });
}

export default { getUserID }
