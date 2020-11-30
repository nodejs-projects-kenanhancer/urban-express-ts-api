import {IGeoLocationController} from "./iGeoLocationController";
import {GeoLocation, GeoLocationService} from "../downstreams";
import {Errors} from "../constants";
import insidePolygon from "point-in-polygon";
import districts from "../formatted-districts.json";

export class GeoLocationController implements IGeoLocationController {
    async search(address: string): Promise<any> {

        const geoLocations: GeoLocation[] = await GeoLocationService.getLocation(address);

        if (geoLocations.length === 0) {
            throw Errors.NON_EXISTING_ADDRESS;
        }

        const geoLocation: GeoLocation = geoLocations[0];

        const feature: any = districts.features.find((feature: any) => feature.geometry.coordinates.some((polygon: any[]) => insidePolygon([geoLocation.longitude as number, geoLocation.latitude as number], polygon)));

        if (!feature) {
            throw Errors.NON_EXISTING_ADDRESS;
        }

        const response = {
            status: "OK",
            search: address,
            location: {
                address: geoLocation.formattedAddress,
                city: geoLocation.city,
                lat: geoLocation.latitude,
                lng: geoLocation.longitude,
                serviceArea: feature.properties.Name,
                postcode: geoLocation.zipcode
            }
        };

        return response;

    }
}