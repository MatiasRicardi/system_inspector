// public/js/processes.js

function updateProcessTable(processes) {
  if (!processes || processes.length === 0) {
    console.warn('No processes data received');
    return;
  }

  const tableBody = document.getElementById('processTableBody');

  //clear table rows
  tableBody.innerHTML = '';

  // adding new rows
  processes.forEach((process) => {
    const row = document.createElement('tr');

    const pidCell = document.createElement('td');
    pidCell.textContent = process.pid;
    row.appendChild(pidCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = process.name;
    row.appendChild(nameCell);

    const cpuCell = document.createElement('td');
    cpuCell.textContent = process.cpu.toFixed(2);
    row.appendChild(cpuCell);

    const memCell = document.createElement('td');
    memCell.textContent = process.mem.toFixed(2);
    row.appendChild(memCell);

    tableBody.appendChild(row);
  });
}
