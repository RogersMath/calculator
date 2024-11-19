<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced Statistics Calculator</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-chart-box-and-violin-plot@4.0.0/build/index.umd.min.js"></script>
</head>
<body>
    <div class="container">
        <h1>Advanced Statistics Calculator</h1>
        <div class="input-section">
            <textarea id="dataInput" placeholder="Enter numbers (comma, tab, or space separated)"></textarea>
            <div class="button-group">
                <button onclick="calculateAndDisplay()">Calculate Statistics</button>
                <button onclick="generateVisualizations()">Generate Plots</button>
                <button onclick="identifyOutliers()">Identify Outliers</button>
                <button onclick="trimOutliers()">Trim Outliers</button>
            </div>
        </div>
        <div id="error" class="error"></div>
        <div id="results" class="results"></div>
        <div class="charts-container">
            <div class="chart-wrapper">
                <canvas id="histogram"></canvas>
            </div>
            <div class="chart-wrapper">
                <canvas id="freqPolygon"></canvas>
            </div>
            <div class="chart-wrapper">
                <canvas id="boxPlot"></canvas>
            </div>
        </div>
    </div>
    <script src="helperFunctions.js"></script>
    <script src="ui.js"></script>
    <script src="main.js"></script>
</body>
</html>
