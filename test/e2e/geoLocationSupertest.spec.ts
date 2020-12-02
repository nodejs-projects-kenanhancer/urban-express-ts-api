import {expect, should} from 'chai';
import request from 'supertest';
import {httpServer} from "../../src/server";
import {Server} from "http";

should();

describe("GeoLocation API", () => {
    let server: Server;

    before(() => {
        server = httpServer.listen();
    });

    after(() => {
        server.close();
    });

    describe("GET /urban/api/geolocation/:address", async () => {

        it("it should GET address geoLocation of White Bear Yard", async () => {
            const address: string = "White Bear Yard";

            const res: any = await request(server).get(`/urban/api/geolocation/${address}`);

            expect(res).to.have.property("status").equal(200);
            expect(res.body).to.be.a("object");


            // res.should.have.property("status").equal(200);
        });

        it("it should GET address geoLocation of White Bear Yard 22", async () => {
            const address: string = "White Bear Yard 22";

            const res: any = await request(server).get(`/urban/api/geolocation/${address}`);

            res.should.have.property("status").equal(400);
        });

    });

});