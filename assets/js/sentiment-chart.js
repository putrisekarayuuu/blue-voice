  const chartData = {
    "All Aspects": { "labels": ["negative", "neutral", "positive"],"data": [654, 933, 3846]},
    "Attractions": { "labels": ["negative", "neutral", "positive"], "data": [309, 216, 2218] },
    "Amenities": { "labels": ["negative", "neutral", "positive"], "data": [227, 154, 916] },
    "Access": { "labels": ["negative", "neutral", "positive"], "data": [34, 32, 191] },
    "Price": { "labels": ["negative", "neutral", "positive"], "data": [27, 18, 173] },
    "No Aspect": { "labels": ["negative", "neutral", "positive"], "data": [57, 513, 348] }
  };

  const ctx = document.getElementById('sentimentChart').getContext('2d');
  let currentAspect = 'All Aspects';

  function getColorSet(data) {
    const maxIndex = data.indexOf(Math.max(...data));
    const baseColors = ['#93C5FD', '#93C5FD', '#93C5FD']; // light blue
    baseColors[maxIndex] = '#1D4ED8'; // dark blue for highest value
    return baseColors;
  }

  let sentimentChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: chartData[currentAspect].labels,
        datasets: [{
        label: 'Sentiment Count',
        data: chartData[currentAspect].data,
        backgroundColor: getColorSet(chartData[currentAspect].data)
        }]
    },
    options: {
        responsive: true,
        plugins: {
        legend: { display: false },
        title: {
            display: true,
            text: 'Sentiment Distribution for ' + currentAspect
        },
        datalabels: {               // <<< TAMBAHAN INI
            anchor: 'end',
            align: 'end',
            color: '#222',
            font: {
            weight: 'bold',
            size: 14
            },
            formatter: (value) => value  // tampilkan angka sesuai data
        }
        },
        scales: {
        y: { beginAtZero: true }
        }
    },
    plugins: [ChartDataLabels]       // <<< Jangan lupa tambahkan plugin ini di sini
    });


  function updateChart() {
    const selectedAspect = document.getElementById('aspectSelect').value;
    const data = chartData[selectedAspect].data;

    sentimentChart.data.labels = chartData[selectedAspect].labels;
    sentimentChart.data.datasets[0].data = data;
    sentimentChart.data.datasets[0].backgroundColor = getColorSet(data);
    sentimentChart.options.plugins.title.text = 'Sentiment Distribution for ' + selectedAspect;
    sentimentChart.update();

    document.getElementById('aspectTitle').innerText = "Aspect: " + selectedAspect;
    document.getElementById('aspectImage').src = aspectImages[selectedAspect];
  }

  function updateWordCloud() {
    const aspect = document.getElementById("aspectSelectCloud").value;
    const prefix = aspect === "All Aspects" ? "all" : aspect.toLowerCase().replace(/\s+/g, "-");

    // Ganti gambar wordcloud
    document.getElementById("wordcloudPositive").src = `./assets/images/wordcloud/wordcloud-positive-${prefix}.png`;
    document.getElementById("wordcloudNegative").src = `./assets/images/wordcloud/wordcloud-negative-${prefix}.png`;

    // Update judul dengan format "[Aspect] Aspects Positive/Negative Wordcloud"
    const displayAspect = aspect === "All Aspects" ? "All" : aspect;
    document.getElementById("wordcloudPositiveTitle").innerText = `${displayAspect} Aspects Positive Wordcloud`;
    document.getElementById("wordcloudNegativeTitle").innerText = `${displayAspect} Aspects Negative Wordcloud`;
  }


  // Jalankan otomatis saat halaman selesai dimuat
  window.addEventListener("DOMContentLoaded", () => {
    updateWordCloud();
  });
