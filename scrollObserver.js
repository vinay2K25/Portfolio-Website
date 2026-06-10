document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.scroll-animate');
    if (!targets.length) return; // Exit early if no elements have the scroll-animate class, to avoid any errors!

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
        targets.forEach(el => el.classList.add('in-view'));
        return;
    } // If the user prefers reduced motion, then directly bring all elements with scroll-animate class into view, so avoid the scrolling animation entirely!

    // "entry.isIntersecting" checks if an element is currently visible in the view-port!
    // "entry.target" simply refers to the elements being observed!
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); // Bringing an element into view, and marking it so that the animation isn't performed again for this element, this improves performance! The element is animated again only when the page is refreshed!
                }
            });
        },
        { threshold: 0.15 } // Trigger this function only when 15% of the element is visible!
    );

    targets.forEach(el => observer.observe(el)); // Finally, register each element with the observer!
});
