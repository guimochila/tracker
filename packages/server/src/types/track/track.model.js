import { Schema, model } from 'mongoose';

const pointSchema = new Schema({
  timestamp: Date,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
});

const trackSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    locations: [pointSchema],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
);

export default model('Track', trackSchema);
