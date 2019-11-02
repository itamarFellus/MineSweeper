import React from 'react';

export default class App extends React.Component {

    render() {
        if (this.props.numberOfPlayers < 2) {
            setTimeout(() => this.props.callForGame(), 2000);
        }
        return (
            <div>waiting for players</div>
        )
    }
}