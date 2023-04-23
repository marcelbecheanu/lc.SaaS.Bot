const { getUser } = require('../model/user.model');

module.exports = {
    getUser: async (req, res) => {
        const { shop, domain, token, csrfToken, id } = req.query;
        try {
            if (!shop || !domain || !token || !csrfToken || !id) {
                const missingParams = [];
                if (!shop) missingParams.push('shop');
                if (!domain) missingParams.push('domain');
                if (!token) missingParams.push('token');
                if (!csrfToken) missingParams.push('csrfToken');
                if (!id) missingParams.push('id');
    
                return res.status(400).json({
                    code: 400,
                    response: {
                        message: 'Bad Request',
                        missing_params: missingParams
                    }
                });
            }
            let user = await getUser(shop, domain, token, csrfToken, id);
            return res.status(200).json({ code: 200, response: user })
        } catch (err) {
            return res.status(500).json({ code: 500, response: { message: "Internal Error Server" } });
        }
    }
};