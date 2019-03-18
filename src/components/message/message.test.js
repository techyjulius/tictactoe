import {shallow} from "enzyme";
import Message from './message';
import {expect} from "chai";
import React from "react";

describe('<Message></Message>', () => {
    it('renders children when passed in', () => {
        const messageContent = <div>Message Content</div>;
        const wrapper = shallow(<Message>{messageContent}</Message>);
        expect(wrapper.contains(messageContent)).to.equal(true);
    });
});