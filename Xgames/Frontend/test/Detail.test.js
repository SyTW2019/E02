import React from 'react';
import { render } from 'react-testing-library';

import Detail from '../index';

const renderComponent = () =>
  render(
    <Detail></Detail>,
  );

describe('<Detail />', () => {
    it('should render an <div> tag', () => {
      const { container } = renderComponent();
      expect(container.querySelector('div')).not.toBeNull();
    });
    it('should render an <Box> tag', () => {
        const { container } = renderComponent();
        expect(container.querySelector('Box')).not.toBeNull();
    });
    it('should render an <Typography> tag', () => {
        const { container } = renderComponent();
        expect(container.querySelector('Typography')).not.toBeNull();
    });
    it('should render an <Rating> tag', () => {
        const { container } = renderComponent();
        expect(container.querySelector('Rating')).not.toBeNull();
    });

});