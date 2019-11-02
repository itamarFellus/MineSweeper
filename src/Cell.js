import React from 'react';


export default class Cell extends React.Component {

    uncover() {
        this.props.getUpdatedUITable(this.props.columnNumber, this.props.rowNumber);
    }

    render() {
        if (this.props.value === "") {
            return (
                <div id='cell' onClick={() => this.uncover()}>
                    {this.props.value}
                </div>
            )
        } else if (this.props.value === '-') {
            return (
                <div className='uncoveredCell'>
                    {''}
                </div>
            )
        } else if (this.props.value === 'RF') {
            return (
                <div className='uncoveredCell' id='redMine'>
                    X
                </div>
            )
        } else if (this.props.value === 'BF') {
            return (
                <div className='uncoveredCell' id='blueMine'>
                    X
                </div>
            )
        } else {
            return (
                <div className='uncoveredCell'>
                    {this.props.value}
                </div>
            )
        }
    }
}
