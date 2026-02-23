document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Logic
    const initMobileMenu = () => {
        const nav = document.querySelector('nav');
        if (!nav) return;

        const container = nav.querySelector('.container');
        const desktopMenu = nav.querySelector('.hidden.lg\\:flex');

        // Create mobile menu button
        const mobileBtn = document.createElement('button');
        mobileBtn.className = 'lg:hidden text-white text-2xl';
        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        container.appendChild(mobileBtn);

        // Create mobile overlay
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-brand-dark z-[60] flex flex-col items-center justify-center gap-8 opacity-0 pointer-events-none transition-all duration-300';
        overlay.innerHTML = `
            <button class="absolute top-6 right-6 text-white text-3xl close-menu"><i class="fas fa-times"></i></button>
            <a href="index.html" class="text-2xl font-bold hover:text-brand-cyan transition-colors">Home</a>
            <a href="algorithms.html" class="text-2xl font-bold hover:text-brand-cyan transition-colors">Algorithms</a>
            <a href="deep-learning.html" class="text-2xl font-bold hover:text-brand-cyan transition-colors">Deep Learning</a>
            <a href="nlp.html" class="text-2xl font-bold hover:text-brand-cyan transition-colors">NLP</a>
            <a href="industry.html" class="text-2xl font-bold hover:text-brand-cyan transition-colors">Industry</a>
            <a href="ethics.html" class="text-2xl font-bold hover:text-brand-cyan transition-colors">Ethics</a>
        `;
        document.body.appendChild(overlay);

        mobileBtn.addEventListener('click', () => {
            overlay.classList.remove('opacity-0', 'pointer-events-none');
        });

        overlay.querySelector('.close-menu').addEventListener('click', () => {
            overlay.classList.add('opacity-0', 'pointer-events-none');
        });

        // Close on link click
        overlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                overlay.classList.add('opacity-0', 'pointer-events-none');
            });
        });
    };

    initMobileMenu();

    // 2. Scroll Reveal Logic
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
            }
        });
    }, observerOptions);

    // Target glass-cards that are NOT in the nav
    const revealedItems = document.querySelectorAll('section .glass-card, section h2, .reveal-on-scroll');
    revealedItems.forEach(item => {
        item.classList.add('reveal-on-scroll');
        observer.observe(item);
    });

    // 2. Training Chart Initialization
    const chartElement = document.getElementById('trainingChart');
    if (chartElement) {
        const ctx = chartElement.getContext('2d');

        // Initial static data
        const labels = Array.from({ length: 15 }, (_, i) => `E${i + 1}`);
        const lossData = [0.95, 0.8, 0.65, 0.5, 0.42, 0.35, 0.28, 0.22, 0.18, 0.15, 0.12, 0.1, 0.08, 0.07, 0.06];
        const accData = [0.2, 0.35, 0.5, 0.62, 0.7, 0.78, 0.83, 0.88, 0.91, 0.93, 0.95, 0.96, 0.97, 0.98, 0.99];

        let trainingChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Prediction Error (Loss)',
                    data: lossData,
                    borderColor: '#0061ff',
                    backgroundColor: 'rgba(0, 97, 255, 0.1)',
                    borderWidth: 4,
                    tension: 0.4,
                    pointRadius: 0,
                    fill: true
                }, {
                    label: 'Model Confidence (Accuracy)',
                    data: accData,
                    borderColor: '#60efff',
                    backgroundColor: 'rgba(96, 239, 255, 0.05)',
                    borderWidth: 4,
                    tension: 0.4,
                    pointRadius: 0,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: '#94a3b8', font: { weight: 'bold', family: 'Inter' } }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#64748b' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#64748b' }
                    }
                }
            }
        });

        // Simulation Buttons
        window.simulateTraining = () => {
            // Add random slight "jitter" to the training curve to make it look realistic
            trainingChart.data.datasets[0].data = trainingChart.data.datasets[0].data.map(v => Math.max(0.01, v * (0.85 + Math.random() * 0.1)));
            trainingChart.data.datasets[1].data = trainingChart.data.datasets[1].data.map(v => Math.min(1.0, v * (1.02 + Math.random() * 0.05)));
            trainingChart.update('active');
        };

        window.resetPlot = () => {
            trainingChart.data.datasets[0].data = [0.95, 0.8, 0.65, 0.5, 0.42, 0.35, 0.28, 0.22, 0.18, 0.15, 0.12, 0.1, 0.08, 0.07, 0.06];
            trainingChart.data.datasets[1].data = [0.2, 0.35, 0.5, 0.62, 0.7, 0.78, 0.83, 0.88, 0.91, 0.93, 0.95, 0.96, 0.97, 0.98, 0.99];
            trainingChart.update();
        };
    }
});
