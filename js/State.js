class State {
    constructor(point, angle, scale) {
        this.point = point;
        this.angle = angle;
        this.scale = scale;
    }

    get_point() { return (this.point); }
    get_angle() { return (this.angle); }
    get_scale() { return (this.scale); }

    set_point(point) { this.point = point; }
    set_angle(angle) { this.angle = angle; }
    set_scale(scale) { this.scale = scale; }

    clone() { return new State(this.point, this.angle, this.scale); }
}
