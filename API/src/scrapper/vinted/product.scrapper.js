const { v4: uuidv4 } = require('uuid');
const { Blob } = require('buffer');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const { downloadImage } = require('../../util/download');

function getAllProducts({ id, token, csrfToken, domain }) {
    const url = `${domain}/api/v2/users/${id}/items`;
    return axios({
        method: 'GET',
        url: url,
        headers: {
            'Cookie': `_vinted_fr_session=${token}`,
            'x-csrf-token': csrfToken,
        },
    });
}

function getInfoFromProduct(productId, { token, csrfToken, domain }) {
    const url = `${domain}/api/v2/items/${productId}`;
    return axios({
        method: 'get',
        url: url,
        timeout: 4000,
        headers: {
            'Cookie': `_vinted_fr_session=${token}`,
            'x-csrf-token': csrfToken,
        },
    });
}

function deleteProductById(productId, { token, csrfToken, domain }) {
    const url = `${domain}/api/v2/items/${productId}/delete`;
    return axios({
        method: 'POST',
        url: url,
        timeout: 4000,
        headers: {
            'Cookie': `_vinted_fr_session=${token}`,
            'x-csrf-token': csrfToken,
        },
    });
}

function createProduct(product, { id, token, csrfToken, domain }) {
    const url = `${domain}/api/v2/items`;
    return axios.post(url, {
        item: product,
        feedback_id: null
    }, {
        headers: {
            'accept': 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'Cookie': `_vinted_fr_session=${authorization.token}`,
            'x-csrf-token': authorization.csrfToken,
        }
    });
}

function uploadImageToPost(imgPath, { token, csrfToken, domain }) {
    const url = `${domain}/api/v2/photos`;
    return fs.promises
        .readFile(imgPath)
        .then((fileContent) => {
            const fileBlob = new Blob([fileContent], { type: 'image/jpeg' });
            const formData = new FormData();

            let uuid = uuidv4();

            formData.append('photo[type]', 'item');
            formData.append('photo[file]', fileBlob, uuid + '.jpg');
            formData.append('photo[temp_uuid]', uuid);

            return axios.post('https://www.vinted.pt/api/v2/photos', formData, {
                headers: {
                    'accept': 'application/json, text/plain, */*',
                    'content-type': 'multipart/form-data',
                    'Cookie': `_vinted_fr_session=${token}`,
                    'x-csrf-token': csrfToken,
                }
            })
        })
};


// TODO: NOT FINISHED
async function republishProduct(productInfo, photos = [], { id, token, csrfToken, domain }) {
    try {
        let product = {
            id: null,
            currency: productInfo.currency,
            assigned_photos: [],
            brand: productInfo.brand,
            catalog_id: productInfo.catalog_id,
            brand_id: productInfo.brand_id,
            color_ids: [],
            is_for_sell: productInfo.is_for_sell,
            is_unisex: productInfo.is_unisex,
            material_id: productInfo.material_id || null,
            description: productInfo.description,
            title: productInfo.title,
            isbn: productInfo.isbn || null,
            package_size_id: productInfo.package_size_id,
            size_id: productInfo.size_id,
            shipment_prices: {
                domestic: null,
                international: null
            },
            price: productInfo.price_numeric,
            temp_uuid: uuidv4(),
            status_id: productInfo.status_id,
            video_game_rating_id: productInfo.video_game_rating_id || null,
            measurement_length: productInfo.measurement_length || null,
            measurement_width: productInfo.measurement_width || null
        };

        // add shipment_prices
        if (productInfo.shipment_prices) {
            if (productInfo.shipment_prices.domestic) {
                product.shipment_prices.domestic = productInfo.shipment_prices.domestic;
            }
            if (productInfo.shipment_prices.international) {
                product.shipment_prices.international = productInfo.shipment_prices.international;
            }
        }

        // add colors
        if (typeof productInfo.color1_id === 'number') product.color_ids.push(productInfo.color1_id);
        if (typeof productInfo.color2_id === 'number') product.color_ids.push(productInfo.color2_id);

        // add photos
        

        // republish product
        await createProduct(product, authorization);

        // delete
        let isDelete = await deleteProductById(productInfo.id, authorization);
        if (!isDelete) throw Error(`Failed to delete product for republish.`);

    } catch (err) {
        throw new Error(`Failed to republish product of user from ${productInfo.id}: ${err}`);
    }
}
