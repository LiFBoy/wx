'use strict';

import React from 'react';

import Cs from 'classnames'
class model extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const modelConfig=this.props.modelConfig;

        const classname=Cs('model_content',{'app-padding-lr40':!!this.props.modelConfig.model_content})

       // const style=!!this.props.model_content?this.props.model_content:''

      //  const {flag,config} =this.props;

        return (
            <div>
            {
                !!this.props.flag?<div>

                        <div className="model_zindex"></div>


                        <div className={classname}>

                                {
                                    modelConfig.header
                                }



                                {
                                    modelConfig.content
                                }


                                {
                                    modelConfig.footer
                                }

                        </div>

                    </div>:''
            }

            </div>
        )
    }
}


export default  model;