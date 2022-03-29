const BASE_URL = 'https://api-dev.shop-delivery.ru/int_api/ozon';

class Http {
    static async post(url, params) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params),
        };
    
        try {
            const response = await fetch(`${BASE_URL}${url}`, requestOptions);

            if (!response.ok) {
                throw new Error('Ошибка получения данных');
            }

            return await response.json();
        } catch(err) {
            console.error(err);
        }
    }
}

async function getProduct(catId) {
    const params = {
        "attribute_type": "ALL",
        "category_id": [
            +catId
        ],
        "language": "DEFAULT"
    };

    const res = await Http.post('/v3/category/attribute', params);
    return res.result[0].attributes;
}

async function getAttrValues(catId, id) {
    const params = {
        "attribute_id": id,
        "category_id": +catId,
        "language": "DEFAULT",
        "last_value_id": 0,
        "limit": 20,
        "query": ""
    };

    return await Http.post('/v2/category/attribute/values', params);
}

export { getProduct, getAttrValues };