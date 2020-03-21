export default class Position {
    private latitude: number;
    private longitude: number;

    constructor(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    set coords(coords) {
        this.latitude = coords.latitude;
        this.longitude = coords.longitude;
    }

    get coords() {
        return {
            latitude: this.latitude,
            longitude: this.longitude
        };
    }

    isCoordsSet = () => !(!this.latitude && !this.longitude);
}