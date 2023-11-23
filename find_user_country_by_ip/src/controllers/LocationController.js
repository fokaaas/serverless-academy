import locationService from '../services/LocationService.js';

class LocationController {
  getLocation(req, res) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress.replace(/^.*:/, '');
    const data = locationService.getLocation(ip);
    return res.status(200).json(data)
  }
}

export default new LocationController();