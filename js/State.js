class State {
    constructor(point, angle) {
        this.point = point;
        this.angle = angle;
    }

    get_point() { return (this.point); }
    get_angle() { return (this.angle); }

    set_point(point) { this.point = point; }
    set_angel(angle) { this.angle = angle; }

    clone() { return new State(this.point, this.angle); }
}