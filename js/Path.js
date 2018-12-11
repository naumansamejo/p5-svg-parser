class Path {

	constructor(_d) {

		this.d = _d;
		this.curves = this.getCurvesFromD(this.d);
		this.tracingPoints = this.getPathTracingPoints(this.curves);

	}

	getCurvesFromD(d) {

		let commandTypes = ['M', 'L', 'Q', 'C'];
		
		let data = d.split(" ");
		let stride = 0;
		let lastPoint = {x: null, y: null};
		let curves = [];
		let cursor = 0;
		let flag;
		let curve;

		while (cursor < data.length) {

			if (data[cursor] == 'M') {
				lastPoint.x = parseInt(data[cursor + 1].split(",")[0]);
				lastPoint.y = parseInt(data[cursor + 1].split(",")[1]);
				cursor += 2;
				continue;
			} 
			else if (data[cursor] == 'L') stride = 1;
			else if (data[cursor] == 'Q') stride = 2;
			else if (data[cursor] == 'C') stride = 3;

			while (true) {
				flag = commandTypes.includes(data[cursor + stride + 1]) || cursor + stride + 1 == data.length;
				curve = [{ x: lastPoint.x, y: lastPoint.y }];
				for (let i = cursor + 1; i < cursor + stride + 1; i++) {
					curve.push({
						x: parseInt(data[i].split(",")[0]),
						y: parseInt(data[i].split(",")[1]),
					});
				}
				lastPoint.x = parseInt(data[cursor + stride].split(",")[0]);
				lastPoint.y = parseInt(data[cursor + stride].split(",")[1]);
				curves.push(curve);

				cursor += stride;

				if (flag) {
					cursor++;
					break;
				}
			}

		}

		return curves;

	}

	getPathTracingPoints(curves, stride = 1) {

		let tracingPoints = [];
		let currentCurve;

		for (let i = 0; i < curves.length; i++) {

			currentCurve = curves[i];

			let dt = stride / this.getCurveSize(currentCurve);

			for (let t = 0; t < 1 + dt; t += dt) {
				tracingPoints.push(this.getBezierCurvePoint(currentCurve, t));
			}

		}

		return tracingPoints;
		
	}

	getBezierCurvePoint(nodes, t) {

		if (nodes.length == 1) return nodes[0];
		else {
			let subNodes = [];
			for (let i = 0; i < nodes.length - 1; i++) {
				subNodes.push({
					x: (1-t)*nodes[i].x + (t)*nodes[i+1].x,
					y: (1-t)*nodes[i].y + (t)*nodes[i+1].y,
				});
			}
			return this.getBezierCurvePoint(subNodes, t);
		}

	}

	getCurveSize(curve) {

		return dist(curve[0].x, curve[0].y, curve[curve.length - 1].x, curve[curve.length - 1].y);

	}

}