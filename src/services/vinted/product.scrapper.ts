import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import {Blob} from 'buffer';


import { VintedAuthorization } from './user.scrapper';

import settings from '../../configs/settings.json';
import { downloadImage } from '../../utils/download';
const { domain } = settings.scrappers.vinted;

interface Product {
    id: number;
}

interface ProductInfo {
    id: number;
    title: string;
    brand_id: number;
    size_id: number;
    status_id: number;
    disposal_conditions: number;
    user_id: number;
    owner_id: number | null;
    country_id: number;
    catalog_id: number;
    color1_id: number | null;
    color2_id: number | null;
    package_size_id: number;
    is_hidden: boolean;
    is_reserved: boolean;
    reserved_for_user_id: number | null;
    is_visible: boolean;
    is_unisex: boolean;
    material_id?: number | null;
    video_game_rating_id?: number | null;
    is_closed: boolean;
    is_admin_alerted: boolean;
    active_bid_count: number;
    favourite_count: number;
    view_count: number;
    moderation_status: number;
    last_push_up_at: string;
    description: string;
    package_size_standard: boolean;
    item_closing_action: number | null;
    related_catalog_ids: number[];
    related_catalogs_enabled: boolean;
    size: string;
    brand: string;
    composition: string;
    extra_conditions: string;
    is_for_sell: boolean;
    is_for_swap: boolean;
    is_for_give_away: boolean;
    is_handicraft: boolean;
    is_draft: boolean;
    label: string;
    real_value_numeric: number | null;
    original_price_numeric: string;
    currency: string;
    price_numeric: number;
    created_at_ts: string;
    updated_at_ts: string;
    isbn?: string | null;
    user_updated_at_ts: string;
    msg_template_id: number | null;
    item_alert_type: number | null;
    photo_tip_id: number | null;
    color_ids?: number[] | null;
    measurement_length?: number | null;
    measurement_width?: number | null;
    shipment_prices?: {
        domestic: null | number;
        international: null | number;
    };
    photos: Photo[];
}

interface Photo {
    id: number;
    image_no: number;
    width: number;
    height: number;
    dominant_color: string;
    dominant_color_opaque: string;
    url: string;
    is_main: boolean;
    thumbnails: Thumbnail[];
    high_resolution: HighResolution;
}

interface Thumbnail {
    type: string;
    url: string;
    width: number;
    height: number;
    original_size: boolean | null;
}

interface HighResolution {
    id: string;
    timestamp: number;
    url: string;
}


// To Publisher
interface ProductPublisher {
    id: null | number;
    currency: string;
    temp_uuid: string;
    title: string;
    description: string;
    brand_id: number;
    brand: string;
    size_id: number;
    catalog_id: number;
    isbn: null | string;
    is_unisex: boolean;
    is_for_sell: boolean;
    status_id: number;
    material_id: null | number;
    video_game_rating_id: null | number;
    price: number;
    package_size_id: number;
    shipment_prices: {
        domestic: null | number;
        international: null | number;
    };
    color_ids: number[];
    assigned_photos: {
        id: number;
        orientation: number;
    }[];
    measurement_length: null | number;
    measurement_width: null | number;
}

async function getAllProducts(authorization: VintedAuthorization): Promise<Product[]> {
    const url = `${domain}/api/v2/users/${authorization.id.v_uid}/items`;
    try {
        const response = await axios({
            method: 'get',
            url: url,
            timeout: 4000,
            headers: {
                'Cookie': `_vinted_fr_session=${authorization.token}`,
                'x-csrf-token': authorization.xcsrftoken,
            }
        });
        let products:Product[] = response.data.items.filter((elem:any) => elem.is_closed !== 1);
        return products;
    } catch (err) {
        throw new Error(`Failed to fetch products of user from ${url}: ${err}`);
    }
}

async function getInfoFromProduct(productId:number, authorization: VintedAuthorization): Promise<ProductInfo> {
    const url = `${domain}/api/v2/items/${productId}`;
    try {
        const response = await axios({
            method: 'get',
            url: url,
            timeout: 4000,
            headers: {
                'Cookie': `_vinted_fr_session=${authorization.token}`,
                'x-csrf-token': authorization.xcsrftoken,
            }
        });
        let product:ProductInfo = response.data.item;
        return product;
    } catch (err) {
        throw new Error(`Failed to fetch products of user from ${url}: ${err}`);
    }
}

async function deleteProductById(productId: number, authorization: VintedAuthorization): Promise<boolean> {
    const url = `${domain}/api/v2/items/${productId}/delete`;
    try {
        await axios({
            method: 'POST',
            url: url,
            timeout: 4000,
            headers: {
                'Cookie': `_vinted_fr_session=${authorization.token}`,
                'x-csrf-token': authorization.xcsrftoken,
            }
        });
        return true;
    } catch (err) {
        throw new Error(`Failed to delete product of user from ${url}: ${err}`);
    }
}

async function createProduct(product: ProductPublisher, authorization: VintedAuthorization): Promise<boolean> {
    const url = `${domain}/api/v2/items`;
    try {
        const response = await axios.post(url, {
            item: product,
            feedback_id: null
          }, {
            headers: {
                'accept': 'application/json, text/plain, */*',
                'content-type': 'application/json',
                'Cookie': `_vinted_fr_session=${authorization.token}`,
                'x-csrf-token': authorization.xcsrftoken,
            }
        })
        return true;
    } catch(err){
        throw new Error(`Failed to create product from ${url}: ${err}`);
    }
}

async function uploadImageToPost(imgPath: string, authorization: VintedAuthorization): Promise<Photo> {
    const url = `${domain}/api/v2/photos`;
    try {

        const fileContent = await fs.promises.readFile(imgPath);
        const fileBlob:Blob = new Blob([fileContent], { type: 'image/jpeg' });

        const formData = new FormData();
        formData.append('photo[type]', 'item');
        formData.append('photo[file]', fileBlob as any, 'dark-blur-abstract-4k_1551646029.jpg');
        formData.append('photo[temp_uuid]', uuidv4());

        const response = await axios.post('https://www.vinted.pt/api/v2/photos', formData, {
            headers: {
                'accept': 'application/json, text/plain, */*',
                'content-type': 'multipart/form-data',
                'Cookie': `_vinted_fr_session=${authorization.token}`,
                'x-csrf-token': authorization.xcsrftoken,
            }
        })
        return response.data;
    } catch(err) {
        throw new Error(`Failed to upload photo from republish from ${url}: ${err}`);
    }
}

async function republishProduct(productInfo: ProductInfo, authorization: VintedAuthorization) {
    var dir = path.join(__dirname, '..', '..', '..', 'cache', productInfo.id+"");
    try {
        // Check if dir exists. if not will create
        if (!fs.existsSync(dir)) await fs.mkdirSync(dir, { recursive: true });
        
        // Create pool for download images from product.
        const downloadPromises = [];
        for (const photo of productInfo.photos) {
            downloadPromises.push(
                downloadImage({
                    url: photo.url,
                    path: path.join(dir, photo.id + ".jpeg"),
                })
            );
        }
        let imgPaths = await Promise.all(downloadPromises);

        // Delete Product
        let isDelete = await deleteProductById(productInfo.id, authorization);
        if(!isDelete) throw Error(`Failed to delete product for republish.`);

        let uploadPromises = [];
        for(const path of imgPaths){
            uploadPromises.push(
                uploadImageToPost(path, authorization)
            );
        }
        let uploadedPhotos:Photo[] = await Promise.all(uploadPromises);


        // Create Publisher Product
        let product:ProductPublisher = {
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
        if(productInfo.shipment_prices){
            if(productInfo.shipment_prices.domestic){
                product.shipment_prices.domestic = productInfo.shipment_prices.domestic;
            }
            if(productInfo.shipment_prices.international){
                product.shipment_prices.international = productInfo.shipment_prices.international;
            }
        }

        // add colors
        if(typeof productInfo.color1_id === 'number') product.color_ids.push(productInfo.color1_id);
        if(typeof productInfo.color2_id === 'number') product.color_ids.push(productInfo.color2_id);

        // add photos
        for(const photo of uploadedPhotos){
            product.assigned_photos.push({
                id: photo.id,
                orientation: 0
            });
        }

        // republish product
        await createProduct(product, authorization);

    } catch(err) {
        throw new Error(`Failed to republish product of user from ${productInfo.id}: ${err}`);
    }
}

export { Product, ProductInfo, getAllProducts, getInfoFromProduct, deleteProductById, republishProduct, createProduct }