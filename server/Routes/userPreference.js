import express from 'express';
import {getPreferences} from '../Controller/userPreferences.js';

const userPreferenceRoutes = express.Router();

userPreferenceRoutes.get('/:userId/preferences', getPreferences);

export default userPreferenceRoutes;

