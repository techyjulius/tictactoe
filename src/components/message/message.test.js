import {mount, shallow} from "enzyme";
import Message from './message';
import {expect} from "chai";
import React from "react";
import {MESSAGE_TIE} from "../../constants/app-constants";

export const message = {
    type: MESSAGE_TIE,
    data: {}
}

describe('<Message />', () => {
    it('renders children when passed in', () => {
        const messageContent = 'This game was a tie';
        const wrapper = shallow(<Message details={message} />);
        expect(wrapper.text()).to.contain(messageContent);
    });

    it('allows us to set props', () => {
        const wrapper = mount(<Message details={message} />);
        expect(wrapper.props().details).to.equal(message);
    });
});