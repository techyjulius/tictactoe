import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Button from './button';
import sinon from 'sinon';

describe('<Button></Button>', () => {
    it('renders children when passed in', () => {
        const buttonContent = 'Button Content';
        const wrapper = shallow(<Button>{buttonContent}</Button>);
        expect(wrapper.contains(buttonContent)).to.equal(true);
    });

    it('simulates click events', () => {
        const onButtonEventHandler = sinon.spy();
        const wrapper = shallow(<Button onButtonClick={onButtonEventHandler}>Action Button</Button>);
        wrapper.find('button').simulate('click');
        expect(onButtonEventHandler).to.have.property('callCount', 1);
    });
});