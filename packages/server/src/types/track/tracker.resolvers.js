import Track from './track.model';

export default {
  Query: {
    async myTracks(_, __, { req }) {
      if (!req.userId) {
        throw new Error('You must sign in to list your tracks');
      }
      const tracks = await Track.find({ userId: req.userId });

      return tracks;
    },
  },
  Mutation: {
    async addTrack(_, { name, locations }, { req }) {
      if (!req.userId) {
        throw new Error('You must sign in to add new track');
      }
      if (!name || !locations || !Array.isArray(locations)) {
        throw new Error('You must provide a name and locations');
      }

      const track = await Track.create({
        name,
        locations,
        userId: req.userId,
      });

      return track;
    },
  },
};
