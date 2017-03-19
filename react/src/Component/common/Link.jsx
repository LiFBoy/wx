'use strict';

import React from 'react';

import Cs from 'classnames'
class Link extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props)
    }


    go(){
        this.context.router.push(this.props.to)
    }

    render() {


        return (
           <div onClick={this.go.bind(this)} className={this.props.className}>
               {this.props.children}
           </div>
        )
    }
}


export default  Link;