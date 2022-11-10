import bulmaClassnames from "./bulmaClassnames";

module.exports = (classes) => {
    let modified = [];
    if (typeof classes === 'string')
        modified = classes.split(' ').map(i => bulmaClassnames[i] || i);
    else if (typeof classes === 'object')
        modified = Object.entries(classes).filter(([k, v]) => Boolean(v)).map(([k, v]) => k);
    else if (typeof classes === 'array')
        modified = classes;
    else
        throw new Error('Unexcepted parameter into bulma function')
    modified = modified.map(i => bulmaClassnames[i] || i);
    return modified;
}