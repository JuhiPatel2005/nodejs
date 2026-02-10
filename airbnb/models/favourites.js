const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUTIL');

const dataDir = path.join(rootDir, 'data');
const favouriteDataPath = path.join(dataDir, 'favourite.json');

module.exports = class Favourites {
  static addToFavourites(id, callback) {
    Favourites.getFavourites((favourites) => {
      if (!favourites.includes(id)) {
        favourites.push(id);
      } else {
        favourites.push(id);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites, null, 2)  );
      }
  });
}

static getFavourites(callback) {
  fs.readFile(favouriteDataPath, (err, data) => {
    if (err) {
      console.error('Error reading favourites:', err.message);
      return callback([]);
    }
    callback(JSON.parse(data));
  });
}

  static deleteById(delhomeId, callback) {
    Favourites.getFavourites(homeIds => {
      homeIds = homeIds.filter(homeId => delhomeId !== homeId);
      fs.writeFile(favouriteDataPath, JSON.stringify(homeIds),callback);
    });
  }

}

