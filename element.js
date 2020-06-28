function createSVGElement(type, data) {
  var element = document.createElementNS("http://www.w3.org/2000/svg", type);
  if (data) {
    if(data.parent) {
      data.parent.appendChild(element);
    }
    if(data.content) {
      element.innerHTML = data.content;
    }
    for (var key in data.attributes) {
      element.setAttribute(key, data.attributes[key]);
    }
  }
  return element;
}

function createElement(type, data) {
  var element = document.createElement(type);
  if (data) {
    if(data.parent) {
      data.parent.appendChild(element);
    }
    if(data.content) {
      element.innerHTML = data.content;
    }
    if(data.class) {
      element.classList.add(data.class);
    }
    for (var key in data.attributes) {
      element.setAttribute(key, data.attributes[key]);
    }
    for (var key in data.styles) {
      element.style[key] = data.styles[key];
    }
  }
  return element;
}

// maybe an update function