import * as assert from 'assert';
import * as mocha from 'mocha';
import { StateNavigator } from '../../Navigation/src/Navigation';
import { NavigationLink, NavigationHandler } from '../src/NavigationReact';
import * as React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

configure({ adapter: new Adapter() });
var { window } = new JSDOM('<!doctype html><html><body></body></html>');
window.addEventListener = () => {};
(global as any).window = window;
(global as any).document = window.document;

describe('NavigationLinkTest', function () {
    describe('Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Props Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var wrapper = mount(
                <NavigationLink
                    stateKey="s"
                    stateNavigator={stateNavigator}>
                    link text
                </NavigationLink>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Invalid Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="x">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Attributes Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 'a'}}
                        includeCurrentData={true}
                        currentDataKeys="y"
                        activeCssClass="active"
                        disableActive={true}
                        acrossCrumbs={false}
                        historyAction='replace'
                        navigating={() => false}
                        aria-label="z"
                        target="_blank">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=a');
            assert.equal(link.prop('children'), 'link text');
            assert.notEqual(link.prop('onClick'), null);
            assert.equal(link.prop('aria-label'), 'z');
            assert.equal(link.prop('target'), '_blank');
            assert.equal(Object.keys(link.props()).length, 5);
        })
    });

    describe('Navigation Data Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 'a'}}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=a');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Include Current Data Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {y: 'b', z: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 'a'}}
                        includeCurrentData={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?y=b&z=c&x=a');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Include Current Data Override Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {y: 'b', z: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{y: 'a'}}
                        includeCurrentData={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?y=a&z=c');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Current Data Key Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {y: 'b', z: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 'a'}}
                        currentDataKeys="y">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?y=b&x=a');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Current Data Keys Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {y: 'b', z: 'c', w: 'd'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 'a'}}
                        currentDataKeys="y,z">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?y=b&z=c&x=a');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Current Data Keys Override Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {y: 'b', z: 'c', w: 'd'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{y: 'a'}}
                        currentDataKeys="y,z">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?y=a&z=c');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Active Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b', z: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 'a', z: 'c'}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=a&z=c');
            assert.equal(link.prop('className'), 'active');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Inactive Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 'b'}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=b');
            assert.equal(link.prop('className'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Disable Active Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b', z: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 'a', z: 'c'}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Disable Inactive Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 'b'}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=b');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Null Active Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 'a', y: null}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=a');
            assert.equal(link.prop('className'), 'active');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Undefined Active Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 'a', y: undefined}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=a');
            assert.equal(link.prop('className'), 'active');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Empty String Inactive Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 'a', y: ''}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=a');
            assert.equal(link.prop('className'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Null Disable Active Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 'a', y: null}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Undefined Disable Active Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 'a', y: undefined}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Empty String Disable Inactive Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 'a', y: ''}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=a');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Active Number Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'number'} }
            ]);
            stateNavigator.navigate('s', {x: 1, y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 1}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=1');
            assert.equal(link.prop('className'), 'active');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Inactive Number Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'number'} }
            ]);
            stateNavigator.navigate('s', {x: 1, y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 2}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=2');
            assert.equal(link.prop('className'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Active Boolean Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'boolean'} }
            ]);
            stateNavigator.navigate('s', {x: true, y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: true}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=true');
            assert.equal(link.prop('className'), 'active');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Inactive Boolean Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'boolean'} }
            ]);
            stateNavigator.navigate('s', {x: true, y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: false}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=false');
            assert.equal(link.prop('className'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Active Date Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'date'} }
            ]);
            stateNavigator.navigate('s', {x: new Date(2011, 1, 3), y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: new Date(2011, 1, 3)}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=2011-02-03');
            assert.equal(link.prop('className'), 'active');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Inactive Date Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'date'} }
            ]);
            stateNavigator.navigate('s', {x: new Date(2011, 1, 3), y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: new Date(2010, 1, 3)}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=2010-02-03');
            assert.equal(link.prop('className'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Disable Active Number Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'number'} }
            ]);
            stateNavigator.navigate('s', {x: 1, y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 1}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Disable Inactive Number Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'number'} }
            ]);
            stateNavigator.navigate('s', {x: 1, y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 2}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=2');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Disable Active Boolean Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'boolean'} }
            ]);
            stateNavigator.navigate('s', {x: true, y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: true}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Disable Inactive Boolean Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'boolean'} }
            ]);
            stateNavigator.navigate('s', {x: true, y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: false}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=false');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Disable Active Date Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'date'} }
            ]);
            stateNavigator.navigate('s', {x: new Date(2011, 1, 3), y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: new Date(2011, 1, 3)}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Disable Inactive Date Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'date'} }
            ]);
            stateNavigator.navigate('s', {x: new Date(2011, 1, 3), y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: new Date(2010, 1, 3)}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=2010-02-03');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Inactive Type Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'number'} }
            ]);
            stateNavigator.navigate('s', {x: '1', y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 1}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=1');
            assert.equal(link.prop('className'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Disable Inactive Type Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'number'} }
            ]);
            stateNavigator.navigate('s', {x: '1', y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 1}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=1');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Active Array Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'stringarray'} }
            ]);
            stateNavigator.navigate('s', {x: ['a', 'b'], y: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: ['a', 'b']}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=a&x=b');
            assert.equal(link.prop('className'), 'active');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Inactive Array Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'stringarray'} }
            ]);
            stateNavigator.navigate('s', {x: ['a', 'b'], y: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: ['a', 'd']}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=a&x=d');
            assert.equal(link.prop('className'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Active Number Array Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'numberarray'} }
            ]);
            stateNavigator.navigate('s', {x: [1, 2], y: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: [1, 2]}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=1&x=2');
            assert.equal(link.prop('className'), 'active');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Inactive Number Array Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'numberarray'} }
            ]);
            stateNavigator.navigate('s', {x: [1, 2], y: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: [1, 3]}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=1&x=3');
            assert.equal(link.prop('className'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Active Boolean Array Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'booleanarray'} }
            ]);
            stateNavigator.navigate('s', {x: [true, false], y: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: [true, false]}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=true&x=false');
            assert.equal(link.prop('className'), 'active');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Inactive Boolean Array Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'booleanarray'} }
            ]);
            stateNavigator.navigate('s', {x: [true, false], y: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: [true, true]}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=true&x=true');
            assert.equal(link.prop('className'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Active Date Array Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'datearray'} }
            ]);
            stateNavigator.navigate('s', {x: [new Date(2011, 1, 3), new Date(2012, 2, 4)], y: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: [new Date(2011, 1, 3), new Date(2012, 2, 4)]}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=2011-02-03&x=2012-03-04');
            assert.equal(link.prop('className'), 'active');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Inactive Date Array Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'datearray'} }
            ]);
            stateNavigator.navigate('s', {x: [new Date(2011, 1, 3), new Date(2012, 2, 4)], y: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: [new Date(2011, 1, 3), new Date(2010, 2, 4)]}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=2011-02-03&x=2010-03-04');
            assert.equal(link.prop('className'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Disable Active Array Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'stringarray'} }
            ]);
            stateNavigator.navigate('s', {x: ['a', 'b'], y: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: ['a', 'b']}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Disable Inactive Array Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'stringarray'} }
            ]);
            stateNavigator.navigate('s', {x: ['a', 'b'], y: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: ['a', 'd']}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=a&x=d');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Disable Active Number Array Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'numberarray'} }
            ]);
            stateNavigator.navigate('s', {x: [1, 2], y: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: [1, 2]}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Disable Inactive Number Array Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'numberarray'} }
            ]);
            stateNavigator.navigate('s', {x: [1, 2], y: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: [1, 3]}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=1&x=3');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Disable Active Boolean Array Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'booleanarray'} }
            ]);
            stateNavigator.navigate('s', {x: [true, false], y: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: [true, false]}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Disable Inactive Boolean Array Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'booleanarray'} }
            ]);
            stateNavigator.navigate('s', {x: [true, false], y: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: [true, true]}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=true&x=true');
            assert.equal(link.prop('children'), 'link text');
        })
    });


    describe('Disable Active Date Array Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'datearray'} }
            ]);
            stateNavigator.navigate('s', {x: [new Date(2011, 1, 3), new Date(2012, 2, 4)], y: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: [new Date(2011, 1, 3), new Date(2012, 2, 4)]}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Disable Inactive Date Array Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'datearray'} }
            ]);
            stateNavigator.navigate('s', {x: [new Date(2011, 1, 3), new Date(2012, 2, 4)], y: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: [new Date(2011, 1, 3), new Date(2010, 2, 4)]}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=2011-02-03&x=2010-03-04');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Inactive Array Length Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'stringarray'} }
            ]);
            stateNavigator.navigate('s', {x: ['a', 'b'], y: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: ['a', 'b', 'c']}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=a&x=b&x=c');
            assert.equal(link.prop('className'), null);
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Disable Inactive Array Length Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'stringarray'} }
            ]);
            stateNavigator.navigate('s', {x: ['a', 'b'], y: 'c'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: ['a', 'b', 'c']}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=a&x=b&x=c');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Active Add Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 'a'}}
                        activeCssClass="active"
                        className="link">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=a');
            assert.equal(link.prop('className'), 'link active');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Inactive Add Css Class Navigation Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 'c'}}
                        activeCssClass="active"
                        className="link">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r?x=c');
            assert.equal(link.prop('className'), 'link');
            assert.equal(link.prop('children'), 'link text');
        })
    });

    describe('Click Navigation Link', function () {
        it('should navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            link.simulate('click');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s']);
        })
    });

    describe('Ctrl + Click Navigation Link', function () {
        it('should not navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            link.simulate('click', { ctrlKey: true });
            assert.equal(stateNavigator.stateContext.state, null);
        })
    });

    describe('Shift + Click Navigation Link', function () {
        it('should not navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            link.simulate('click', { shiftKey: true });
            assert.equal(stateNavigator.stateContext.state, null);
        })
    });

    describe('Meta + Click Navigation Link', function () {
        it('should not navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            link.simulate('click', { metaKey: true });
            assert.equal(stateNavigator.stateContext.state, null);
        })
    });

    describe('Alt + Click Navigation Link', function () {
        it('should not navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            link.simulate('click', { altKey: true });
            assert.equal(stateNavigator.stateContext.state, null);
        })
    });

    describe('Button + Click Navigation Link', function () {
        it('should not navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            link.simulate('click', { button: true });
            assert.equal(stateNavigator.stateContext.state, null);
        })
    });

    describe('Navigating Click Navigation Link', function () {
        it('should navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigating={() => true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            link.simulate('click');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s']);
        })
    });

    describe('Not Navigating Click Navigation Link', function () {
        it('should not navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigating={() => false}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            link.simulate('click');
            assert.equal(stateNavigator.stateContext.state, null);
        })
    });

    describe('Navigating Params Click Navigation Link', function () {
        it('should navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var navigatingEvt, navigatingLink;
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigating={(e, link) => {
                            navigatingEvt = e;
                            navigatingLink = link;
                            return true;
                        }}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            link.simulate('click', { hello: 'world' });
            assert.strictEqual(navigatingEvt.hello, 'world');
            assert.equal(navigatingLink, '/r');
        })
    });

    describe('History Click Navigation Link', function () {
        it('should navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            var addHistory;
            stateNavigator.historyManager.addHistory = (url, replace) => { addHistory = !replace };
            link.simulate('click');
            assert.strictEqual(addHistory, true);
        })
    });

    describe('Replace History Click Navigation Link', function () {
        it('should navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        historyAction="replace">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            var replaceHistory;
            stateNavigator.historyManager.addHistory = (url, replace) => { replaceHistory = replace };
            link.simulate('click');
            assert.strictEqual(replaceHistory, true);
        })
    });

    describe('None History Click Navigation Link', function () {
        it('should navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        historyAction="none">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            var noneHistory = true;
            stateNavigator.historyManager.addHistory = () => { noneHistory = false };
            link.simulate('click');
            assert.strictEqual(noneHistory, true);
        })
    });

    describe('Navigate Navigation Link', function () {
        it('should update', function(){
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1' }
            ]);
            stateNavigator.navigate('s0');
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s0"
                        navigationData={{x: 'a'}}
                        includeCurrentData={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r0?x=a');
            stateNavigator.navigate('s1', {y: 'b'});
            wrapper.update();
            link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r0?y=b&x=a');
        })
    });

    describe('Crumb Trail Navigate Navigation Link', function () {
        it('should not update', function(){
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0');
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s0"
                        navigationData={{x: 'a'}}
                        includeCurrentData={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r0?x=a');
            stateNavigator.navigate('s1', {y: 'b'});
            wrapper.update();
            link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r0?x=a');
        })
    });

    describe('Across Crumbs Crumb Trail Navigate Navigation Link', function () {
        it('should update', function(){
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0');
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s0"
                        acrossCrumbs={true}
                        navigationData={{x: 'a'}}
                        includeCurrentData={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r0?x=a');
            stateNavigator.navigate('s1', {y: 'b'});
            wrapper.update();
            link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r0?y=b&x=a');
        })
    });

    describe('Active Css Class Navigate Navigation Link', function () {
        it('should not update', function(){
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0', {x: 'a'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s0"
                        navigationData={{x: 'a'}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('className'), 'active');
            stateNavigator.navigate('s1');
            wrapper.update();
            link = wrapper.find('a');
            assert.equal(link.prop('className'), 'active');
        })
    });

    describe('Across Crumbs Active Css Class Navigate Navigation Link', function () {
        it('should update', function(){
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0', {x: 'a'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s0"
                        acrossCrumbs={true}
                        navigationData={{x: 'a'}}
                        activeCssClass="active">
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('className'), 'active');
            stateNavigator.navigate('s1');
            wrapper.update();
            link = wrapper.find('a');
            assert.equal(link.prop('className'), null);
        })
    });

    describe('Disable Active Navigate Navigation Link', function () {
        it('should not update', function(){
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0', {x: 'a'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s0"
                        navigationData={{x: 'a'}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), null);
            stateNavigator.navigate('s1');
            wrapper.update();
            link = wrapper.find('a');
            assert.equal(link.prop('href'), null);
        })
    });

    describe('Across Crumbs Disable Active Navigate Navigation Link', function () {
        it('should update', function(){
            var stateNavigator = new StateNavigator([
                { key: 's0', route: 'r0' },
                { key: 's1', route: 'r1', trackCrumbTrail: true }
            ]);
            stateNavigator.navigate('s0', {x: 'a'});
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s0"
                        acrossCrumbs={true}
                        navigationData={{x: 'a'}}
                        disableActive={true}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), null);
            stateNavigator.navigate('s1');
            wrapper.update();
            link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/r0?x=a');
        })
    });

    describe('Click Custom Href Navigation Link', function () {
        it('should navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.historyManager.getHref = () => '#/hello/world';
            var wrapper = mount(
                <NavigationHandler stateNavigator={stateNavigator}>
                    <NavigationLink
                        stateKey="s"
                        navigationData={{x: 'a'}}>
                        link text
                    </NavigationLink>
                </NavigationHandler>
            );
            var link = wrapper.find('a');
            assert.equal(link.prop('href'), '#/hello/world');
            link.simulate('click');
            assert.equal(stateNavigator.stateContext.state, stateNavigator.states['s']);
            assert.equal(stateNavigator.stateContext.data.x, 'a');
        })
    });
});
