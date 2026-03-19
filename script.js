/* ═══════════════════════════════════════════════════════
   DIGITAL ISLAMIC WEDDING INVITATION
   Interactive Logic — script.js
   ═══════════════════════════════════════════════════════ */

(function () {
    'use strict';

    /* ─── CONFIGURATION ─── */
    const CONFIG = {
        weddingDate: new Date('2026-04-30T11:00:00'),   // Nikah date/time
        valimaDate: new Date('2026-04-30T13:00:00'),
        hennaDate: new Date('2026-04-30T19:00:00'),
        scratchThreshold: 0.50, // 50% scratched to reveal
        notificationTimes: {
            oneWeek: 7 * 24 * 60 * 60 * 1000,
            oneDay: 1 * 24 * 60 * 60 * 1000,
            oneHour: 1 * 60 * 60 * 1000,
        }
    };

    /* ─── UTILITY HELPERS ─── */
    function $(sel) { return document.querySelector(sel); }
    function $$(sel) { return document.querySelectorAll(sel); }

    /* ═══════════════════════════════════════════════════
       1. FLOATING PETALS
       ═══════════════════════════════════════════════════ */
    function createPetals() {
        const container = $('#floating-petals');
        if (!container) return;
        const colors = ['#E8C4C4', '#D4A0A0', '#C9A84C', '#B5C9A8', '#D4AF37'];
        for (let i = 0; i < 25; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            petal.style.left = Math.random() * 100 + '%';
            petal.style.animationDelay = Math.random() * 8 + 's';
            petal.style.animationDuration = (6 + Math.random() * 6) + 's';
            petal.style.background = colors[Math.floor(Math.random() * colors.length)];
            petal.style.width = (8 + Math.random() * 10) + 'px';
            petal.style.height = petal.style.width;
            container.appendChild(petal);
        }
    }

    /* ═══════════════════════════════════════════════════
       2. CURTAIN OPENING ANIMATION (REALISTIC FABRIC)
       ═══════════════════════════════════════════════════ */
    function initCurtain() {
        const curtainLeft = $('#curtain-left');
        const curtainRight = $('#curtain-right');
        const tapPrompt = $('#tap-prompt');
        const bismillah = $('#bismillah');
        const title = $('#invitation-title');
        const names = $('#couple-names');
        const scrollHint = $('#scroll-hint');
        const ornamentTop = $('.ornament-top');
        const ornamentBot = $('.ornament-bottom');
        const section = $('#curtain-section');

        if (!curtainLeft || !curtainRight) return;

        let isOpened = false;

        function openCurtains() {
            if (isOpened) return;
            isOpened = true;

            // Start background audio on user interaction
            startAudio();

            const tl = gsap.timeline();

            // 1. Fade out tap prompt smoothly
            tl.to(tapPrompt, {
                opacity: 0,
                y: 15,
                scale: 0.9,
                duration: 0.5,
                ease: 'power2.in',
                onComplete: () => {
                    tapPrompt.style.display = 'none';
                }
            }, 0);

            // 2. Realistic curtain pull — multi-phase movement
            // Phase A: Slight initial tug (fabric resistance)
            tl.to(curtainLeft, {
                xPercent: -8,
                duration: 0.4,
                ease: 'power1.out'
            }, 0.3);
            tl.to(curtainRight, {
                xPercent: 8,
                duration: 0.4,
                ease: 'power1.out'
            }, 0.3);

            // Phase B: Main pull — curtains slide and gather
            tl.to(curtainLeft, {
                xPercent: -92,
                scaleX: 0.35,
                duration: 2.0,
                ease: 'power2.inOut'
            }, 0.7);
            tl.to(curtainRight, {
                xPercent: 92,
                scaleX: 0.35,
                duration: 2.0,
                ease: 'power2.inOut'
            }, 0.7);

            // Phase C: Settle wobble — fabric bounces slightly
            tl.to(curtainLeft, {
                scaleX: 0.38,
                xPercent: -90,
                duration: 0.4,
                ease: 'elastic.out(1.2, 0.6)'
            }, 2.7);
            tl.to(curtainRight, {
                scaleX: 0.38,
                xPercent: 90,
                duration: 0.4,
                ease: 'elastic.out(1.2, 0.6)'
            }, 2.7);

            // 3. Reveal content sequentially
            tl.to(ornamentTop, {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out'
            }, 1.4);

            tl.to(bismillah, {
                opacity: 1,
                y: 0,
                duration: 1.0,
                ease: 'power2.out'
            }, 1.6);

            tl.to(title, {
                opacity: 1,
                y: 0,
                duration: 1.0,
                ease: 'power2.out'
            }, 2.2);

            tl.to(names, {
                opacity: 1,
                y: 0,
                duration: 1.0,
                ease: 'power2.out'
            }, 2.8);

            tl.to(ornamentBot, {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out'
            }, 3.2);

            tl.to(scrollHint, {
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out'
            }, 3.6);

            // Add sparkle burst
            setTimeout(() => {
                createSparkles(window.innerWidth / 2, window.innerHeight / 2);
            }, 1800);
        }

        // Click/tap event on entire section
        section.addEventListener('click', openCurtains);
        section.addEventListener('touchstart', function (e) {
            e.preventDefault();
            openCurtains();
        }, { passive: false });
    }

    /* Create sparkle burst */
    function createSparkles(x, y) {
        for (let i = 0; i < 12; i++) {
            const spark = document.createElement('div');
            spark.classList.add('sparkle-particle');
            const angle = (Math.PI * 2 * i) / 12;
            const dist = 40 + Math.random() * 60;
            spark.style.left = (x + Math.cos(angle) * dist) + 'px';
            spark.style.top = (y + Math.sin(angle) * dist) + 'px';
            spark.style.background = Math.random() > 0.5 ? '#C9A84C' : '#D4AF37';
            document.body.appendChild(spark);
            setTimeout(() => spark.remove(), 1000);
        }
    }

    /* ═══════════════════════════════════════════════════
       3. SCRATCH CARDS
       ═══════════════════════════════════════════════════ */
    function initScratchCards() {
        const cards = $$('.scratch-card');
        const scratchStates = [];

        cards.forEach((card, index) => {
            const canvas = card.querySelector('.scratch-canvas');
            const label = card.querySelector('.scratch-label');
            const ctx = canvas.getContext('2d');
            const rect = card.querySelector('.scratch-card-inner');

            scratchStates.push({ revealed: false, scratching: false });

            // Set canvas size to match card
            function resizeCanvas() {
                canvas.width = rect.offsetWidth;
                canvas.height = rect.offsetHeight;
                drawGoldLayer(ctx, canvas.width, canvas.height);
            }

            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            // Drawing functions
            let isDrawing = false;

            function getPos(e) {
                const r = canvas.getBoundingClientRect();
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                return {
                    x: (clientX - r.left) * (canvas.width / r.width),
                    y: (clientY - r.top) * (canvas.height / r.height)
                };
            }

            function scratch(e) {
                if (!isDrawing || scratchStates[index].revealed) return;
                e.preventDefault();
                const pos = getPos(e);
                ctx.globalCompositeOperation = 'destination-out';
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
                ctx.fill();

                // Hide label after first scratch
                if (!scratchStates[index].scratching) {
                    scratchStates[index].scratching = true;
                    label.classList.add('hidden');
                }

                checkScratchProgress(ctx, canvas, index, card);
            }

            canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
            canvas.addEventListener('mousemove', scratch);
            canvas.addEventListener('mouseup', () => { isDrawing = false; });
            canvas.addEventListener('mouseleave', () => { isDrawing = false; });

            canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, { passive: false });
            canvas.addEventListener('touchmove', scratch, { passive: false });
            canvas.addEventListener('touchend', () => { isDrawing = false; });
        });
    }

    function drawGoldLayer(ctx, w, h) {
        // Circular clip for round plate
        ctx.save();
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, w / 2, 0, Math.PI * 2);
        ctx.clip();

        // Radial metallic gold gradient (brushed metal look)
        const grad = ctx.createRadialGradient(w * 0.38, h * 0.32, 0, w / 2, h / 2, w / 2);
        grad.addColorStop(0, '#F5E6A3');
        grad.addColorStop(0.15, '#E8D48B');
        grad.addColorStop(0.35, '#D4AF37');
        grad.addColorStop(0.55, '#C9A84C');
        grad.addColorStop(0.75, '#B8941F');
        grad.addColorStop(1, '#A38728');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Concentric brushed metal lines radiating from center
        const cx = w / 2, cy = h / 2;
        for (let i = 0; i < 60; i++) {
            const angle = (Math.PI * 2 * i) / 60;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + Math.cos(angle) * w, cy + Math.sin(angle) * h);
            ctx.strokeStyle = `rgba(255,255,255,${0.03 + Math.random() * 0.07})`;
            ctx.lineWidth = 1 + Math.random();
            ctx.stroke();
        }

        // Concentric circles for depth
        for (let r = 10; r < w / 2; r += 12) {
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255,255,255,${0.02 + Math.random() * 0.04})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }

        // Highlight shine spot
        const shine = ctx.createRadialGradient(w * 0.35, h * 0.3, 0, w / 2, h / 2, w * 0.55);
        shine.addColorStop(0, 'rgba(255,255,255,0.35)');
        shine.addColorStop(0.4, 'rgba(255,255,255,0.08)');
        shine.addColorStop(1, 'rgba(0,0,0,0.08)');
        ctx.fillStyle = shine;
        ctx.fillRect(0, 0, w, h);

        // Subtle edge ring
        ctx.beginPath();
        ctx.arc(cx, cy, w / 2 - 3, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(163, 135, 40, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
        ctx.globalCompositeOperation = 'source-over';
    }

    function checkScratchProgress(ctx, canvas, index, cardEl) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparent = 0;
        const total = pixels.length / 4;
        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] === 0) transparent++;
        }
        const pct = transparent / total;

        if (pct >= CONFIG.scratchThreshold && !cardEl._revealed) {
            cardEl._revealed = true;
            // Fade away remaining canvas
            gsap.to(canvas, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    canvas.style.pointerEvents = 'none';
                }
            });

            // Fire confetti! 🎉
            fireConfetti(cardEl);
        }
    }

    function fireConfetti(el) {
        const rect = el.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        // Burst 1
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { x, y },
            colors: ['#C9A84C', '#D4AF37', '#E8D48B', '#FFF8F0', '#D4A0A0', '#8FAE7E'],
            ticks: 120,
            gravity: 0.8,
            scalar: 1.2,
            shapes: ['star', 'circle']
        });

        // Burst 2 delayed
        setTimeout(() => {
            confetti({
                particleCount: 40,
                spread: 100,
                origin: { x, y: y - 0.05 },
                colors: ['#C9A84C', '#D4AF37', '#E8D48B'],
                ticks: 100,
                gravity: 1,
                scalar: 0.8,
            });
        }, 200);
    }

    /* ═══════════════════════════════════════════════════
       4. COUNTDOWN TIMER
       ═══════════════════════════════════════════════════ */
    function initCountdown() {
        const daysEl = $('#countdown-days');
        const hoursEl = $('#countdown-hours');
        const minutesEl = $('#countdown-minutes');
        const secondsEl = $('#countdown-seconds');

        if (!daysEl) return;

        function update() {
            const now = new Date();
            const diff = CONFIG.weddingDate - now;

            if (diff <= 0) {
                daysEl.textContent = '0';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const mins = Math.floor((diff / (1000 * 60)) % 60);
            const secs = Math.floor((diff / 1000) % 60);

            // Animate number change
            animateNumber(daysEl, days.toString());
            animateNumber(hoursEl, hrs.toString().padStart(2, '0'));
            animateNumber(minutesEl, mins.toString().padStart(2, '0'));
            animateNumber(secondsEl, secs.toString().padStart(2, '0'));
        }

        function animateNumber(el, newVal) {
            if (el.textContent !== newVal) {
                gsap.to(el, {
                    scale: 1.1,
                    duration: 0.15,
                    ease: 'power2.out',
                    onComplete: () => {
                        el.textContent = newVal;
                        gsap.to(el, {
                            scale: 1,
                            duration: 0.2,
                            ease: 'power2.out'
                        });
                    }
                });
            }
        }

        update();
        setInterval(update, 1000);
    }

    /* ═══════════════════════════════════════════════════
       5. NOTIFICATION SYSTEM
       ═══════════════════════════════════════════════════ */
    function initNotification() {
        const btn = $('#notify-btn');
        const statusEl = $('#notify-status');

        if (!btn) return;

        // Check if already subscribed
        if (localStorage.getItem('wedding-notify-subscribed') === 'true') {
            markSubscribed(btn, statusEl);
            scheduleLocalNotifications();
            return;
        }

        btn.addEventListener('click', async () => {
            try {
                // Request notification permission
                if (!('Notification' in window)) {
                    statusEl.textContent = 'Notifications not supported in this browser';
                    return;
                }

                const permission = await Notification.requestPermission();

                if (permission === 'granted') {
                    localStorage.setItem('wedding-notify-subscribed', 'true');
                    localStorage.setItem('wedding-notify-time', Date.now().toString());
                    markSubscribed(btn, statusEl);
                    scheduleLocalNotifications();

                    // Show immediate confirmation notification
                    new Notification('🎉 Reminder Set!', {
                        body: "You'll be notified before Ammar & Juveriya's wedding. May Allah bless this union!",
                        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💍</text></svg>',
                        badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💍</text></svg>',
                        tag: 'wedding-confirm'
                    });

                    // Register service worker for push
                    registerServiceWorker();

                    // Confetti celebration
                    confetti({
                        particleCount: 100,
                        spread: 80,
                        origin: { y: 0.6 },
                        colors: ['#C9A84C', '#D4AF37', '#E8D48B', '#D4A0A0', '#8FAE7E']
                    });
                } else if (permission === 'denied') {
                    statusEl.textContent = 'Notifications blocked. Please enable in browser settings.';
                    statusEl.style.color = '#D4A0A0';
                }
            } catch (err) {
                console.error('Notification error:', err);
                statusEl.textContent = 'Could not enable notifications. Try again later.';
            }
        });
    }

    function markSubscribed(btn, statusEl) {
        btn.classList.add('subscribed');
        btn.querySelector('span').textContent = 'See You There';
        statusEl.textContent = "You'll receive reminders before the wedding, Insha'Allah!";
        statusEl.style.color = '#8FAE7E';
    }

    function scheduleLocalNotifications() {
        const now = Date.now();

        const reminders = [
            {
                name: 'one-week',
                time: CONFIG.weddingDate.getTime() - CONFIG.notificationTimes.oneWeek,
                title: '📅 One Week to Go!',
                body: "Ammar & Juveriya's wedding is just one week away! Mark your calendar."
            },
            {
                name: 'one-day',
                time: CONFIG.weddingDate.getTime() - CONFIG.notificationTimes.oneDay,
                title: '🌙 Tomorrow is the Big Day!',
                body: "Ammar & Juveriya's Nikah is tomorrow. Don't forget to attend this blessed occasion!"
            },
            {
                name: 'one-hour',
                time: CONFIG.weddingDate.getTime() - CONFIG.notificationTimes.oneHour,
                title: '🕌 Starting in 1 Hour!',
                body: "The Nikah ceremony begins in just one hour at Masjid-e-Baitul Mukarram. See you there!"
            }
        ];

        reminders.forEach(r => {
            const delay = r.time - now;
            if (delay > 0 && !localStorage.getItem(`wedding-${r.name}-sent`)) {
                // Use setTimeout for in-tab notifications
                // For production, this would use the service worker
                setTimeout(() => {
                    if (Notification.permission === 'granted') {
                        new Notification(r.title, {
                            body: r.body,
                            icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💍</text></svg>',
                            tag: `wedding-${r.name}`,
                            requireInteraction: true
                        });
                        localStorage.setItem(`wedding-${r.name}-sent`, 'true');
                    }
                }, Math.min(delay, 2147483647)); // Max setTimeout value
            }
        });
    }

    async function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const reg = await navigator.serviceWorker.register('sw.js');
                console.log('Service Worker registered:', reg.scope);

                // Store reminder schedule in SW via postMessage
                if (reg.active) {
                    reg.active.postMessage({
                        type: 'SCHEDULE_REMINDERS',
                        weddingDate: CONFIG.weddingDate.getTime()
                    });
                }
            } catch (err) {
                console.log('SW registration failed:', err);
            }
        }
    }

    /* ═══════════════════════════════════════════════════
       6. GSAP SCROLL ANIMATIONS
       ═══════════════════════════════════════════════════ */
    function initScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // ── Scratch Section ──
        gsap.from('#scratch-section .section-header', {
            y: 50, opacity: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '#scratch-section', start: 'top 80%', toggleActions: 'play none none none' }
        });

        gsap.from('.scratch-card', {
            y: 60, opacity: 0, scale: 0.9, stagger: 0.2, duration: 0.8, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: '.scratch-cards-container', start: 'top 80%', toggleActions: 'play none none none' }
        });

        gsap.from('.notify-container', {
            y: 30, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: '.notify-container', start: 'top 85%', toggleActions: 'play none none none' }
        });

        // ── Countdown Section ──
        gsap.from('#countdown-section .section-header', {
            y: 50, opacity: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '#countdown-section', start: 'top 80%', toggleActions: 'play none none none' }
        });

        gsap.from('.countdown-unit', {
            y: 40, opacity: 0, scale: 0.8, stagger: 0.15, duration: 0.7, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: '.countdown-container', start: 'top 85%', toggleActions: 'play none none none' }
        });

        // ── Invitation Image ──
        gsap.from('#invitation-image-section .section-header', {
            y: 50, opacity: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '#invitation-image-section', start: 'top 80%', toggleActions: 'play none none none' }
        });

        gsap.from('.invitation-frame', {
            y: 60, opacity: 0, scale: 0.9, rotation: -2, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '.invitation-frame', start: 'top 85%', toggleActions: 'play none none none' }
        });

        // ── Venue Section ──
        gsap.from('#venue-section .section-header', {
            y: 50, opacity: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '#venue-section', start: 'top 80%', toggleActions: 'play none none none' }
        });

        gsap.from('#venue-nikah', {
            x: -50, opacity: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.venues-container', start: 'top 80%', toggleActions: 'play none none none' }
        });

        gsap.from('#venue-valima', {
            x: 50, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: '.venues-container', start: 'top 80%', toggleActions: 'play none none none' }
        });

        // ── Celebrate Section ──
        gsap.from('.celebrate-title', {
            y: 40, opacity: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '#celebrate-section', start: 'top 75%', toggleActions: 'play none none none' }
        });

        gsap.from('.celebrate-dua', {
            x: -30, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: '.celebrate-dua', start: 'top 85%', toggleActions: 'play none none none' }
        });

        gsap.from('.celebrate-ref', {
            opacity: 0, duration: 0.8, delay: 0.4, ease: 'power2.out',
            scrollTrigger: { trigger: '.celebrate-ref', start: 'top 90%', toggleActions: 'play none none none' }
        });

        gsap.from('.celebrate-message', {
            y: 30, opacity: 0, duration: 0.8, delay: 0.3, ease: 'power2.out',
            scrollTrigger: { trigger: '.celebrate-message', start: 'top 90%', toggleActions: 'play none none none' }
        });

        // ── Footer ──
        gsap.from('.site-footer', {
            opacity: 0, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: '.site-footer', start: 'top 95%', toggleActions: 'play none none none' }
        });

        // ── Parallax effect on invitation frame ──
        gsap.to('.invitation-frame', {
            y: -20,
            ease: 'none',
            scrollTrigger: {
                trigger: '#invitation-image-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    }

    /* ═══════════════════════════════════════════════════
       7. SMOOTH SCROLL SPARKLE TRAIL (TOUCH DELIGHT)
       ═══════════════════════════════════════════════════ */
    function initTouchSparkles() {
        let lastSparkle = 0;
        document.addEventListener('touchmove', (e) => {
            const now = Date.now();
            if (now - lastSparkle < 100) return;
            lastSparkle = now;
            const touch = e.touches[0];
            createSparkles(touch.clientX, touch.clientY);
        }, { passive: true });
    }

    /* ═══════════════════════════════════════════════════
       8. GOLD DUST AMBIENT PARTICLES
       ═══════════════════════════════════════════════════ */
    function initGoldDust() {
        const sections = ['#scratch-section', '#countdown-section', '#celebrate-section'];
        sections.forEach(sel => {
            const section = document.querySelector(sel);
            if (!section) return;
            for (let i = 0; i < 15; i++) {
                const dust = document.createElement('div');
                dust.style.cssText = `
                    position: absolute;
                    width: ${2 + Math.random() * 3}px;
                    height: ${2 + Math.random() * 3}px;
                    background: rgba(201, 168, 76, ${0.2 + Math.random() * 0.3});
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    pointer-events: none;
                    z-index: 0;
                    animation: goldDustFloat ${5 + Math.random() * 8}s infinite ease-in-out ${Math.random() * 5}s;
                `;
                section.appendChild(dust);
            }
        });

        // Add the gold dust animation dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes goldDustFloat {
                0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
                25% { opacity: 0.6; }
                50% { transform: translateY(-30px) translateX(15px); opacity: 0.4; }
                75% { opacity: 0.6; }
            }
        `;
        document.head.appendChild(style);
    }

    /* ═══════════════════════════════════════════════════
       9. BACKGROUND AUDIO SYSTEM
       ═══════════════════════════════════════════════════ */
    let audioStarted = false;

    function startAudio() {
        if (audioStarted) return;
        audioStarted = true;

        const audio = $('#bg-audio');
        const toggleBtn = $('#audio-toggle');
        if (!audio) return;

        // Play audio (loop is set in HTML)
        audio.volume = 0.5;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Show toggle button with animation
                if (toggleBtn) {
                    toggleBtn.classList.add('visible', 'playing');
                }
            }).catch(err => {
                console.log('Audio autoplay prevented:', err);
                // Show button anyway for manual play
                if (toggleBtn) {
                    toggleBtn.classList.add('visible');
                }
            });
        }
    }

    function initAudio() {
        const audio = $('#bg-audio');
        const toggleBtn = $('#audio-toggle');
        if (!audio || !toggleBtn) return;

        const iconOn = toggleBtn.querySelector('.audio-icon-on');
        const iconOff = toggleBtn.querySelector('.audio-icon-off');

        toggleBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().then(() => {
                    iconOn.style.display = '';
                    iconOff.style.display = 'none';
                    toggleBtn.classList.add('playing');
                }).catch(() => { });
            } else {
                audio.pause();
                iconOn.style.display = 'none';
                iconOff.style.display = '';
                toggleBtn.classList.remove('playing');
            }
        });

        // Update icon when audio ends (in case loop fails)
        audio.addEventListener('ended', () => {
            // Audio should loop (loop attribute), but just in case
            audio.currentTime = 0;
            audio.play().catch(() => { });
        });
    }

    /* ═══════════════════════════════════════════════════
       INIT EVERYTHING ON DOM READY
       ═══════════════════════════════════════════════════ */
    document.addEventListener('DOMContentLoaded', () => {
        createPetals();
        initCurtain();
        initScratchCards();
        initCountdown();
        initNotification();
        initGoldDust();
        initTouchSparkles();
        initAudio();

        // Delay scroll anim setup slightly to ensure everything is laid out
        setTimeout(initScrollAnimations, 300);
    });

})();
