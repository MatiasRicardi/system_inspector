# system_inspector
# System Inspector

System Inspector is a real-time web application that monitors system resources such as CPU usage, memory, and more. It is built using Fastify for high performance and systeminformation to fetch hardware and software metrics.

## Features
- **Real-time monitoring** of system resources.
- Interactive **web-based UI** for visualizing data.
- Lightweight and fast, designed with **Fastify**.

## Prerequisites
- **Node.js** (version 16 or higher recommended)
- **npm** (comes with Node.js)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/MatiasRicardi/system_inspector.git
    ```

2. Navigate to the project directory:
    ```bash
    cd system_inspector
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the application:
    ```bash
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Configuration

- **Port**: By default, the application runs on port `3000`. You can modify this in the `app.js` file.
- **Static files**: Static assets (e.g., CSS, JS) are served from the `public` directory.

## Screenshots

### Dashboard View
> ![CPU Usage](./images/cpu.png)
![Memory Usage](./images/memory.png)
![Disk Usage](./images/disk.png)
![Top Processes](./images/processes.png)

## Technologies Used
- **Fastify**: A fast web framework for Node.js.
- **EJS**: Template engine for rendering dynamic HTML.
- **systeminformation**: Library to fetch system metrics.
- **WebSockets**: For real-time updates.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the **MIT License**. See the `LICENSE` file for details.

## Author
Created by Matias Ricardi.