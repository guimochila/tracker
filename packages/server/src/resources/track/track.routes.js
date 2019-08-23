import { Router } from 'express';
import { getTracks, addTracks } from './track.controllers';

const router = Router();

// Start URI: /api/tracks
router.get('/', getTracks);
router.post('/', addTracks);

export default router;
