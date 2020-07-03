export function createSVGElement(type, data) {
  var element = document.createElementNS("http://www.w3.org/2000/svg", type);
  if (data) {
    if (data.parent) {
      data.parent.appendChild(element);
    }
    if (data.content) {
      element.innerHTML = data.content;
    }
    for (var key in data.attributes) {
      element.setAttribute(key, data.attributes[key]);
    }
  }
  return element;
}

export function createElement(type, data) {
  var element = document.createElement(type);
  if (data) {
    if (data.parent) {
      data.parent.appendChild(element);
    }
    if (data.content) {
      element.innerHTML = data.content;
    }
    if (data.class) {
      element.classList.add(data.class);
    }
    for (var attr in data.attributes) {
      element.setAttribute(attr, data.attributes[attr]);
    }
    for (var prop in data.styles) {
      element.style[prop] = data.styles[prop];
    }
  }
  return element;
}

// maybe an update function
