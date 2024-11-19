let diskChart;

function updateDiskChart(disk) {
  const labels = disk.map((d) => d.fs);
  const usedSizes = disk.map((d) => d.used / 1024 ** 3);
  const freeSizes = disk.map((d) => (d.size - d.used) / 1024 ** 3);

  if (!diskChart) {
    const ctx = document.getElementById('diskChart').getContext('2d');
    diskChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Used (GB)',
            data: usedSizes,
            backgroundColor: '#FF6384',
            stack: 'Stack 0',
          },
          {
            label: 'Free (GB)',
            data: freeSizes,
            backgroundColor: '#36A2EB',
            stack: 'Stack 0',
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
            stacked: true,
            title: {
              display: true,
              text: 'File system',
              color: '#212529',
            },
            ticks: {
              color: '#212529',
            },
          },
          y: {
            stacked: true,
            beginAtZero: true,
            title: {
              display: true,
              text: 'Size (GB)',
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
    diskChart.data.labels = labels;
    diskChart.data.datasets[0].data = usedSizes;
    diskChart.data.datasets[1].data = freeSizes;
    diskChart.update();
  }
}
