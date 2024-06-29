import axios from 'axios';
import Config from 'react-native-config';

const API_URL = Config.API_URL;
const TEMP_TOKEN = Config.TEMP_TOKEN;

export const getProductMarkerList = async (southWestLat: number, southWestLng: number, northEastLat: number, northEastLng: number) => {
    try {
        const response = await axios.get(
            `${API_URL}/marker/recommend`,
            {
                params: {
                size: 100,
                southWestLat,
                southWestLng,
                northEastLat,
                northEastLng,
            },
            headers: {
                Authorization: `Bearer ${TEMP_TOKEN}`,
            },
        });
        console.log('###response.data::', response.data);
        return response.data.markerList;
    } catch (error) {
        console.error(error);
    }
}

// TODO
// export const getProductList = async (productIds: number[]) => {
//     try {
//         const response = await axios.get(`${API_URL}/product/list`, {
//             params: { productIds },
//             headers: {
//                 Authorization: `Bearer ${TEMP_TOKEN}`,
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.error(error);
//     }
// }