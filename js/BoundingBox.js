class BoundingBox {
    constructor(x_min, y_min, x_max, y_max) {
        this.upper_left = new Point(x_min, y_min);
        this.bottom_right = new Point(x_max, y_max);
        this.width = x_max - x_min;
        this.height = y_max - y_min;
    }

    get_upper_left() { return this.upper_left; }
    get_bottom_right() { return this.bottom_right; }
    get_upper_right() { return new Point(this.upper_left.get_y(), this.bottom_right.get_x()); }
    get_bottom_left() { return new Point(this.upper_left.get_x(), this.bottom_right.get_y()); }
    get_width() { return this.width; }
    get_height() { return this.height; }
    get_center() { return new Point((this.upper_left.get_x() + this.bottom_right.get_x()) / 2, (this.upper_left.get_y() + this.bottom_right.get_y()) / 2); }

    clone() {
        return new BoundingBox(
            this.upper_left.get_x(),
            this.upper_left.get_y(),
            this.bottom_right.get_x(),
            this.bottom_right.get_y())
    }

}