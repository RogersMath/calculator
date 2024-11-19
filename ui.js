function displayStat(label, value) {
    const box = document.createElement('div');
    box.className = 'stat-box';
    box.innerHTML = `
        <div class="stat-label">${label}</div>
        <div class="stat-value">${typeof value === 'number' ? value.toFixed(2) : value}</div>
    `;
    return box;
}

function createHistogram(data) {
    const ctx = document.getElementById('histogram').getContext('2d');
    const { bins, binEdges } = getHistogramBins(data);
    const labels = binEdges.slice(0, -1).map((edge, i) => 
        `${edge.toFixed(1)}-${binEdges[i + 1].toFixed(1)}`
    );

    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Frequency',
                data: bins,
                backgroundColor: 'rgba(0, 102, 204, 0.5)',
                borderColor: 'rgba(0, 102, 204, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Histogram'
                }
            }
        }
    });
}

function createFrequencyPolygon(data) {
    const ctx = document.getElementById('freqPolygon').getContext('2d');
    const { bins, binEdges } = getHistogramBins(data);
    const centerPoints = binEdges.slice(0, -1).map((edge, i) => 
        (edge + binEdges[i + 1]) / 2
    );

    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: centerPoints.map(x => x.toFixed(1)),
            datasets: [{
                label: 'Frequency',
                data: bins,
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Frequency Polygon'
                }
            }
        }
    });
}

function createBoxPlot(data) {
    const ctx = document.getElementById('boxPlot').getContext('2d');
    const q1 = quartile(data, 0.25);
    const q3 = quartile(data, 0.75);
    const med = median(data);
    const min = Math.min(...data);
    const max = Math.max(...data);
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Distribution'],
            datasets: [
                // IQR Box
                {
                    label: 'IQR',
                    data: [q3 - q1],
                    backgroundColor: 'rgba(0, 102, 204, 0.5)',
                    borderColor: 'rgba(0, 102, 204, 1)',
                    borderWidth: 1,
                    base: q1
                },
                // Median line
                {
                    label: 'Median',
                    data: [med],
                    type: 'line',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    pointStyle: 'line',
                    pointBorderWidth: 2,
                    pointRadius: 10,
                },
                // Min and Max whiskers
                {
                    label: 'Range',
                    data: [min, max],
                    type: 'line',
                    borderColor: 'rgba(0, 102, 204, 1)',
                    borderWidth: 1,
                    pointStyle: 'line',
                    pointBorderWidth: 1,
                    pointRadius: 5,
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Box Plot'
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const labels = {
                                'Min': min,
                                'Q1': q1,
                                'Median': med,
                                'Q3': q3,
                                'Max': max
                            };
                            return `${context.dataset.label}: ${context.raw.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}
