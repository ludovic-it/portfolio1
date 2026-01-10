// Horizontal Scroll Projects - Transform vertical scroll into horizontal movement
document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.horizontal-projects-section');
    const stickyContainer = document.querySelector('.projects-sticky-container');
    const track = document.querySelector('.horizontal-track');

    if (!section || !track) return;

    // Check if we are on a large screen (desktop)
    const isLargeScreen = () => window.innerWidth > 768;

    const handleScroll = () => {
        if (!isLargeScreen()) {
            // Sur mobile, pas de scroll horizontal
            track.style.transform = 'none';
            return;
        }

        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;

        // Calculer la progression du scroll
        // 0% quand le haut de la section est en haut du viewport
        // 100% quand on a scrollé toute la hauteur de la section
        const scrollDistance = -sectionTop;
        const maxScroll = sectionHeight - viewportHeight;

        let progress = 0;
        if (scrollDistance > 0 && scrollDistance <= maxScroll) {
            progress = scrollDistance / maxScroll;
        } else if (scrollDistance > maxScroll) {
            progress = 1;
        } else {
            progress = 0;
        }

        // Calculer la translation horizontale
        // Chaque projet occupe 90vw, donc on doit déplacer de (nombre_projets - 1) * 90vw
        const projectItems = track.querySelectorAll('.project-item');
        const numProjects = projectItems.length;
        const trackWidth = track.scrollWidth;
        const containerWidth = window.innerWidth;
        const maxTranslate = trackWidth - containerWidth;

        // Appliquer la translation
        const translateX = -progress * maxTranslate;
        track.style.transform = `translateX(${translateX}px)`;
    };

    // Throttling avec requestAnimationFrame
    let ticking = false;
    const requestScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', requestScroll, { passive: true });
    window.addEventListener('resize', () => {
        handleScroll();
    }, { passive: true });


    // Initialiser
    handleScroll();

    // Cursor Follower Logic
    const cursor = document.querySelector('.project-cursor');
    const imageWrappers = document.querySelectorAll('.project-image-wrapper');

    if (cursor) {
        // Suivre la souris
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Effet au survol des images
        imageWrappers.forEach(wrapper => {
            wrapper.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
            });

            wrapper.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });
    }
});
