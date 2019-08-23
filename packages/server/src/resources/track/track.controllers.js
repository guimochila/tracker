import Track from './track.model';

export const getTracks = async (req, res) => {
  const tracks = await Track.find({ userId: req.user.userId });

  res.json({ tracks });
};

export const addTracks = async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations || !Array.isArray(locations)) {
    res.status(400).json({ error: 'You must provide name and locations' });
  }

  const track = await Track.create({
    name,
    locations,
    userId: req.user.userId,
  });

  res.json({ track });
};
