class SeperatingAxisTheorem extends AbstractCollision {

    constructor(shape1, shape2) {
        super(shape1, shape2)
    }

    testForCollision() {
        if (!(this.shape1 instanceof Polygon) || !(this.shape2 instanceof Polygon))
            return false

        var axes1 = this._getProjectionAxes(this.shape1)
        var projectionsOverlap1 = this._compareProjections(this.shape1, this.shape2, axes1)
        if (!projectionsOverlap1)
            return false

        var axes2 = this._getProjectionAxes(this.shape2)
        var projectionsOverlap2 = this._compareProjections(this.shape1, this.shape2, axes2)
        if (!projectionsOverlap2)
            return false
        
        return true
    }

    _compareProjections(shape1, shape2, axes) {
        for (var i = 0; i < axes.length; i++) {
            const axis = axes[i]
            var proj1 = this._projectOntoAxis(shape1, axis)
            var proj2 = this._projectOntoAxis(shape2, axis)
            if (!this._doProjectionsOverlap(proj1, proj2))
                return false
        }
        return true
    }

    _getProjectionAxes(shape) {
        var axes = []
        var vertices = shape.vertices
        var length = vertices.length
        for (var i = 0; i < length; i++) {
            const vertex1 = vertices[i]
            const vertex2 = vertices[i + 1 == length ? 0 : i + 1]
            var edge = vertex1.subtract(vertex2)
            var normal = edge.perp()
            axes[i] = normal
        }
        return axes
    }

    _projectOntoAxis(shape, axis) {
        const vertices = shape.vertices
        var max = axis.dotProduct(vertices[0])
        var min = max 
        for (var i = 1; i < vertices.length; i++) {
            const projectedVertex = axis.dotProduct(vertices[i])
            if (projectedVertex < min)
                min = projectedVertex
            else if (projectedVertex > max)
                max = projectedVertex
        }

        var projection = {}
        projection.min = min
        projection.max = max
        return projection
    }

    _doProjectionsOverlap(proj1, proj2) {
        return proj1.min <= proj2.max && proj2.min <= proj1.max
    }
}