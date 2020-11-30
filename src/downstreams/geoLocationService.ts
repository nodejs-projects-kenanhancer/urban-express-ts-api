import NodeGeocoder, {Geocoder, Options} from "node-geocoder";
import {GeoLocation} from "./geoLocation";

export class GeoLocationService {
    private geocoder: Geocoder;

    constructor() {
        const options: Options = {
            provider: 'google',
            // Optional depending on the providers
            // fetch: customFetchImplementation,
            apiKey: process.env.GOOGLE_API_KEY, // for Mapquest, OpenCage, Google Premier
            formatter: null // 'gpx', 'string', ...
        };

        this.geocoder = NodeGeocoder(options);
    }

    private static geoCoder: Geocoder = new GeoLocationService().geocoder;

    static async getLocation(address: string): Promise<GeoLocation[]> {
        const res: GeoLocation[] = await GeoLocationService.geoCoder.geocode(address);

        return res;
    }
}