class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get_x() { return this.x; }
    get_y() { return this.y; }

    set_x(x) { this.x = x; }
    set_y(y) { this.y = y; }

    rescale(bbox_old, bbox_new) {
        let side_length = max(bbox_old.get_width(), bbox_old.get_height());
        let x_new = (bbox_new.get_width() / side_length * (this.x - bbox_old.get_center().get_x())) + bbox_new.get_center().get_x();
        let y_new = (bbox_new.get_height() / side_length * (this.y - bbox_old.get_center().get_y())) + bbox_new.get_center().get_y();
        this.set_x(x_new);
        this.set_y(y_new);
    }

    rotate(bbox) {
        let x = this.x - bbox.get_center().get_x();
        let y = this.y - bbox.get_center().get_y();

        this.x = y + bbox.get_center().get_x();
        this.y = -x + bbox.get_center().get_y();

    }


    clone() {
        return new Point(this.x, this.y);
    }

    show(color = 'cornflowerblue', width = 1) {
        stroke(color);
        strokeWeight(width);
        point(this.x, this.y);
    }
}