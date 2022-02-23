import React, { Component } from 'react'

export default class homeInnerTest extends Component {

  render() {
    const {name} = this.props.testInfo
    return (
      <div>{name}</div>
    )
  }
}
