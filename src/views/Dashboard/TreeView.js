import React from "react"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"

import {Treebeard} from 'react-treebeard'

import "assets/css/material-dashboard-react.css"

const style = {
  tree: {
      base: {
          listStyle: 'none',
          backgroundColor: 'white',
          margin: 0,
          padding: 0,
          color: 'rgb(85, 85, 85)',
          fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
          fontSize: '14px'
      },
      node: {
          container: {
              link: {
                cursor: 'pointer', position: 'relative', padding: '0px 5px', display: 'block'
              },
              activeLink: {
                background: '#31363F'
              }
          },
          base: {
              position: 'relative'
          },
          link: {
              cursor: 'pointer',
              position: 'relative',
              padding: '0px 5px',
              display: 'block'
          },
          activeLink: {
              background: '#31363F'
          },
          toggle: {
              base: {
                  position: 'relative',
                  display: 'inline-block',
                  verticalAlign: 'top',
                  marginLeft: '-5px',
                  height: '24px',
                  width: '24px'
              },
              wrapper: {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  margin: '-7px 0 0 -7px',
                  height: '14px'
              },
              height: 10,
              width: 10,
              arrow: {
                  fill: 'rgb(85, 85, 85)',
                  strokeWidth: 0
              }
          },
          header: {
              base: {
                  display: 'inline-block',
                  verticalAlign: 'top',
                  color: 'rgb(85, 85, 85)'
              },
              connector: {
                  width: '2px',
                  height: '12px',
                  borderLeft: 'solid 2px black',
                  borderBottom: 'solid 2px black',
                  position: 'absolute',
                  top: '0px',
                  left: '-21px'
              },
              title: {
                  lineHeight: '24px',
                  verticalAlign: 'middle'
              }
          },
          subtree: {
              listStyle: 'none',
              paddingLeft: '19px'
          },
          loading: {
              color: '#E2C089'
          }
      }
  }
};

class TreeView extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    this.onToggle = this.onToggle.bind(this)
    this.data = props.data
  }

  onToggle(node, toggled){
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
        style={style}
      />
    )
  }
}

// export default withStyles(styles)(TreeView)
export default TreeView
