document.addEventListener('DOMContentLoaded', () => {
    let currentData = [];
    let charts = {
        histogram: null,
        freqPolygon: null,
        boxPlot: null
    };

    // Make these functions global so they can be called from HTML
    window.calculateAndDisplay = function() {
        const input = document.getElementById('dataInput').value;
        const error = document.getElementById('error');
        const results = document.getElementById('results');
        results.innerHTML = '';
        error.textContent = '';

        currentData = parseInput(input);

        if (currentData.length < 2) {
            error.textContent = 'Please enter at least 2 valid numbers';
            return;
        }

        const sorted = [...currentData].sort((a, b) => a - b);
        const stats = {
            'Mean': mean(currentData),
            'Size': currentData.size,
            'Median': median(currentData),
            'Mode': mode(currentData).join(', '),
            'Range': sorted[sorted.length - 1] - sorted[0],
            'Midrange': (sorted[sorted.length - 1] + sorted[0]) / 2,
            'Standard Deviation': standardDeviation(currentData),
            'Variance': variance(currentData),
            'Minimum': sorted[0],
            'Q1': quartile(currentData, 0.25),
            'Q3': quartile(currentData, 0.75),
            'Maximum': sorted[sorted.length - 1],
            'IQR': quartile(currentData, 0.75) - quartile(currentData, 0.25)
        };

        Object.entries(stats).forEach(([label, value]) => {
            results.appendChild(displayStat(label, value));
        });
    };

    window.generateVisualizations = function() {
        if (currentData.length < 2) {
            document.getElementById('error').textContent = 'Please calculate statistics first';
            return;
        }

        // Destroy existing charts
        Object.values(charts).forEach(chart => chart?.destroy());

        // Create new charts
        charts.histogram = createHistogram(currentData);
        charts.freqPolygon = createFrequencyPolygon(currentData);
        charts.boxPlot = createBoxPlot(currentData);
    };

    window.identifyOutliers = function() {
        if (currentData.length < 2) {
            document.getElementById('error').textContent = 'Please calculate statistics first';
            return;
        }

        const outliers = findOutliers(currentData);
        const results = document.getElementById('results');
        
        if (outliers.length > 0) {
            results.appendChild(displayStat('Outliers', outliers.join(', ')));
        } else {
            results.appendChild(displayStat('Outliers', 'None found'));
        }
    };

    window.trimOutliers = function() {
        if (currentData.length < 2) {
            document.getElementById('error').textContent = 'Please calculate statistics first';
            return;
        }

        const trimmedData = trimOutliersFromData(currentData);
        document.getElementById('dataInput').value = trimmedData.join(', ');
        calculateAndDisplay();
        generateVisualizations();
    };
});
