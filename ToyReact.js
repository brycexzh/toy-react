class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type)
    }

    setAttribute(name, value) {
        if(name.match(/^on([\s\S]+)$/)) {
            //console.log(RegExp.$1);
            //this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/, s => s.toLowerCase()), value);
            let eventName = RegExp.$1.replace(/^[\s\S]/, s => s.toLowerCase());
            this.root.addEventListener(eventName, value);
        }
        if(name === "className")
            name = "class";
        this.root.setAttribute(name, value)
    }

    appendChild(vchild) {
        vchild.mountTo(this.root);
    }

    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

class TextWrapper {
    constructor(type) {
        this.root = document.createTextNode(type)
    }

    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

export class Component {
    constructor() {
        this.children = [];
        this.props = Object.create(null);
    }

    setAttribute(name, value) {

        this.props[name] = value;
        this[name] = value;
    }

    mountTo(parent) {
        let vdom = this.render();
        vdom.mountTo(parent);
    }

    appendChild(vchild) {
        this.children.push(vchild);
    }

    setState(state) {
        let merge =(oldState, newState) => {
            for (let p in newState) {
                if (typeof newState[p] === "object") {
                    if (typeof oldState[p] !== "object") {
                        oldState[p] = {};
                    }
                    merge(oldState[p], newState[p]);

                } else {
                    oldState[p] = newState[p];
                }
            }
        }
        if (!this.state && state)
            this.state = {};
        merge(this.state, state);
        console.log(this.state);
    }

}

export let ToyReact = {
    createElement(type, attributes, ...children) {
        let element;
        if (typeof type === "string")
            element = new ElementWrapper(type);
        else
            element = new type;

        for (let name in attributes) {
            //element[name] = attributes[name]; wrong!!!
            element.setAttribute(name, attributes[name]);
        }

        let insertChildren = (children) => {
            for (let child of children) {
                if (typeof child === "object" && child instanceof Array) {
                    insertChildren(child)
                } else {
                    if (!(child instanceof Component)
                    && !(child instanceof TextWrapper)
                    && !(child instanceof ElementWrapper))
                        child = String(child);
                    if (typeof child === "string")
                        child = new TextWrapper(child);
                    element.appendChild(child)
                }
            }
        }
        insertChildren(children);

        return element;
    },

    render(vdom, element) {
        vdom.mountTo(element);
    }
}