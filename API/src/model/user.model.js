const { v4: uuidv4 } = require('uuid');
const vinted = require('../scrapper/vinted/user.scrapper');

function getUser(shop, domain, token, csrfToken, id) {
    return new Promise(async (resolve, reject) => {
        const user = {
            id: uuidv4(),
            group: {
                groupId: 0,
                groupName: "LIMITED",
                maxRepublish: 300
            },
            actions: {
                republishedTimes: 0
            },
            data: {}
        };

        if (shop == "vinted") {
            let response = await vinted.getProfile({ id, token, csrfToken, domain });
            user.data = response.data.user;
            resolve(user);
        } else {
            reject({ code: 501, data: { message: "Not Implemented" } });
        }
    });
}

module.exports = { getUser };