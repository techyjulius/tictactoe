import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Board from './board';
import {FIRST_TILE_INDEX, TOTAL_TILES_COUNT} from "../../constants/app-constants";
import Tile from "../tile/tile";

describe('<Board></Board>', () => {
    it('renders children when passed in', () => {
        let tiles = [];
        for (let index = FIRST_TILE_INDEX; index < TOTAL_TILES_COUNT; index++) {
            tiles.push(
                <Tile
                    key={index}
                    ref={'tile' + index}
                    dataIndex={index}></Tile>
            );
        }
        const wrapper = shallow(<Board>{tiles}</Board>);
        expect(wrapper.contains(tiles)).to.equal(true);
    });
});