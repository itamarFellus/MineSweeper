import React from 'react';
import Cell from './Cell';

export default class RenderBoard extends React.Component {

  renderBoard() { // for each column render row
    return this.props.UITable.map((column, index) => this.renderRow(column, index));
  }

  renderRow(column, columnNumber) {
    return (<div id='column' key={columnNumber + 100} >
      {column.map((cell, rowNumber) => {
        return <Cell key={rowNumber} columnNumber={columnNumber} rowNumber={rowNumber} value={cell} getUpdatedUITable={this.props.getUpdatedUITable} />
        })
      }

    </div>)
  }

  render() {
    return (
      <div id='board'>
        {this.renderBoard()}
      </div>
    )
  }
}