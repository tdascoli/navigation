import { StateNavigator } from 'navigation';
import { NavigationContext, NavigationHandler } from 'navigation-react';
import { addNavigateHandlers, Scene, RightBarIOS, BarButtonIOS } from 'navigation-react-native';
import * as React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

const stateNavigator: StateNavigator = new StateNavigator([
    { key: 'people', title: 'People' },
    { key: 'person', title: 'Person', trackCrumbTrail: true }
]);

var People = () => (
    <NavigationContext.Consumer>
        {({stateNavigator}) => (
            <View>
                {['Bob', 'Brenda'].map(name => (
                    <TouchableHighlight
                        onPress={() => {
                            stateNavigator.navigate('person', {name});
                    }}>
                        <Text>{name}</Text>
                    </TouchableHighlight>
                ))}
            </View>
        )}
    </NavigationContext.Consumer>
);

var Person = ({ name }) => (
    <NavigationContext.Consumer>
        {({stateNavigator}) => (
            <View>
                <RightBarIOS>
                    <BarButtonIOS systemItem="cancel" onPress={() => {
                        stateNavigator.navigateBack(1)
                    }} />
                </RightBarIOS>
                <Text>{name}</Text>
            </View>
        )}
    </NavigationContext.Consumer>
);

var { people, person } = stateNavigator.states;
people.renderScene = () => <People />;
person.renderScene = ({ name }) => <Person name={name}/>;

addNavigateHandlers(stateNavigator);

var App = ({crumb}) => (
    <NavigationHandler stateNavigator={stateNavigator}>
      <Scene crumb={crumb} />
    </NavigationHandler>
  );
