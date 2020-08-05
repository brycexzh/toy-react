import {ToyReact, Component} from "./ToyReact";

class MyComponent extends Component {
    render() {
        return <div>
            <span>Hello</span>
            <span> world!</span>
            <div>
                {true}
                {this.children}
            </div>
        </div>
    }
}

let a = <MyComponent name="a" id="ida">
    <div>123</div>
</MyComponent>

ToyReact.render(
    a,
    document.body
)

console.log(a);