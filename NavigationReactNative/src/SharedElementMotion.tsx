import { StateNavigator } from 'navigation';
import * as React from 'react';
import { Animate } from 'react-move';
import { View } from 'react-native';

class SharedElementMotion extends React.Component<any, any> {
    private animateTimeout: number;
    private animateFrame: number;
    context: {
        stateNavigator: StateNavigator,
        movingSharedElement: (url, name, style) => void,
        getSharedElements: () => any[]
    }
    constructor(props, context) {
        super(props, context);
        this.reset = this.reset.bind(this);
        this.state = {
            url: this.getStateNavigator().stateContext.url,
            sharedElements: [], animatedElements: {}, force: 1
        };
    }
    static defaultProps = {
        onAnimating: () => {},
        onAnimated: () => {},
        duration: 300,
        easing: 'easeLinear'
    }
    static contextTypes = {
        stateNavigator: React.PropTypes.object,
        movingSharedElement: React.PropTypes.func,
        getSharedElements: React.PropTypes.func
    }
    private getStateNavigator(): StateNavigator {
        return this.props.stateNavigator || this.context.stateNavigator;
    }
    componentDidMount() {
        this.getStateNavigator().onNavigate(this.reset);
    }
    componentWillUnmount() {
        this.getStateNavigator().offNavigate(this.reset);
    }
    componentWillUpdate() {
        var {sharedElements, onAnimating} = this.props;
        for (var i = 0; i < sharedElements.length; i++) {
            var {name, oldElement: old, mountedElement: mounted} = sharedElements[i];
            if (!this.state.animatedElements[name])
                onAnimating(name, old.ref, mounted.ref, old.data, mounted.data);
        }
    }
    reset() {
        this.setState(({force}) => ({sharedElements: [], animatedElements: {}, force: force + 1}));
    }
    onAnimated(name, mounted) {
        this.setState(
            ({animatedElements}) => ({animatedElements: {...animatedElements, [name]: true}}),
            () => {
                var sharedElements = this.context.getSharedElements();
                var {oldElement: old = undefined} = sharedElements.filter(element => element.name === name)[0] || {};
                this.context.movingSharedElement(this.state.url, name, null);
                this.props.onAnimated(name, old && old.ref, mounted.ref, old && old.data, mounted.data)
            }
        );
    }
    getStyle(name, {measurements, data, style}, start = false) {
        if (start && style)
            return style;
        return this.props.elementStyle(name, {...measurements, ...data});
    }
    render() {
        var {sharedElements, style, duration, easing} = this.props;
        var {url, animatedElements, force} = this.state;
        return (sharedElements.length > Object.keys(animatedElements).length &&
            <View style={style}>
                {sharedElements.map(({name, oldElement: old, mountedElement: mounted}) => (
                    <Animate
                        key={name}
                        duration={duration} easing={easing} immutable={false}
                        data={{...this.getStyle(name, mounted), __force: force}}
                        default={{...this.getStyle(name, old, true), __force: 0}}
                        onRest={() => {this.onAnimated(name, mounted)}}>
                        {({__force, ...tweenStyle}) => {
                            this.context.movingSharedElement(url, name, tweenStyle);
                            return this.props.children(tweenStyle, name, old.data, mounted.data)
                        }}
                    </Animate>
                ))}
            </View>
        );
    }
}

export default SharedElementMotion;
