document.addEventListener('DOMContentLoaded', () => {
    const tagButtons    = document.querySelectorAll('.filter-tag');
    const projectCards  = document.querySelectorAll('.project-entry');
    const noResultsMsg  = document.getElementById('noResultsMsg');

    let activeTags = new Set();

    const initFromURL = () => {
        const params = new URLSearchParams(window.location.search);
        const tagsParam = params.get('tags'); // URL will end with ?tags=C,C++, we're extracting the C, C++ from here!

        if (tagsParam) {
            const urlTags = tagsParam.split(',').map(t => t.trim()).filter(Boolean);
            urlTags.forEach(t => activeTags.add(t)); // We're then splitting these about the ",", and putting them into the activeTags set!
        }
        if (activeTags.size === 0) {
            activeTags.add('all');
        } // If nothing is present in the activeTags set, then we put "all" into it - a default state!
    };

    const syncButtons = () => {
        tagButtons.forEach(btn => {
            const tag = btn.dataset.tag;
            if (activeTags.has(tag)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            } // We check if current tag is present in the activeTags set, if it is, then highlight it, else don't!
        });
    };

    const applyFilter = () => {
        const showAll = activeTags.has('all');
        let visibleCount = 0;

        projectCards.forEach(card => {
            const cardTags = card.dataset.tags.split(',').map(t => t.trim());

            const isVisible = showAll ||
                [...activeTags].some(active => cardTags.includes(active)); // If the current tag is "all", or any of the tags from the set match the card tag, then we can display this project card, else not!

            if (isVisible) {
                card.removeAttribute('data-hidden');
                visibleCount++; 
            } else {
                card.setAttribute('data-hidden', 'true');
            } // Based on the isVisible value, display the project card or make it hidden! 
        });

        if (noResultsMsg) {
            if (visibleCount === 0) {
                noResultsMsg.classList.add('visible');
            } else {
                noResultsMsg.classList.remove('visible');
            }
        } // If none match, print the message no results!
    };

    const updateURL = () => {
        const url = new URL(window.location.href);

        if (activeTags.has('all') || activeTags.size === 0) {
            url.searchParams.delete('tags');
        } else {
            url.searchParams.set('tags', [...activeTags].join(','));
        }

        history.pushState({ tags: [...activeTags] }, '', url.toString()); // Updates URL without reloading the page, and stores state just incase user pressed forward/backward!
    }; // We're now updating the URL, after / it includes "?tags=C,C++" say!

    tagButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tag = btn.dataset.tag;

            if (tag === 'all') {
                activeTags.clear();
                activeTags.add('all');
            } else {
                activeTags.delete('all');

                if (activeTags.has(tag)) {
                    activeTags.delete(tag);
                    if (activeTags.size === 0) activeTags.add('all');
                } else {
                    activeTags.add(tag);
                }
            } // If "all" is clicked, set is cleared and only "all" is put into the set. If a tag is clicked and the tag is already present in the set, remove it, else add it to the set!

            syncButtons();
            applyFilter();
            updateURL(); 
        });
    });

    window.addEventListener('popstate', (event) => {
        activeTags = new Set(event.state?.tags || ['all']);
        syncButtons();
        applyFilter();
    }); // When user presses forward/backward, restore previous filter state!

    initFromURL();
    syncButtons();
    applyFilter();
});
