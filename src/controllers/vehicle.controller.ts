import { VehicleService } from '../services/vehicle.service';
import { Vehicle, Car, Bike } from '../models/vehicle.model';

export class VehicleController {
    constructor(
        private service: VehicleService,
        private renderCb: (vehicles: Vehicle[]) => void
    ) { }

    handleAddVehicle(
        type: string,
        make: string,
        model: string,
        year: number,
        extra: any
    ) {
        let vehicle: Vehicle;

        try {
            if (type === 'Car') {
                vehicle = new Car(0, make, model, year, parseInt(extra));
            } else {
                vehicle = new Bike(0, make, model, year, !!extra);
            }

            this.service.addVehicle(vehicle);
            this.refreshView();
        } catch (error: any) {
            alert(error.message);
        }
    }

    handleDeleteVehicle(id: number) {
        this.service.removeVehicle(id);
        this.refreshView();
    }

    handleUpdateVehicle(
        id: number,
        type: string,
        make: string,
        model: string,
        year: number,
        extra: any
    ) {
        let vehicleData: Partial<Vehicle> = {
            make,
            model,
            year,
            type: type as 'Car' | 'Bike'
        };

        if (type === 'Car') {
            (vehicleData as Car).numDoors = parseInt(extra);
        } else {
            (vehicleData as Bike).hasSideCar = !!extra;
        }

        try {
            this.service.updateVehicle(id, vehicleData);
            this.refreshView();
        } catch (error: any) {
            alert(error.message);
        }
    }

    getVehicle(id: number): Vehicle | undefined {
        return this.service.getVehicleById(id);
    }

    refreshView() {
        const vehicles = this.service.getAllVehicles();
        this.renderCb(vehicles);
    }
}
