// ... the starter code you pasted ...

const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        if (this.state.liked) {
            return 'You like this!  You really, really like this!!!';
        }
    
    return e(
        'button',
        { onClick: () => this.setState({ liked: true }) },
        'Like This'
    );
    }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
