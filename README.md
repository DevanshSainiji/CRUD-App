# Vehicle Inventory Management System

A CRUD application for managing vehicle inventory, built with **TypeScript** and **Vanilla JS**, demonstrating strict **Object-Oriented Programming (OOP)** principles and a **Layered Architecture**.

## 🚀 Features

- **Add Vehicle**: Add Cars (with door count) or Bikes (with sidecar option).
- **List Inventory**: View all managed vehicles.
- **Update Vehicle**: Edit details of existing vehicles.
- **Delete Vehicle**: Remove vehicles from the inventory.
- **Polymorphism**: Inherited classes (`Car`, `Bike`) extending the abstract `Vehicle` class.

## 🏗️ Architecture

The project follows a Clean / Layered Architecture pattern to ensure separation of concerns:

- **`Models`** (`src/models`): Defines the data structure and business entities.
  - `Vehicle` (Abstract)
  - `Car`, `Bike` (Concrete)
- **`Repositories`** (`src/repositories`): Handles data access and storage logic.
  - `VehicleRepository`: Manages the in-memory array of vehicles.
- **`Services`** (`src/services`): Contains business logic and validation.
  - `VehicleService`: Validates rules (e.g., Year > 1886) before calling the repository.
- **`Controllers`** (`src/controllers`): Manages user interaction and updates the view.
  - `VehicleController`: Bridges the DOM events to the Service layer.

## 🛠️ Tech Stack

- **Language**: TypeScript
- **Bundler**: Vite
- **Styling**: Vanilla CSS (Dark Mode)

## 📦 Installation & Run

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd CRUD-App
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open the link shown in the terminal (usually `http://localhost:5173`).

4.  **Build for Production**:
    ```bash
    npm run build
    ```