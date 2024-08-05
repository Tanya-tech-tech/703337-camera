import { render, screen } from '@testing-library/react';
import Breadcrumbs from './breadcrumbs';
import { makeFakeDeviceCard, makeFakeStore } from '../../utils/mocks';
import { State } from '../../types/state';
import { withStore, withHistory } from '../../utils/mock-component';

import routeData from 'react-router';

const mockLocation = {
  pathname: '/welcome',
  hash: '',
  search: '',
  state: '',
  key: '',
};

describe('Component: Breadcrumbs', () => {
  beforeEach(() => {
    vi.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);
  });

  it('should render component correctly if path(router) not root', () => {
    const device = makeFakeDeviceCard();

    const {category, name} = device;
    const initiaState = {currentDevice: device} as Partial<State>;
    const { withStoreComponent } = withStore(<Breadcrumbs />, makeFakeStore(initiaState));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    expect(screen.getByText(new RegExp(`${category} ${name}`, 'i'))).toBeInTheDocument();

  });
});

