'use strict'
import React from 'react';

class ChildComponet extends React.Component{
    constructor(){
        super();
    }

    static defaultProps={
        name2:'111'
    }




    componentWillMount(){

        console.log('willM')
    }
    componentDidMount(){
        console.log('DidM')
    }


    componentWillReceiveProps(nextProps){
        debugger;
        console.log(nextProps===this.props);
        console.log(nextProps)
        console.log(this.props)

    }



    shouldComponentUpdate(nextProps, nextState) {
        debugger;

        console.error(this.props);
        console.error(nextProps);
        console.error(this.state);//没click之前 李建彬
        console.error(nextState);// click之后    李建彬222
        return true;
        // return nextProps.id !== this.props.id;
    }

    componentWillUpdate(){
        console.log('willU')
    }
    componentDidUpdate(preProps,prestate){
        debugger;
        console.error(this.props);
        console.error(preProps);
        console.error(this.state);//click之后 李建彬222
        console.error(prestate);//没click之前 李建彬
        console.log('DidU')
    }
    //
    // btn(){
    //     this.setState({
    //         name:'李建22222'
    //     })
    //
    // }


    render(){
        console.log('rendeer');
        return (
            <div>
                {
                    this.props.name
                }
                {/*{*/}
                    {/*this.state.name*/}
                {/*}*/}
                {/*<button onClick={this.btn.bind(this)}>按钮</button>*/}

            </div>

        )
    }
}


export default ChildComponet