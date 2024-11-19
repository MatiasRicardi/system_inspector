//websockets and navigation tabs

//constants 
const socketServerUrl = `ws://${serverData.backendUrl}/ws`;

// navigation tabs and sections
document.addEventListener('DOMContentLoaded', function () {
  const menuTabs = document.getElementById('menuTabs');
  const navLinks = menuTabs.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      navLinks.forEach((nav) => nav.classList.remove('active'));
      sections.forEach((section) => section.classList.remove('active'));

      link.classList.add('active');
      const sectionId = link.getAttribute('data-section');
      document.getElementById(sectionId).classList.add('active');
    });
  });

  //connecting to the WebSocket server
  const ws = new WebSocket(socketServerUrl);
  ws.addEventListener('open', () => {
    console.log('WebSocket connection established');
    //getting first data
    ws.send('getFreshData');

    // Send a message to the server every 5 seconds to get fresh data
    setInterval(() => { ws.send('getFreshData') }, 5000);
  });

  ws.addEventListener('message', (event) => {
    const { cpuLoad, memory, disk, processes } = JSON.parse(event.data);
    // call functions to update charts and tables
    updateCpuChart(cpuLoad);
    updateMemoryChart(memory);
    updateDiskChart(disk);
    updateProcessTable(processes);
  });

  ws.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
    showError('Error connecting to WebSocket server. Please reload the page');
  });

  ws.addEventListener('close', () => {
    console.log('WebSocket closed');
    showError('Connection closed unexpectedly. Please reload the page');
  });

  function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.textContent = message;
    document.querySelector('.container').prepend(errorDiv);
  }
});
