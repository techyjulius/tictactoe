import React from 'react';
import { shallow, render } from 'enzyme';
import { expect } from 'chai';
import Tile from './tile';
import sinon from 'sinon';

describe('<Tile></Tile>', () => {
    it('renders children when passed in', () => {
        const tileContent = 'X';
        const wrapper = shallow(<Tile playerOccupying={tileContent}></Tile>);
        expect(wrapper.text()).to.contain(tileContent);
    });

    it('simulates click events', () => {
        const onTileClickEventHandler = sinon.spy();
        const wrapper = shallow(<Tile onTileClick={onTileClickEventHandler}></Tile>);
        wrapper.find('div').simulate('click');
        expect(onTileClickEventHandler).to.have.property('callCount', 1);
    });
});