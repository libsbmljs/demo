import React from "react"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"

import {Treebeard} from 'react-treebeard'

import "assets/css/material-dashboard-react.css"

const styles = {
  disabled: {
    opacity: "0.75"
  },
};

class TreeView extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    this.onToggle = this.onToggle.bind(this)
    this.data = {
      name: 'root',
      toggled: true,
      children: [
        {
          name: 'child',
          children: [
            {
              name: 'grandchild1',
              children: []
            }
          ],
        }
      ],
    }
  }

  onToggle(node, toggled){
    console.log('onToggle', toggled)
    if(this.state.cursor) {
      this.state.cursor.active = false
    }
    node.active = true
    // https://github.com/storybooks/react-treebeard/issues/58
    let new_data = this.state.data
    if(node.children) {
      node.toggled = toggled
      new_data = Object.assign({}, this.state.data)
    }
    this.setState({ cursor: node, data: new_data })
  }

  render() {
    // https://github.com/storybooks/react-treebeard/issues/148
    return (
      <Treebeard
        data={this.data}
        onToggle={this.onToggle}
      />
    )
  }
}

// export default withStyles(styles)(TreeView)
export default TreeView
