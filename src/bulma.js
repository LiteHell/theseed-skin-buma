import bulmaClassnames from "./bulmaClassnames";

export default function (classes, mirror = false) {
    let modified = [];
    let unmodifeid = [];
    if (typeof classes === 'string')
        unmodified = classes.split(' ');
    else if (typeof classes === 'object')
        unmodifeid = Object.entries(classes).filter(([k, v]) => Boolean(v)).map(([k, v]) => k);
    else if (typeof classes === 'array')
        unmodifeid = classes;
    else
        throw new Error('Unexcepted parameter into bulma function')

    if (mirror)
        modified = unmodified.concat(unmodified.filter(i => Object.keys(bulmaClassnames).includes(i)).map(i => bulmaClassnames[i]));
    else
        modified = unmodified.map(i => bulmaClassnames[i] || i);
    return modified;
}