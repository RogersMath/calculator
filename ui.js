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
    const sortedData = [...data].sort((a, b) => a - b);
    const min = Math.min(...data);
    const max = Math.max(...data);
    const q1 = quartile(data, 0.25);
    const med = median(data);
    const q3 = quartile(data, 0.75);
    const outliers = findOutliers(data);

    return new Chart(ctx, {
        type: 'boxplot',
        data: {
            labels: ['Dataset'],
            datasets: [{
                label: 'Box Plot',
                data: [{
                    min: min,
                    q1: q1,
                    median: med,
                    q3: q3,
                    max: max,
                    outliers: outliers
                }],
                backgroundColor: 'rgba(0, 102, 204, 0.5)',
                borderColor: 'rgba(0, 102, 204, 1)',
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Box Plot'
                }
            }
        }
    });
}
