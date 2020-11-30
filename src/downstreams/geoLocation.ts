export class GeoLocation {
    formattedAddress?: string;
    latitude?: number;
    longitude?: number;
    extra?: {
        googlePlaceId?: string;
        confidence?: number;
    };
    administrativeLevels?: {
        level1long?: string;
        level1short?: string;
        level2long?: string;
        level2short?: string;
    };
    city?: string;
    streetName?: string;
    streetNumber?: string;
    country?: string;
    countryCode?: string;
    zipcode?: string;
    provider?: string;
    state?: string;
    stateCode?: string;
    county?: string;
    district?: string;
    building?: string;
}