/* eslint-env mocha */

const { expect } = require('chai');
const React = require('react');
const Search = require('../client/components/Search');
const BuoyCard = require('../client/components/BuoyCard');
const { shallow, mount } = require('enzyme');
const { buoys } = require('../client/data/data');

describe('<Search /> ', () => {
  it('should render the brand', () => {
    const wrapper = shallow(<Search />);
    // console.log(wrapper.debug());
    expect(wrapper.contains(<h1 className='brand'>Buoy Station Tracker</h1>)).to.be.true;
  });

  it('should render as many shows as there are data for', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.find(BuoyCard).length).to.equal(buoys.length);
  });

  it('should filter correctly given new state', () => {
    const wrapper = mount(<Search />);
    const input = wrapper.find('.search-input');
    input.node.value = 'texas';
    input.simulate('change');
    expect(wrapper.state('searchTerm')).to.equal('texas');
    expect(wrapper.find('.buoy-card').length).to.equal(1);
  });
});
