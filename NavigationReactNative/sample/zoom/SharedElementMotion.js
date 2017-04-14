import * as React from 'react';
import { Motion } from 'react-motion';
import { Modal } from 'react-native';

class SharedElementMotion extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            url: this.getStateNavigator().stateContext.url,
            sharedElements: this.context.getSharedElements(),
            animatedCount: 0,
        };
    }
    static contextTypes = {
        stateNavigator: React.PropTypes.object,
        getSharedElements: React.PropTypes.func
    }
    getStateNavigator() {
        return this.props.stateNavigator || this.context.stateNavigator;
    }
    componentWillReceiveProps() {
        if (this.state.url === this.getStateNavigator().stateContext.url) {
            this.setState(({sharedElements: prevSharedElements, animatedCount}) => {
                var {onAnimating, onAnimated} = this.props;
                var sharedElements = this.context.getSharedElements();
                for(var i = 0; i < sharedElements.length && sharedElements.length !== animatedCount && onAnimating; i++) {
                    var {name, oldElement: old, mountedElement: mounted} = sharedElements[i];
                    onAnimating(name, old.ref, mounted.ref, old.data, mounted.data);
                }
                if (sharedElements.length === 0 && prevSharedElements.length > 0) {
                    for(var i = 0; i < prevSharedElements.length && onAnimated; i++) {
                        var {name, mountedElement: mounted} = prevSharedElements[i];
                        onAnimated(name, null, mounted.ref, null, mounted.data);
                    }                
                }
                return {sharedElements};
            });
        }
    }
    stripStyle(style) {
        var newStyle = {};
        for(var key in style) {
            newStyle[key] = style[key].val;
        }
        return newStyle;
    }
    render() {
        var {children, elementStyle, onAnimated = () => {}} = this.props;
        var {url, sharedElements} = this.state;
        return (url === this.getStateNavigator().stateContext.url &&
            <Modal
                transparent={true}
                animationType="none"
                onRequestClose={() => {}}
                supportedOrientations={['portrait', 'landscape', 'landscape-left', 'landscape-right']}
                visible={sharedElements.length !== 0 && sharedElements.length !== this.state.animatedCount}>
                {sharedElements.map(({name, oldElement: old, mountedElement: mounted}) => (
                    <Motion
                        key={name}
                        onRest={() => {
                            onAnimated(name, old.ref, mounted.ref, old.data, mounted.data);
                            this.setState(({animatedCount}) => ({animatedCount: animatedCount + 1}));
                        }}
                        defaultStyle={this.stripStyle(elementStyle(name, {...old.measurements, ...old.data}))}
                        style={elementStyle(name, {...mounted.measurements, ...mounted.data})}>
                        {tweenStyle => children(tweenStyle, name, old.data, mounted.data)}
                    </Motion>
                ))}
            </Modal>
        );
    }
}

export default SharedElementMotion;
