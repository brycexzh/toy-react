import {ToyReact, Component} from "./ToyReact";

class Square extends Component {
    render() {
        return (
            <button className="square">
                {this.props.value}
            </button>
        );
    }
}

class Board extends Component {
    renderSquare(i) {
        return <Square value={i} />
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

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

let a = <Board/>

ToyReact.render(
    a,
    document.body
)

console.log(a);