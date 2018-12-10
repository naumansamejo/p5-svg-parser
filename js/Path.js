class Path {

	constructor(_d) {

		this.d = _d;

	}

	getCurvesFromD() {



	}

	getPathTracingPoints() {

		
		
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
			return getBezierCurvePoint(subNodes, t);
		}

	}

}