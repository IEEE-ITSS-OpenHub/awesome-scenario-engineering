export function getTextColor(stringInput: string) {
    let stringUniqueHash = stringInput.split("").reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return `hsl(${stringUniqueHash % 360}, 45%, 45%)`;
}