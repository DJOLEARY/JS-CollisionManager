class MathHelper {

	static Magnitude(vec) {
		return Math.sqrt((vec.x * vec.x) + (vec.y * vec.y))
	}

	static Normalise(vec) {
		var mag = MathHelper.Magnitude(vec)
		return new Vector2(vec.x / mag, vec.y / mag)
	}

	static Distance(vec1, vec2) {
		return Math.sqrt(MathHelper.DistanceSquared(vec1, vec2))
	}

	static DistanceSquared(vec1, vec2) {
		return Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2)
	}

	static DegreesToRadians(angle) {
		return angle * (Math.PI / 180)
	}

	static RadiansToDegrees(angle) {
		return angle * (180 / Math.PI)
	}

	static MultiplyMatrices(m1, m2) {
		var result = []
		for (var i = 0; i < m1.length; i++) {
			result[i] = []
			for (var j = 0; j < m2[0].length; j++) {
				var sum = 0
				for (var k = 0; k < m1[0].length; k++) {
					sum += m1[i][k] * m2[k][j]
				}
				result[i][j] = sum
			}
		}
		return result
	}

	static AddMatrices(m1, m2) {
		var result = []
		for (var i = 0; i < m1.length; i++) {
			result[i] = [m1[i][0] + m2[i][0], m1[i][1] + m2[i][1]]
		}
		return result
	}

	static SubMatrices(m1, m2) {
		var result = []
		for (var i = 0; i < m1.length; i++) {
			result[i] = [m1[i][0] - m2[i][0], m1[i][1] - m2[i][1]]
		}
		return result
	}

	static IsPointInRectangle(point, rectangle) {
		var rectArea = rectangle.width * rectangle.height

		var vertices = rectangle.vertices
		var triangle1Area = MathHelper.TriangleArea(point, vertices[0], vertices[1])
		var triangle2Area = MathHelper.TriangleArea(point, vertices[1], vertices[2])
		var triangle3Area = MathHelper.TriangleArea(point, vertices[2], vertices[3])
		var triangle4Area = MathHelper.TriangleArea(point, vertices[3], vertices[0])
		var totalTriangleArea = triangle1Area + triangle2Area + triangle3Area + triangle4Area

		return rectArea === totalTriangleArea
	}

	static TriangleArea(point1, point2, point3) {
		return Math.abs((point1.x * (point2.y - point3.y) + point2.x * (point3.y - point1.y) + point3.x * (point1.y - point2.y)) / 2)
	}

}