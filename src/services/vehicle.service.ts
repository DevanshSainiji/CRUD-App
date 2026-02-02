import { Vehicle } from '../models/vehicle.model';
import { VehicleRepository } from '../repositories/vehicle.repository';

export class VehicleService {
    constructor(private repository: VehicleRepository) { }

    addVehicle(vehicle: Vehicle): void {
        // Business Logic Example: Validate year
        if (vehicle.year < 1886) {
            throw new Error("Vehicle year cannot be before 1886 (creation of the first car).");
        }
        this.repository.create(vehicle);
    }

    getAllVehicles(): Vehicle[] {
        return this.repository.findAll();
    }

    removeVehicle(id: number): void {
        this.repository.delete(id);
    }

    updateVehicle(id: number, data: Partial<Vehicle>): void {
        // Business logic could go here (e.g. validate new year)
        if (data.year && data.year < 1886) {
            throw new Error("Vehicle year cannot be before 1886.");
        }
        this.repository.update(id, data);
    }

    getVehicleById(id: number): Vehicle | undefined {
        return this.repository.findById(id);
    }
}
