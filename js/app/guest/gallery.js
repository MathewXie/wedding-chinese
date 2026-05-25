export const gallery = (() => {

    const GALLERY_PATH = './assets/gallery/';

    /**
     * @param {string[]} images
     * @returns {HTMLDivElement}
     */
    const buildCarousel = (images) => {
        const id = 'carousel-gallery';
        const wrapper = document.createElement('div');
        wrapper.id = id;
        wrapper.className = 'carousel slide mt-4';
        wrapper.setAttribute('data-aos', 'fade-up');
        wrapper.setAttribute('data-aos-duration', '1500');
        wrapper.setAttribute('data-bs-ride', 'carousel');

        const indicators = document.createElement('div');
        indicators.className = 'carousel-indicators';

        const inner = document.createElement('div');
        inner.className = 'carousel-inner rounded-4';

        images.forEach((file, i) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.setAttribute('data-bs-target', `#${id}`);
            btn.setAttribute('data-bs-slide-to', String(i));
            btn.setAttribute('aria-label', `Slide ${i + 1}`);
            if (i === 0) {
                btn.classList.add('active');
                btn.setAttribute('aria-current', 'true');
            }
            indicators.appendChild(btn);

            const item = document.createElement('div');
            item.className = i === 0 ? 'carousel-item active' : 'carousel-item';

            const img = document.createElement('img');
            img.src = './assets/images/placeholder.webp';
            img.setAttribute('data-src', GALLERY_PATH + encodeURIComponent(file));
            img.alt = `image ${i + 1}`;
            img.className = 'd-block img-fluid cursor-pointer';
            img.addEventListener('click', () => {
                if (window.undangan && window.undangan.guest) {
                    window.undangan.guest.modal(img);
                }
            });

            item.appendChild(img);
            inner.appendChild(item);
        });

        wrapper.appendChild(indicators);
        wrapper.appendChild(inner);

        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-control-prev';
        prevBtn.type = 'button';
        prevBtn.setAttribute('data-bs-target', `#${id}`);
        prevBtn.setAttribute('data-bs-slide', 'prev');
        prevBtn.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-control-next';
        nextBtn.type = 'button';
        nextBtn.setAttribute('data-bs-target', `#${id}`);
        nextBtn.setAttribute('data-bs-slide', 'next');
        nextBtn.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>';

        wrapper.appendChild(prevBtn);
        wrapper.appendChild(nextBtn);

        return wrapper;
    };

    /**
     * @returns {Promise<boolean>}
     */
    const init = async () => {
        const container = document.getElementById('gallery-container');
        if (!container) {
            return false;
        }

        let files;
        try {
            const res = await fetch(GALLERY_PATH + 'gallery.json');
            if (!res.ok) {
                return false;
            }
            files = await res.json();
        } catch {
            return false;
        }

        if (!files || files.length === 0) {
            const section = document.getElementById('gallery');
            if (section) {
                section.remove();
            }
            return false;
        }

        container.appendChild(buildCarousel(files));

        return true;
    };

    return {
        init,
    };
})();
