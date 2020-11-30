import {Document, Model, model, Schema} from 'mongoose';

interface LocationDetails extends Document {
    address: string;
    city: string;
    lat: number;
    lng: number;
    serviceArea: string;
    postcode: string;
}

interface Location extends Document {
    status: string;
    search: string;
    location: LocationDetails
}


const LocationDetailsSchema: Schema = new Schema({
    address: {type: String},
    city: {type: String},
    lat: {type: Number},
    lng: {type: Number},
    serviceArea: {type: String},
    postcode: {type: String}
})

const LocationSchema: Schema = new Schema({
    status: {type: String, required: true},
    search: {type: String, required: true},
    location: {type: LocationDetailsSchema, required: true}
});

const LocationModel: Model<Location> = model('Location', LocationSchema);

export class LocationMongoRepository {
    async save(location: Location): Promise<void> {
        const newLocation: Location = new LocationModel(location);

        await newLocation.save();
    }

    async findOne(address: string): Promise<Location | null> {
        const location: Location | null = await LocationModel.findOne({"search": address});

        return location?.toJSON();
    }
}

export {LocationModel, Location};