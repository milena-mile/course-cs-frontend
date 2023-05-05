export class Matrix3D {
    x: number;
    y: number;
    z: number;
    buffer: number[];

    constructor({x, y, z}) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.buffer = new Array(x * y * z).fill(null);
    }

    get({x, y, z}) {
        this.validation(x, y, z);
        return this.buffer[this.getIndex({x, y, z})];
    }

    set({x, y, z}, value: number): void {
        this.validation(x, y, z);
        this.buffer[this.getIndex({x, y, z})] = value;
    }

    getIndex({x, y, z}): number {
        return this.y * this.x * z + this.y * y + x;
    }

    validation(x, y, z) {
        switch (true) {
            case (x < 0 || x > this.x): throw new Error(`"x" should be in range [0, ${this.x}]`);
            case (y < 0 || y > this.y): throw new Error(`"y" should be in range [0, ${this.y}]`);
            case (z < 0 || z > this.z): throw new Error(`"z" should be in range [0, ${this.z}]`);
        };
        if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number' ) throw new Error('Coordinates have to be numbers.');
    }

}