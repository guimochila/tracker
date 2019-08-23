import { Router } from 'express';
import { getTracks, addTracks } from './track.controllers';
import { catchErrors } from '../../handlers/errorHandler';

const router = Router();

// Start URI: /api/tracks
router.get('/', catchErrors(getTracks));
router.post('/', catchErrors(addTracks));

export default router;
