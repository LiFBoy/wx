'use strict'
import React from 'react';
import ChildComponet from './ChildComponet'
class Ldemo extends React.Component{
    constructor(){
        super();
        this.state={
            name:'111'
        }
    }

    static defaultProps={
        name2:'111'
    }




    componentWillMount(){
        this.setState({
            name:'李建彬'
        });


        //console.log('willM')
    }
    componentDidMount(){
       // console.log('DidM')
    }

    shouldComponentUpdate(nextProps, nextState) {
        // debugger;
        //
        // console.error(this.props);
        // console.error(nextProps);
        // console.error(this.state);//没click之前 李建彬
        // console.error(nextState);// click之后    李建彬222
        return true;
   // return nextProps.id !== this.props.id;
}

    componentWillUpdate(){
      //  console.log('willU')
    }
    componentDidUpdate(preProps,prestate){
        // debugger;
        // console.error(this.props);
        // console.error(preProps);
        // console.error(this.state);//click之后 李建彬222
        // console.error(prestate);//没click之前 李建彬
        // console.log('DidU')
    }

    btn(){
        this.setState({
            name:'李建22222'
        })

    }


    render(){
       // console.log('rendeer');
        return (
            <div>
                {
                    this.state.name
                }
                <button onClick={this.btn.bind(this)}>按钮</button>
                <ChildComponet name={this.state.name}/>

            </div>

        )
    }
}


export default Ldemo