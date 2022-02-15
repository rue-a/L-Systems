function append_further_vars(productions) {
    let vars;
    document.getElementById('variables').value

    vars = document.getElementById('variables').value


    try {
        vars = (JSON.parse(vars))
    }
    catch { vars = {} }
    console.log(vars)
    console.log(Object.keys(vars))
    for (let key of Object.keys(vars)) {
        productions[key] = vars[key];
    }
    return productions
}

function saveSvg(svgEl, name) {
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], { type: "image/svg+xml;charset=utf-8" });
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function setup() {
    const p5_bbox = document.getElementById('p5').getClientRects()[0];
    const width = p5_bbox.width;
    const height = p5_bbox.height;
    let canvas = createCanvas(width, height);
    canvas.parent("p5")
    background(255, 254, 253);



    square_side_length = min(width, height) - min(width / height) / 10;
    let center = new Point(width / 2, height / 2);
    let margin = 5
    let view_bbox = new BoundingBox(
        (center.x - square_side_length / 2) + margin,
        (center.y - square_side_length / 2) + margin,
        (center.x + square_side_length / 2) - margin,
        (center.y + square_side_length / 2) - margin
    )

    let axiom = document.getElementById('axiom').value;
    let productions = {
        'F': document.getElementById('F').value,
        'f': document.getElementById('f').value,
        'X': document.getElementById('X').value,
        'Y': document.getElementById('Y').value,
    };
    productions = append_further_vars(productions);
    let angle = document.getElementById('angle').value;



    // 

    let curve = new Curve(axiom, productions, radians(angle), view_bbox);
    let derivated_curve = curve.clone();
    derivated_curve.derivate()

    derivated_curve.show_lines(color('rgba(100,100,100, 0.5)'), 1);
    curve.show_lines('cornflowerblue', 2);


    let update_curve = function () {
        background(255, 254, 253)
        axiom = document.getElementById('axiom').value;
        productions = {
            'F': document.getElementById('F').value,
            'f': document.getElementById('f').value,
            'X': document.getElementById('X').value,
            'Y': document.getElementById('Y').value
        };
        productions = append_further_vars(productions);
        angle = document.getElementById('angle').value;
        curve.set_axiom(axiom);
        curve.set_productions(productions);
        curve.set_angle(radians(angle));
        curve.reset_current_iteration();
        derivated_curve = curve.clone();
        derivated_curve.derivate()

        derivated_curve.show_lines(color('rgba(100,100,100, 0.5)'), 1);
        curve.show_lines('cornflowerblue', 2);

    }
    document.getElementById('axiom').oninput = update_curve
    document.getElementById('angle').oninput = update_curve
    document.getElementById('F').oninput = update_curve
    document.getElementById('f').oninput = update_curve
    document.getElementById('X').oninput = update_curve
    document.getElementById('Y').oninput = update_curve
    document.getElementById('variables').oninput = update_curve

    document.getElementById('derivate').onclick = function () {
        background(255, 254, 253);
        curve.derivate();
        curve.show_lines();
        // curve.show_points();
        document.getElementById('derivation-counter').value++;
        document.getElementById('axiom').disabled = true;
        document.getElementById('F').disabled = true;
        document.getElementById('f').disabled = true;
        document.getElementById('X').disabled = true;
        document.getElementById('Y').disabled = true;
        document.getElementById('variables').disabled = true;
        document.getElementById('angle').disabled = true;
    }

    document.getElementById('reset').onclick = function () {
        background(255, 254, 253);

        document.getElementById('axiom').disabled = false;
        document.getElementById('F').disabled = false;
        document.getElementById('f').disabled = false;
        document.getElementById('X').disabled = false;
        document.getElementById('Y').disabled = false;
        document.getElementById('variables').disabled = false;
        document.getElementById('angle').disabled = false;
        document.getElementById('derivation-counter').value = 0;

        curve.reset_current_iteration();
        derivated_curve = curve.clone();
        derivated_curve.derivate()

        derivated_curve.show_lines(color('rgba(100,100,100, 0.5)'), 1);
        curve.show_lines('cornflowerblue', 2);
        curve.show_lines();
        // curve.show_points();
    }

    document.getElementById('download-svg').onclick = function () {
        let svgEl = curve.as_svg();
        let name = 'curve.svg'
        svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        var svgData = svgEl.outerHTML;
        var preface = '<?xml version="1.0" standalone="no"?>\r\n';
        var svgBlob = new Blob([preface, svgData], { type: "image/svg+xml;charset=utf-8" });
        var svgUrl = URL.createObjectURL(svgBlob);
        var downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = name;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}



function draw() {
}