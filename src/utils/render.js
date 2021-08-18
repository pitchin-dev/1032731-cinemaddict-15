import AbstractView from '../view/abstract';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const renderElement = (container, child, place) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (child instanceof AbstractView) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

export const replaceComponent = (newChild, oldChild) => {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Cannot replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const removeComponent = (component) => {
  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};
