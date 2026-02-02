import { Vehicle } from '../models/vehicle.model';

export class VehicleRepository {
    private vehicles: Vehicle[] = [];
    private nextId: number = 1;

    create(vehicle: Vehicle): void {
        vehicle.id = this.nextId++;
        this.vehicles.push(vehicle);
    }

    findAll(): Vehicle[] {
        return this.vehicles;
    }

    findById(id: number): Vehicle | undefined {
        return this.vehicles.find(v => v.id === id);
    }

    delete(id: number): void {
        this.vehicles = this.vehicles.filter(v => v.id !== id);
    }

    update(id: number, data: Partial<Vehicle>): void {
        const index = this.vehicles.findIndex(v => v.id === id);
        if (index !== -1) {
            // Merge existing data with new data
            // Note: In a real app we might need deep merge or specific field handling
            const original = this.vehicles[index];
            Object.assign(original, data);
        }
    }
}
