import {shallow} from "enzyme";
import Header from './header';
import {expect} from "chai";
import React from "react";

describe('<Header></Header>', () => {
    it('renders children when passed in', () => {
        const headerContent = 'Header Content';
        const wrapper = shallow(<Header>{headerContent}</Header>);
        expect(wrapper.contains(headerContent)).to.equal(true);
    });
});