const axios = require('axios');

function getProfile({ id, token, csrfToken, domain }) {
    const url = `${domain}/api/v2/users/${id}`;
    return axios.get(url, {
      headers: {
        Cookie: `_vinted_fr_session=${token}`,
        'x-csrf-token': csrfToken,
      },
    })
  }

module.exports =  { getProfile }