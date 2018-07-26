const graphql = require("graphql");
const _ = require("lodash");

const Station = require('../models/station');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull, 
  GraphQLBoolean,
  GraphQLFloat
} = graphql;


const StationType = new GraphQLObjectType({
  name: "Station",
  fields: () => ({
    id: { type: GraphQLID },
    localId: { type: GraphQLID },
    locationId: { type: GraphQLString },
    name: { type: GraphQLString },
    status: { type: GraphQLString },
    dateOpened: { type: GraphQLString },
    stallCount: { type: GraphQLInt },
    counted: { type: GraphQLBoolean },
    elevationMeters: { type: GraphQLInt },
    powerKilowatt: { type: GraphQLInt },
    solarCanopy: { type: GraphQLBoolean },
    battery: { type: GraphQLBoolean },
    statusDays: { type: GraphQLInt },
    urlDiscuss: { type: GraphQLBoolean },
//    address: { type: AddressType },
//    gps: { type: GPSType }
  })
});

const AddressType = new GraphQLObjectType({
  name: "Address",
  fields: () => ({
    street: { tyhpe: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: GraphQLString },
    country: { type: GraphQLString },
    countryId: { type: GraphQLID },
    region: { type: GraphQLString },
    regionId: { type: GraphQLID }
  })
})

const GPSType = new GraphQLObjectType({
  name: "GPS",
  fields: () => ({
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    station: {
      type: StationType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Station.findById(args.id);
      }
    },
    stations: {
      type: new GraphQLList(StationType),
      resolve(parent, args) {
        return Station.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addStation: {
      type: StationType,
      args: {
        localid: { type: new GraphQLNonNull(GraphQLID) },
        locationid: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(GraphQLString) },
        dateOpened: { type: GraphQLString },
        stallCount: { type: GraphQLInt },
        counted: { type: GraphQLBoolean },
        elevationMeters: { type: GraphQLInt },
        powerKilowatt: { type: GraphQLInt },
        solarCanopy: { type: GraphQLBoolean },
        battery: { type: GraphQLBoolean },
        statusDays: { type: GraphQLInt },
        urlDiscuss: { type: GraphQLBoolean },
//        address: { type: AddressType },
//        gps: { type: GPSType },
      },
      resolve(parent, args) {
        let station = new Station({
          localid: args.localid,
          locationid: args.locationid,
          name: args.name,
          status: args.status,
          dateOpened: args.dateOpened,
          stallCount: args.stallCount,
          counted: args.counted,
          elevationMeters: args.elevationMeters,
          powerKilowatt: args.powerKilowatt,
          solarCanopy: args.solarCanopy,
          battery: args.battery,
          statusDays: args.statusDays,
          urlDiscuss: args.urlDiscuss,
          address: args.address,
          gps: args.gps,
        });
        return station.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});