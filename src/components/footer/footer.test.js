import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Footer from './footer';

describe('<Footer></Footer>', () => {
    it('renders children when passed in', () => {
        const footerContent = 'Footer Content';
        const wrapper = shallow(<Footer>{footerContent}</Footer>);
        expect(wrapper.contains(footerContent)).to.equal(true);
    });
});