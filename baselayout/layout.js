async function loadLayoutParts() {
    //looks for components with class fromLayout
    const headerEl = document.querySelector('header.fromLayout');
    const asideEl = document.querySelector('aside.fromLayout');
    const footerEl = document.querySelector('footer.fromLayout');

    //gets gets base layout files
    try {
        const [header, aside, footer] = await Promise.all([
            fetch('/baselayout/header.html').then(res => res.text()),
            fetch('/baselayout/sidebar.html').then(res => res.text()),
            fetch('/baselayout/footer.html').then(res => res.text()),
        ]);

        //sets previous components using base layout files
        if (headerEl) headerEl.innerHTML = header;
        if (asideEl) asideEl.innerHTML = aside;
        if (footerEl) footerEl.innerHTML = footer;
    } catch (err) {
        console.error('Error loading layout parts:', err);
    }
}

window.addEventListener('DOMContentLoaded', loadLayoutParts);