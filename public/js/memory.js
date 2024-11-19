let memoryChart;
let memoryData = [];
let memoryLabels = [];

function updateMemoryChart(memory) {
  const usedMemoryPercentage = ((memory.used / memory.total) * 100).toFixed(2);
  const usedMemory = parseFloat(usedMemoryPercentage);
  const currentTime = new Date().toLocaleTimeString();
  const maxDataPoints = 10;

  memoryData.push(usedMemory);
  memoryLabels.push(currentTime);

  if (memoryData.length > maxDataPoints) {
    memoryData.shift();
    memoryLabels.shift();
  }

  if (!memoryChart) {
    const ctx = document.getElementById('memoryChart').getContext('2d');
    memoryChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: memoryLabels,
        datasets: [
          {
            label: 'Memory usage (%)',
            data: memoryData,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#212529',
            },
          },
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Time',
              color: '#212529',
            },
            ticks: {
              color: '#212529',
            },
          },
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Percentage (%)',
              color: '#212529',
            },
            ticks: {
              color: '#212529',
            },
          },
        },
      },
    });
  } else {
    memoryChart.data.labels = memoryLabels;
    memoryChart.data.datasets[0].data = memoryData;
    memoryChart.update();
  }
}
