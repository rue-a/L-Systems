class Curve {
    constructor(axiom, productions, angle, bbox, scale) {
        this.axiom = axiom;
        this.current_iteration = axiom;
        this.productions = productions;
        this.angle = angle;
        this.scale = scale;
        this.bbox = bbox;
        this.layer = new Layer();
        console.log(productions)
    }

    set_axiom(axiom) { this.axiom = axiom; }
    set_productions(productions) { this.productions = productions; }
    set_angle(angle) { this.angle = angle; }
    set_scale(scale) { this.scale = scale; }
    set_bbox(bbox) { this.bbox = bbox }
    reset_current_iteration() {
        this.current_iteration = this.axiom;
    }

    get_layer() { return (this.layer); }

    derivate() {
        let current_iteration = ""
        for (let char of this.current_iteration) {
            if (Object.keys(this.productions).includes(char)) {
                current_iteration = current_iteration.concat(this.productions[char]);
            } else {
                current_iteration = current_iteration.concat(char);
            }
        }
        this.current_iteration = current_iteration;
    }

    get_current_iteration() { return this.current_iteration }

    update_view() {
        this.layer.from_turtle(this.current_iteration, this.angle, this.scale);
        this.layer.fit_to_frame(this.bbox);
    }


    show_lines(color_ = color('rgba(100, 148, 237, 0.5)'), width = 1) {
        this.update_view();
        this.layer.show_lines(color_, width);
    }

    show_points(color_ = color('rgba(255, 127, 80, 0.5)'), width = 2) {
        this.update_view();
        this.layer.show_points(color_, width);
    }

    as_svg(bbox = new BoundingBox(0, 0, 500, 500)) {
        this.layer.fit_to_frame(bbox);
        return (this.layer.as_svg());
    }


    clone() {
        return new Curve(this.axiom, this.productions, this.angle, this.bbox);
    }
}
