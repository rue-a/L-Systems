class Polyline {
    constructor() {
        this.points = [];
    }

    get_points() { return (this.points); }


    coordinates_from_turtle(turtle_string, angle = PI / 2, scale = 0.5, start_point = new Point(0, 0), start_angle = 0, start_scale = 1) {
        let current_angle = start_angle;
        let current_scale = start_scale;
        this.points.push(start_point);
        let forward = function (x, y, phi, scale) {
            // hypotenuse = 1
            // console.log(phi)
            x = x + (cos(phi) * scale);
            y = y + (sin(phi) * scale);
            return (new Point(x, y));
        }

        for (let character of turtle_string) {
            // console.log(character)
            switch (character) {
                case 'F':
                    this.points.push(forward(this.points[this.points.length - 1].get_x(), this.points[this.points.length - 1].get_y(), current_angle, current_scale));
                    break;
                case '+':
                    current_angle += angle;
                    break;
                case '-':
                    current_angle -= angle;
                    break;
                case '*':
                    current_scale /= scale;
                    break;
                case '/':
                    current_scale *= scale;
                    break;
                default:
                    // console.log(character);
                    break;
            }
        }
        return ([this.points[this.points.length - 1].clone(), current_angle, current_scale]);
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

    rescale(bbox_new, bbox_old = this.get_bounding_box()) {
        for (let point of this.points) {
            point.rescale(bbox_old, bbox_new);
        }
    }

    as_svg(bbox = new BoundingBox(0, 0, 500, 500)) {
        this.rescale(bbox)
        let svg = document.createElement('svg')
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
        let svg_line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        svg_line.setAttribute('fill', 'none')
        svg_line.setAttribute('stroke', 'black')
        let points_string = []
        for (point of this.points) {
            points_string = points_string.concat([point.get_x(), ',', point.get_y()].join(''))
        }
        points_string = points_string.join(' ')
        // console.log(points_string)
        svg_line.setAttribute('points', points_string)
        svg.append(svg_line)
        // console.log(svg)
        return (svg)
    }



    show(color = 'cornflowerblue', width = 1) {

        stroke(color);
        strokeWeight(width);

        for (let i = 0; i < this.points.length - 1; i++) {
            let point_a = this.points[i];
            let point_b = this.points[i + 1];
            line(point_a.get_x(), point_a.get_y(), point_b.get_x(), point_b.get_y());
        }

    }

}
