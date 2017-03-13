'use strict';
import React, { Component, PropTypes } from 'react';
import Flipsnap from './flipsnap';

import '../less/swiper.css'

class ReactSwipes extends Component {
    static propTypes = {
        swipeOptions: PropTypes.shape({
            distance: PropTypes.number,
            // continuous: PropTypes.bool,
            swTouchstart: PropTypes.func,
            swTouchmove: PropTypes.func,
            swTouchend: PropTypes.func
        }),
        // style: PropTypes.shape({
        //   container: PropTypes.object,
        //   wrapper: PropTypes.object,
        //   child: PropTypes.object
        // }),
        // id: PropTypes.string,
        // className: PropTypes.string
    };

    static defaultProps = {
        swipeOptions: {},
        style: {

            wrapper: {
                // overflow: 'hidden',
                // position: 'relative',
                boxSizing: 'border-box'
            },

            child: {
                // float: 'left',
                // width: '100%',
                // position: 'relative',
                // transitionProperty: 'transform'
            }
        },
        className: ''
    };

    componentDidMount() {
        const { options, children } = this.props;
        let len = children.length;
        this.swipes = Flipsnap(this.refs.container, {
            distance: options.distance
        });

        // 各个阶段事件监听
        this.swipes.element.addEventListener('fstouchstart', function(ev) {

            console.log('start')
            console.log(ev)

            options.swTouchstart && options.swTouchstart(ev);
        }, false);

        this.swipes.element.addEventListener('fstouchmove', function(ev) {
            console.log('move');
            console.log(ev)
            options.swTouchmove && options.swTouchmove(ev);
        }, false);

        this.swipes.element.addEventListener('fstouchend', ev => {
            console.log('end');
            options.swTouchend && options.swTouchend(ev);
        }, false);

    }

    // 注销
    componentWillUnmount() {
        this.swipes.destroy();
    }

    refresh() {
        alert('refresh');
        this.swipes.refresh();
    }

    render() {
        const { id, className, style, children } = this.props;

        console.log(className)
        // todo 计算 父级包裹元素的宽度
        return (
            <div style={style.wrapper} className={className} ref="container">
                {/*复制子节点*/}
                {React.Children.map(children, (child) => {
                    // return React.cloneElement(child, {style: style.child});
                    return React.cloneElement(child);
                })}
            </div>
        );
    }
}

export default ReactSwipes;