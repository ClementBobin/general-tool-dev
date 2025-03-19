import api from './api.secure.crit.json';
import db from './db.secure.crit.json';

const combinedConfig = [...api, ...db];

export default combinedConfig;