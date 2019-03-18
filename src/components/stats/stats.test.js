import React from 'react';
import { expect } from 'chai';
import { mount, render } from 'enzyme';
import Stats from './stats';

export const data = {
    players: {
        X: {
            identifier: 'X',
            color: 'green',
            winsCount: 0
        },
        O: {
            identifier: 'O',
            color: 'orange',
            winsCount: 0
        }
    },
    board: {
        tiesCount: 30
    }
};

describe('<Stats />', () => {
    it('allows us to set props', () => {
        const wrapper = mount(
            <Stats players={data.players}
                   tiesCount={data.board.tiesCount}/>);
        expect(wrapper.props().tiesCount).to.equal(data.board.tiesCount);
        data.players.O.winsCount = 33;
        wrapper.setProps({players: data.players});
        expect(wrapper.props().players.O.winsCount).to.equal(33);
    });

    it('renders players starts with specified color classes', () => {
        const wrapper = render(
            <Stats players={data.players}
                   tiesCount={data.board.tiesCount}/>);
        expect(wrapper.find('.player--' + data.players.O.color)).to.have.lengthOf(1);
        expect(wrapper.find('.player--' + data.players.X.color)).to.have.lengthOf(1);
    });
});