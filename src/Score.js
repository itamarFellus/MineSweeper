import React from 'react';

export default class Score extends React.Component {

    render() {
        if(this.props.isRedTurn) {           
            return (
                <div id='score'>
                    <div className='player' id='redPlayerTurn'>
                        <div className='playerScore'>
                            {this.props.redScore}
                        </div>
                        I will win!
                    </div>
                    <div id="scoreBoard">
                        <div id='scoreNumer'>
                            {this.props.score}
                        </div>
                    </ div>
                    <div className='player'>
                        <div className='playerScore'>
                            {this.props.blueScore}
                        </div>
                        Don't waste my time!</div>
                </div>
            )
        } else {
            return (
                <div id='score'>
                    <div className='player'>
                        <div className='playerScore'>
                            {this.props.redScore}
                        </div>
                        I will win!
                    </div>
                    <div id="scoreBoard">
                        <div id='scoreNumer'>
                            {this.props.score}
                        </div>
                    </ div>
                    <div className='player' id='bluePlayerTurn'>
                        <div className='playerScore'>
                            {this.props.blueScore}
                        </div>
                        Don't waste my time!
                    </div>
                </div>
            )
        }
    }
}