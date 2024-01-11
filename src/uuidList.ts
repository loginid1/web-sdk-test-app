interface List {
  [key: string]: HTMLElement;
}

class UUIDList {
  private uuidListElm = document.querySelector(".uuids");
  private list: List = {};

  private createElement = (tagName: string, classes: string[] = []) => {
    const elm = document.createElement(tagName);
    classes.forEach((className) => elm.classList.add(className));
    return elm;
  };

  public add = (id: string) => {
    if (this.list[id]) return;
    const elm = this.createElement("div", ["uuid"]);
    elm.textContent = id;
    this.uuidListElm.appendChild(elm);
    this.list[id] = elm;
  };

  public remove = (id: string) => {
    if (!this.list[id]) return;
    this.list[id].remove();
    delete this.list[id];
  };

  public clear = () => {
    Object.keys(this.list).forEach((id) => this.remove(id));
  };
}

export default UUIDList;
