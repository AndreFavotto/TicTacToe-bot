// code that transforms array into understandable string
function parseList(list) {
  let str = "";
  for (let element of list) {
    index = list.indexOf(element);
    if (index != list.length - 2) //not the anti-last element
      str = `${str}${element}, `;
    else
      return `You are carrying ${str}${element} and ${list[index+1]}.`;
  }
}

items = ["apples", "bananas", "oranges", "grapes", "strawberries", "pineapples"];

console.log(parseList(items));

