class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // {lat: 21.654, lng: 22.651}
    this.id = new Date().toString() + Math.random().toString();
  }
}
