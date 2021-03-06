import React, { Component } from 'react'
import { kea, connect } from 'kea'
import PropTypes from 'prop-types'

// create a dynamic logic store
const mainLogic = kea({
  key: (props) => props.id,
  path: (key) => ['scenes', 'main', key],
  actions: () => ({
    doit: true
  }),
  reducers: ({ actions }) => ({
    done: [false, PropTypes.bool, {
      [actions.doit]: () => true
    }]
  })
})

// wrap it around a component
@mainLogic
class Form extends Component {
  render () {
    return <div>id: {this.props.id}, done: {this.props.done ? 'true' : 'false'}</div>
  }
}

// create another helper that wants data from this dynamic logic store
@connect({
  actions: [
    mainLogic, [
      'doit'
    ]
  ],
  props: [
    mainLogic.withKey(params => params.id), [
      'done'
    ]
  ]
})
class FormHelper extends Component {
  render () {
    return (
      <div>
        <p>helper id: {this.props.id}, done: {this.props.done ? 'true' : 'false'}</p>
        <p><button onClick={this.actions.doit}>Do it!</button></p>
      </div>
    )
  }
}

// main demo
export default class Demo extends Component {
  render () {
    return (
      <div>
        <Form id={123} />
        <FormHelper id={123} />
      </div>
    )
  }
}
