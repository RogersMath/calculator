function parseInput(input) {
    return input
        .trim()
        .split(/[\s,\t]+/)
        .map(Number)
        .filter(n => !isNaN(n));
}

function mean(arr) {
    return arr.reduce((a, b) => a + b) / arr.length;
}

function median(arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function mode(arr) {
    const freq = {};
    arr.forEach(num => freq[num] = (freq[num] || 0) + 1);
    const maxFreq = Math.max(...Object.values(freq));
    return Object.keys(freq)
        .filter(key => freq[key] === maxFreq)
        .map(Number);
}

function variance(arr) {
    const m = mean(arr);
    return mean(arr.map(x => Math.pow(x - m, 2)));
}

function standardDeviation(arr) {
    return Math.sqrt(variance(arr));
}

function quartile(arr, q) {
    const sorted = [...arr].sort((a, b) => a - b);
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
        return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
        return sorted[base];
    }
}

function getHistogramBins(data) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const binCount = Math.ceil(Math.sqrt(data.length));
    const binWidth = (max - min) / binCount;
    const bins = Array(binCount).fill(0);
    const binEdges = Array(binCount + 1).fill(0).map((_, i) => min + i * binWidth);
    
    data.forEach(value => {
        const binIndex = Math.min(Math.floor((value - min) / binWidth), binCount - 1);
        bins[binIndex]++;
    });
    
    return { bins, binEdges };
}

function findOutliers(data) {
    const q1 = quartile(data, 0.25);
    const q3 = quartile(data, 0.75);
    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    
    return data.filter(x => x < lowerBound || x > upperBound);
}

function trimOutliersFromData(data) {
    const q1 = quartile(data, 0.25);
    const q3 = quartile(data, 0.75);
    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    
    return data.filter(x => x >= lowerBound && x <= upperBound);
}
