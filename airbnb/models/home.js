const db = require("../utils/databaseUtil");

class Home {
  constructor(
    housename,
    price,
    location,
    photourl,
    description,
    rooms,
    host,
    imageUrl,
    id,
  ) {
    this.housename = housename;
    this.price = price;
    this.location = location;
    this.photourl = photourl || imageUrl || null;
    this.imageUrl = imageUrl || photourl || null;
    this.description = description || null;
    this.rooms = rooms || null;
    this.host = host || null;
    this.id = id;
  }
  save() {
    if(this.id){
      return db.execute(`
        UPDATE homes SET housename = ?, price = ?, location = ?, photourl = ?, description = ? WHERE id = ?`,
        [this.housename, this.price, this.location, this.photourl, this.description, this.id]
      );

    } else {
    return db.execute(
      `INSERT INTO homes (housename, price, location, photourl, description) VALUES (?, ?, ?, ?, ?)`,
      [this.housename, this.price, this.location, this.photourl, this.description]
    );
  }
}

  static fetchAll(callback) {
    return db.execute("SELECT * FROM homes");
  }

  static findById(homeId) {
    return db.execute('SELECT * FROM homes WHERE id= ?', [homeId]);
  }

  static deleteById(homeId) {
    return db.execute('DELETE FROM homes WHERE id= ?', [homeId]);
  }
}

module.exports = Home;
