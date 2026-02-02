export interface IVehicle {
    id: number;
    make: string;
    model: string;
    year: number;
    type: 'Car' | 'Bike';
    displayInfo(): string;
}

export abstract class Vehicle implements IVehicle {
    constructor(
        public id: number,
        public make: string,
        public model: string,
        public year: number,
        public type: 'Car' | 'Bike'
    ) { }

    abstract displayInfo(): string;
}

export class Car extends Vehicle {
    constructor(
        id: number,
        make: string,
        model: string,
        year: number,
        public numDoors: number
    ) {
        super(id, make, model, year, 'Car');
    }

    displayInfo(): string {
        return `Car: ${this.year} ${this.make} ${this.model} (${this.numDoors} doors)`;
    }
}

export class Bike extends Vehicle {
    constructor(
        id: number,
        make: string,
        model: string,
        year: number,
        public hasSideCar: boolean
    ) {
        super(id, make, model, year, 'Bike');
    }

    displayInfo(): string {
        return `Bike: ${this.year} ${this.make} ${this.model} ${this.hasSideCar ? '(with Sidecar)' : '(no Sidecar)'}`;
    }
}
