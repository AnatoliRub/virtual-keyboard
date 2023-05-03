const createEl = (selector = 'div', classList = [], attributes = []) => {
    const element = document.createElement(selector);
    if (classList.length) element.classList.add(...classList);
    if (attributes.length)
        attributes.forEach((attribute) =>
            element.setAttribute(attribute[0], attribute[1])
        );

    return element;
};

const appendEl = (to, el) => {
    to.appendChild(el);
};

export { createEl, appendEl };
