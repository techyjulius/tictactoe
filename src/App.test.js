import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import App from './App';

describe('<App></App>', () => {
    it('calls componentDidMount', () => {
        sinon.spy(App.prototype, 'componentDidMount');
        const wrapper = mount(<App></App>);
        expect(App.prototype.componentDidMount).to.have.property('callCount', 1);
        App.prototype.componentDidMount.restore();
    });
});