class Layer {
    constructor() {
        this.points = [];
        this.polylines = [];
        // this.polygons = [];
    }

    add_point(point) { this.points = this.add_points.concat(point); }

    add_polyline(polyline) { this.polylines = this.polylines.concat(polyline); }

    // add_polygon(polygon) { this.polygons = this.polygons.concat(polygon); }

    from_turtle(turtle_string, angle = PI / 2, start_point = new Point(0, 0), start_angle = 0) {
        // this.points = this.points.concat(start_point);
        this.points = [];
        this.polylines = [];
        let current_state = new State(start_point, start_angle);
        let substrings = turtle_string.split(/(\[|\])/g)
        let states = [];
        for (let string of substrings) {
            switch (string) {
                case '[':
                    states.push(current_state);
                    break;
                case ']':
                    current_state = states[states.length - 1];
                    states.pop()

                    break;
                case '':
                    break;
                default:
                    let polyline = new Polyline();
                    let state = polyline.coordinates_from_turtle(string, angle, current_state.get_point().clone(), current_state.get_angle());
                    current_state = new State(state[0], state[1]);
                    this.polylines = this.polylines.concat(polyline)
                    for (let point of polyline.get_points()) {
                        this.points = this.points.concat(point);
                    }
                    break;
            }
        }
    }

    get_bounding_box() {
        let x_min = this.points[0].get_x();
        let y_min = this.points[0].get_y();
        let x_max = this.points[0].get_x();
        let y_max = this.points[0].get_y();
        for (let point of this.points) {
            if (point.get_x() < x_min) {
                x_min = point.get_x();
            }
            if (point.get_y() < y_min) {
                y_min = point.get_y();
            }
            if (point.get_x() > x_max) {
                x_max = point.get_x();
            }
            if (point.get_y() > y_max) {
                y_max = point.get_y();
            }
        }
        return new BoundingBox(x_min, y_min, x_max, y_max)
    }

    fit_to_frame(bbox_new, bbox_old = this.get_bounding_box()) {
        for (let point of this.points) {
            point.rescale(bbox_old, bbox_new);
            point.rotate(bbox_new);
        }
    }

    show_lines(color = 'cornflowerblue', width = 0.5) {

        for (let polyline of this.polylines) {
            polyline.show(color, width)
        }

    }

    show_points(color = 'coral', width = 3) {
        for (let point of this.points) {
            point.show(color, width)
        }
    }

    as_svg() {
        let svg = document.createElement('svg')
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

        console.log(svg)
        for (let polyline of this.polylines) {
            let svg_line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            svg_line.setAttribute('fill', 'none')
            svg_line.setAttribute('stroke', 'black')
            let points_string = []
            for (let point of polyline.get_points()) {
                points_string = points_string.concat([point.get_x(), ',', point.get_y()].join(''))
            }
            points_string = points_string.join(' ')
            svg_line.setAttribute('points', points_string)
            console.log(svg_line)
            svg.append(svg_line)

        }
        console.log(svg)
        return (svg)
    }




}