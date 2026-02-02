import './style.css';
import { VehicleRepository } from './repositories/vehicle.repository';
import { VehicleService } from './services/vehicle.service';
import { VehicleController } from './controllers/vehicle.controller';
import { Vehicle, Car, Bike } from './models/vehicle.model';

// Wiring Dependencies (Dependency Injection)
const repository = new VehicleRepository();
const service = new VehicleService(repository);

// UI Logic
const vehicleListDiv = document.getElementById('vehicleList') as HTMLDivElement;

// DOM Elements & Event Listeners
const form = document.getElementById('vehicleForm') as HTMLFormElement;
const formTitle = document.getElementById('formTitle') as HTMLHeadingElement;
const vehicleIdInput = document.getElementById('vehicleId') as HTMLInputElement;
const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
const typeSelect = document.getElementById('type') as HTMLSelectElement;
const carFields = document.getElementById('carFields') as HTMLDivElement;
const bikeFields = document.getElementById('bikeFields') as HTMLDivElement;

const render = (vehicles: Vehicle[]) => {
    vehicleListDiv.innerHTML = '';
    if (vehicles.length === 0) {
        vehicleListDiv.innerHTML = '<p>No vehicles in inventory.</p>';
        return;
    }

    vehicles.forEach(v => {
        const div = document.createElement('div');
        div.className = 'vehicle-item';
        div.innerHTML = `
            <div class="vehicle-info">
                <strong>${v.type.toUpperCase()}</strong> - ${v.displayInfo()}
            </div>
            <div class="actions">
                <button class="edit-btn" data-id="${v.id}">Edit</button>
                <button class="delete-btn" data-id="${v.id}">Delete</button>
            </div>
        `;
        vehicleListDiv.appendChild(div);
    });

    // Re-attach listeners after render
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt((e.target as HTMLButtonElement).dataset.id!);
            if (confirm('Are you sure you want to delete this vehicle?')) {
                controller.handleDeleteVehicle(id);
            }
        });
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt((e.target as HTMLButtonElement).dataset.id!);
            const vehicle = controller.getVehicle(id);
            if (vehicle) {
                populateForm(vehicle);
            }
        });
    });
};

const controller = new VehicleController(service, render);

function populateForm(vehicle: Vehicle) {
    formTitle.textContent = 'Edit Vehicle';
    submitBtn.textContent = 'Update Vehicle';
    vehicleIdInput.value = vehicle.id.toString();
    typeSelect.value = vehicle.type;
    (document.getElementById('make') as HTMLInputElement).value = vehicle.make;
    (document.getElementById('model') as HTMLInputElement).value = vehicle.model;
    (document.getElementById('year') as HTMLInputElement).value = vehicle.year.toString();

    // Trigger change to show correct fields
    typeSelect.dispatchEvent(new Event('change'));

    if (vehicle instanceof Car) {
        (document.getElementById('numDoors') as HTMLInputElement).value = vehicle.numDoors.toString();
    } else if (vehicle instanceof Bike) {
        (document.getElementById('hasSideCar') as HTMLInputElement).checked = vehicle.hasSideCar;
    }
}

// Helper to toggle fields
typeSelect.addEventListener('change', () => {
    const type = typeSelect.value;
    if (type === 'Car') {
        carFields.style.display = 'block';
        bikeFields.style.display = 'none';
    } else {
        carFields.style.display = 'none';
        bikeFields.style.display = 'block';
    }
});

// Add/Update Vehicle
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = vehicleIdInput.value ? parseInt(vehicleIdInput.value) : null;
    const type = typeSelect.value;
    const make = (document.getElementById('make') as HTMLInputElement).value;
    const model = (document.getElementById('model') as HTMLInputElement).value;
    const year = parseInt((document.getElementById('year') as HTMLInputElement).value);

    let extra: any;
    if (type === 'Car') {
        extra = (document.getElementById('numDoors') as HTMLInputElement).value || 4;
    } else {
        extra = (document.getElementById('hasSideCar') as HTMLInputElement).checked;
    }

    if (id) {
        controller.handleUpdateVehicle(id, type, make, model, year, extra);
        // Reset mode
        formTitle.textContent = 'Add New Vehicle';
        submitBtn.textContent = 'Add Vehicle';
        vehicleIdInput.value = '';
    } else {
        controller.handleAddVehicle(type, make, model, year, extra);
    }

    form.reset();
    typeSelect.dispatchEvent(new Event('change'));
});

// Initial Render
controller.refreshView();
