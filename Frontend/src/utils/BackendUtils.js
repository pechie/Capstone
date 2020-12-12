export default class BackendUtils {
    //changes string to Uppercase and replaces underscore with space 
    static createReadableName(str) {
        var i, frags = str.split('_');
        for (i = 0; i < frags.length; i++) {
            frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
        }
        return frags.join(' ');
    }
}