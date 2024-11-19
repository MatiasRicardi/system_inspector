let cpuChart;
let cpuData = [];
let cpuLabels = [];

function updateCpuChart(cpuLoad) {
  const totalLoad = parseFloat(cpuLoad.currentLoad.toFixed(2));
  const currentTime = new Date().toLocaleTimeString();

  // limit the number of data points to show
  const maxDataPoints = 10;

  // Agregar nuevos datos
  cpuData.push(totalLoad);
  cpuLabels.push(currentTime);

  // keep the number of data points under the limit
  if (cpuData.length > maxDataPoints) {
    cpuData.shift();
    cpuLabels.shift();
  }

  if (!cpuChart) {
    const ctx = document.getElementById('cpuChart').getContext('2d');
    cpuChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: cpuLabels,
        datasets: [
          {
            label: 'CPU Usage (%)',
            data: cpuData,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
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
    cpuChart.data.labels = cpuLabels;
    cpuChart.data.datasets[0].data = cpuData;
    cpuChart.update();
  }
}
