const colors = [
    '#2E86AB',
    '#7A9E7E',
    '#BE7C4D',
    '#A17C6B',
    '#7B506F',
    '#CF5C36',
    '#4C6085',
    '#8E9B90',
    '#D4A373',
    '#557B83',
    '#B56576',
    '#6D597A',
    '#E56B6F',
    '#355070',
    '#B56B45',
];

export function getRandomColor(opacity = .75) {
  return colors[Math.floor(Math.random() * colors.length)];


}