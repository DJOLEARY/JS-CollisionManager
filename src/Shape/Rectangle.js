class Rectangle extends Shape {
    
    constructor(position, width, height) {
        super(position)
        this.width = width
        this.height = height
    }

    get vertices() {
        var result = []
        result.push(this.position)
        result.push(new Vector2(this.position.x + this.width, this.position.y))
        result.push(new Vector2(this.position.x + this.width, this.position.y + this.height))
        result.push(new Vector2(this.position.x, this.position.y + this.height))
        return result
    }

    get centre() {
        return new Vector2(this.position.x + (this.width / 2), this.position.y + (this.height / 2))
    }

    pointInRectangle(point) {
        var rectArea = this.width * this.height
        var vertices = this.vertices
        var triangle1Area = this.triangleArea(point, vertices[0], vertices[1])
        var triangle2Area = this.triangleArea(point, vertices[1], vertices[2])
        var triangle3Area = this.triangleArea(point, vertices[2], vertices[3])
        var triangle4Area = this.triangleArea(point, vertices[3], vertices[0])

        return (rectArea === triangle1Area + triangle2Area + triangle3Area + triangle4Area)
    }

    triangleArea(point1, point2, point3) {
        return Math.abs((point1.x * (point2.y - point3.y) + point2.x * (point3.y - point1.y) + point3.x * (point1.y - point2.y)) / 2)
    }

    move(x, y) {
        this.position.x += x
        this.position.y += y
    }

    scale(scale) {
        this.width *= scale
        this.height *= scale
    }
}