import React from 'react'
import Relay from 'react-relay'
import {debounce} from 'lodash'

import Link from './link'
import CreateLinkMutation from '../mutations/CreateLinkMutation';

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.search = debounce(this.search, 300)
    this.presearch = (e) => {
      this.search(e.target.value)
    }
  }

  search(query) {
    this.props.relay.setVariables({ query })
  }

  setLimit(e) {
    let limit = Number(e.target.value);
    this.props.relay.setVariables({limit});
  }

  handleSubmit(e) {
    e.preventDefault();

    Relay.Store.update(
      new CreateLinkMutation({
        title: this.refs.newTitle.value,
        url: this.refs.newUrl.value,
        store: this.props.store
      })
    );

    this.refs.newTitle.value = "";
    this.refs.newUrl.value = "";
  }

  render() {

    let content = this.props.store.linkConnection.edges.map(edge => {
      return <Link key={edge.node.id} link={edge.node}/>
    })

    return (
      <div>
        <h3>Links</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placedholder="Title" ref="newTitle" />
          <input type="text" placedholder="Url" ref="newUrl" />
          <button type="submit">Add</button>
        </form>
        Showing: &nbsp;
        <input type="search" placedholder="search" onChange={ this.presearch } />
        <select onChange={this.setLimit}
            defaultValue={this.props.relay.variables.limit}>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <ul>
          {content}
        </ul>
      </div>
    )
  }
}

Main = Relay.createContainer(Main, {
  initialVariables: {
    limit: 20,
    query: ''
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        id,
        linkConnection(first: $limit, query: $query) {
          edges {
            node {
              id,
              ${Link.getFragment('link')}
            }
          }
        }
      }
    `
  }
})

export default Main
