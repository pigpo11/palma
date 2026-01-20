/* ========================================
   PALMA STUDIO - JavaScript
   Interactions & Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initScrollEffects();
    initPortfolioFilter();
    initModal();
    initContactForm();
    initCounterAnimation();
    initSmoothScroll();
});

/* ===== Navigation ===== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/* ===== Scroll Effects ===== */
function initScrollEffects() {
    const animatedElements = document.querySelectorAll(
        '.section-header, .about-content, .stat-card, .service-card, .work-item, .process-step, .contact-info, .contact-form-wrapper'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

/* ===== Portfolio Filter ===== */
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            workItems.forEach(item => {
                const category = item.dataset.category;

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ===== Modal ===== */
function initModal() {
    const modal = document.getElementById('work-modal');
    const modalClose = document.getElementById('modal-close');
    const workItems = document.querySelectorAll('.work-item');

    // Work item data (in production, this would come from a database)
    const worksData = {
        '법률사무소 A 랜딩페이지': {
            category: 'Landing Page',
            industry: '법률 서비스',
            goal: '상담 문의 전환율 향상',
            solution: '복잡한 법률 서비스를 직관적인 구조로 재정리, 신뢰감 있는 디자인 적용',
            result: '문의 전환율 280% 증가',
            gradient: 'gradient-1'
        },
        '코칭 브랜드 B 스레드': {
            category: 'Threads',
            industry: '코칭 / 교육',
            goal: '브랜드 인지도 및 팔로워 확보',
            solution: '전문성을 보여주는 스토리텔링 콘텐츠 시리즈 기획 및 운영',
            result: '팔로워 3배 증가, 리드 2배 증가',
            gradient: 'gradient-2'
        },
        '컨설팅 C 패키지': {
            category: 'Package',
            industry: '비즈니스 컨설팅',
            goal: '온라인 채널 전면 구축',
            solution: '랜딩페이지 + 스레드 통합 운영으로 시너지 극대화',
            result: '문의 5배 증가, 계약률 180% 상승',
            gradient: 'gradient-3'
        },
        '교육 플랫폼 D': {
            category: 'Landing Page',
            industry: '에듀테크',
            goal: '사용자 체류 시간 증가',
            solution: '인터랙티브 요소와 시각적 콘텐츠로 몰입도 향상',
            result: '세션 시간 420% UP',
            gradient: 'gradient-4'
        },
        '스타트업 E 스레드': {
            category: 'Threads',
            industry: '기술 스타트업',
            goal: '초기 고객 확보',
            solution: '창업 스토리와 제품 개발 과정을 공유하는 진정성 있는 콘텐츠',
            result: '리드 2.5배 증가',
            gradient: 'gradient-5'
        },
        '의료기관 F 홈페이지': {
            category: 'Landing Page',
            industry: '의료 서비스',
            goal: '예약 전환율 개선',
            solution: '신뢰도 높은 의료진 소개와 간편한 예약 플로우 구현',
            result: '전환율 195% UP',
            gradient: 'gradient-6'
        }
    };

    workItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('.work-title').textContent;
            const data = worksData[title];

            if (data) {
                // Update modal content
                modal.querySelector('.modal-category').textContent = data.category;
                modal.querySelector('.modal-title').textContent = title;
                modal.querySelector('.modal-image .work-placeholder').className = `work-placeholder ${data.gradient}`;

                const details = modal.querySelectorAll('.detail-item');
                details[0].querySelector('.detail-value').textContent = data.industry;
                details[1].querySelector('.detail-value').textContent = data.goal;
                details[2].querySelector('.detail-value').textContent = data.solution;
                details[3].querySelector('.detail-value').textContent = data.result;
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* ===== Contact Form ===== */
function initContactForm() {
    const form = document.getElementById('contact-form');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate
        if (!data.name || !data.email || !data.message) {
            showNotification('필수 항목을 모두 입력해주세요.', 'error');
            return;
        }

        if (!isValidEmail(data.email)) {
            showNotification('올바른 이메일 형식을 입력해주세요.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>전송 중...</span>';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('문의가 성공적으로 전송되었습니다!', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showNotification(message, type) {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // Add notification styles dynamically
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            bottom: 24px;
            right: 24px;
            padding: 16px 24px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 500;
            z-index: 3000;
            animation: slideIn 0.3s ease-out;
        }
        .notification.success {
            background: #1a4d3e;
            color: white;
        }
        .notification.error {
            background: #dc2626;
            color: white;
        }
        .notification button {
            background: none;
            border: none;
            color: inherit;
            font-size: 20px;
            cursor: pointer;
            opacity: 0.7;
        }
        .notification button:hover {
            opacity: 1;
        }
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(notificationStyles);
}

/* ===== Counter Animation ===== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.dataset.target);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));

    function animateCounter(element, target) {
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        const hasDecimal = target % 1 !== 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            let current = start + (target - start) * easeOut;

            if (hasDecimal) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current);
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = hasDecimal ? target.toFixed(1) : target;
            }
        }

        requestAnimationFrame(update);
    }
}

/* ===== Smooth Scroll ===== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===== Parallax Effect (Optional) ===== */
function initParallax() {
    const hero = document.querySelector('.hero');
    const mockups = document.querySelectorAll('.mockup');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;

        if (scrolled < heroHeight) {
            mockups.forEach((mockup, index) => {
                const speed = 0.2 + (index * 0.1);
                mockup.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    });
}

/* ===== Mouse Follower (Optional Premium Effect) ===== */
function initMouseFollower() {
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    document.body.appendChild(follower);

    const followerStyles = document.createElement('style');
    followerStyles.textContent = `
        .mouse-follower {
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(26, 77, 62, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.15s ease-out, width 0.2s, height 0.2s;
            mix-blend-mode: difference;
        }
        .mouse-follower.hover {
            width: 50px;
            height: 50px;
            background: rgba(201, 162, 39, 0.4);
        }
    `;
    document.head.appendChild(followerStyles);

    document.addEventListener('mousemove', (e) => {
        follower.style.left = e.clientX - 10 + 'px';
        follower.style.top = e.clientY - 10 + 'px';
    });

    const interactiveElements = document.querySelectorAll('a, button, .work-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('hover'));
        el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
    });
}
