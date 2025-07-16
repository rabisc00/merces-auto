import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function getTravelTime(origin: string, destination: string) {
    const url = 'https://maps.googleapis.com/maps/api/directions/json';

    const params = {
        origin,
        destination,
        mode: 'driving',
        key: GOOGLE_MAPS_API_KEY
    }

    try {
        const response = await axios.get(url, { params });

        if (response.data.status !== 'OK') {
            throw new Error(`Google Maps error: ${response}`);
        }

        const leg = response.data.routes[0].legs[0];

        return {
            distanceInMeters: leg.distance.value,
            durationInSeconds: leg.duration.value
        };
    } catch (error: any) {
        throw new Error(`Failed to get travel time: ${error.message}`);
    }
}