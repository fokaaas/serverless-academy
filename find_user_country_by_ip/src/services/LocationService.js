import fs from 'node:fs';

const PATH = 'locations/IP2LOCATION-LITE-DB1.CSV';

class LocationService {
  getLocation(ip) {
    const ipNumber = this.ipToInt(ip);
    const locations = fs.readFileSync(PATH, 'utf-8').split('\r\n');
    for (const location of locations) {
      const [ from, to, countryCode, countryName ] = location.replace(/"/g, '').split(',');
      if (from <= ipNumber && to >= ipNumber) {
        return {
          from: this.intToIp(from),
          to: this.intToIp(to),
          countryCode,
          countryName,
        };
      }
    }
  }

  ipToInt(ip) {
    const fn = (res, item) => (res << 8) + parseInt(item);
    return ip.split('.').reduce(fn, 0) >>> 0;
  }

  intToIp(int) {
    const octet1 = (int >> 24) & 255;
    const octet2 = (int >> 16) & 255;
    const octet3 = (int >> 8) & 255;
    const octet4 = int & 255;
    return `${octet1}.${octet2}.${octet3}.${octet4}`;
  }
}

export default new LocationService();