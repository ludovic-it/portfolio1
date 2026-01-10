// Particle Animation for Hero Section
(function() {
    'use strict';

    function initMenu() {
        try {
            const navToggle = document.querySelector('.nav-toggle');
            const navMenu = document.querySelector('.nav-menu');

            if (navToggle && navMenu && navToggle.addEventListener && navMenu.classList) {
                navToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                });
            }
        } catch (e) {
            console.warn('Erreur lors de l\'initialisation du menu mobile:', e);
        }
    }

    function initBTSModal() {
        try {
            const openBtns = document.querySelectorAll('.bts-link-button');
            const pageContent = document.getElementById('page-content');

            if (!openBtns || openBtns.length === 0) return;

            if (typeof openBtns.forEach !== 'function') return;

            openBtns.forEach(btn => {
                if (!btn || !btn.addEventListener) return;

                btn.addEventListener('click', (e) => {
                    try {
                        e.preventDefault();

                        const targetId = btn.dataset ? btn.dataset.target : btn.getAttribute('data-target');
                        if (!targetId) return;

                        const modal = document.querySelector(targetId);
                        if (!modal || !pageContent) return;

                        // Blur UNIQUEMENT le contenu
                        if (pageContent.classList) {
                            pageContent.classList.add('page-blur');
                        }

                        // Afficher la modale
                        modal.style.display = 'flex';
                        if (document.body) {
                            document.body.style.overflow = 'hidden';
                        }

                        const raf = window.requestAnimationFrame || function(cb) { return setTimeout(cb, 16); };
                        raf(() => {
                            if (modal.classList) {
                                modal.classList.add('show');
                            }
                        });

                        const overlay = modal.querySelector('.bts-modal-overlay-new');
                        const closeBtn = modal.querySelector('.bts-modal-close-new');

                        function closeModal() {
                            if (modal.classList) {
                                modal.classList.remove('show');
                            }

                            setTimeout(() => {
                                modal.style.display = 'none';
                                if (document.body) {
                                    document.body.style.overflow = '';
                                }
                                if (pageContent && pageContent.classList) {
                                    pageContent.classList.remove('page-blur');
                                }
                            }, 300);

                            document.removeEventListener('keydown', escListener);
                        }

                        if (overlay && overlay.addEventListener) {
                            overlay.addEventListener('click', closeModal);
                        }
                        if (closeBtn && closeBtn.addEventListener) {
                            closeBtn.addEventListener('click', closeModal);
                        }

                        function escListener(e) {
                            if (e && e.key === 'Escape') {
                                closeModal();
                            }
                        }

                        document.addEventListener('keydown', escListener);
                    } catch (e) {
                        console.warn('Erreur lors de l\'ouverture de la modale BTS:', e);
                    }
                });
            });
        } catch (e) {
            console.warn('Erreur lors de l\'initialisation de la modale BTS:', e);
        }
    }




    function initHeroCanvas() {
        try {
            const canvas = document.getElementById('hero-canvas');
            if (!canvas) return;

            // Vérifier le support de Canvas
            if (!canvas.getContext) {
                console.warn('Canvas non supporté');
                return;
            }

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.warn('Context 2D non disponible');
                return;
            }

            let width, height;
            let particles = [];
            let animationId = null;

            const particleCount = 100;
            const mouseDistance = 150;

            let mouse = { x: null, y: null };

            function handleMouseMove(e) {
                try {
                    if (!canvas || !canvas.getBoundingClientRect) return;
                    const rect = canvas.getBoundingClientRect();
                    mouse.x = e.clientX - rect.left;
                    mouse.y = e.clientY - rect.top;
                } catch (e) {
                    console.warn('Erreur lors du mouvement de la souris:', e);
                }
            }

            function handleMouseLeave() {
                mouse.x = null;
                mouse.y = null;
            }

            if (window.addEventListener) {
                window.addEventListener('mousemove', handleMouseMove);
                window.addEventListener('mouseleave', handleMouseLeave);
            }

            function resize() {
                try {
                    if (!canvas || !canvas.parentElement) return;
                    width = canvas.width = canvas.parentElement.offsetWidth;
                    height = canvas.height = canvas.parentElement.offsetHeight;
                } catch (e) {
                    console.warn('Erreur lors du redimensionnement:', e);
                }
            }

            if (window.addEventListener) {
                window.addEventListener('resize', resize);
            }
            resize();

            function Particle() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5);
                this.vy = (Math.random() - 0.5);
                this.size = Math.random() * 3 + 1;
                this.color = '#4A7FFF';
            }

            Particle.prototype.update = function() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouseDistance && distance > 0) {
                        this.x -= dx / distance;
                        this.y -= dy / distance;
                    }
                }
            };

            Particle.prototype.draw = function() {
                try {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                } catch (e) {
                    console.warn('Erreur lors du dessin de la particule:', e);
                }
            };

            function init() {
                particles = [];
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }
            }

            function animate() {
                try {
                    const raf = window.requestAnimationFrame || function(cb) { return setTimeout(cb, 16); };
                    animationId = raf(animate);

                    if (!ctx || !canvas) return;
                    ctx.clearRect(0, 0, width, height);

                    particles.forEach(p => {
                        if (p && typeof p.update === 'function' && typeof p.draw === 'function') {
                            p.update();
                            p.draw();
                        }
                    });
                } catch (e) {
                    console.warn('Erreur lors de l\'animation:', e);
                    if (animationId) {
                        const caf = window.cancelAnimationFrame || clearTimeout;
                        caf(animationId);
                    }
                }
            }

            init();
            animate();
        } catch (e) {
            console.warn('Erreur lors de l\'initialisation du canvas hero:', e);
        }
    }

    // Initialiser quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initMenu();
            initBTSModal();
            initHeroCanvas();
        });
    } else {
        initMenu();
        initBTSModal();
        initHeroCanvas();
    }
})();
