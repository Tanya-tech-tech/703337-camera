import { name } from 'faker';
import { makeFakeDeviceCard } from '../../utils/mocks';
import { getCurrentCard, getSimilarCard } from '../../utils/utils';

describe('Component: MainPage', () => {
  describe('Function: getCurrentCard', () => {
    it('function \'getCurrentCard\' should return "true" when id is correct', () => {
      const mockArrayCard = Array.from({length: 5}, makeFakeDeviceCard);
      const { id } = mockArrayCard[1];

      const result = getCurrentCard(mockArrayCard, id);

      expect(result).toBe(mockArrayCard[1]);
    });

    it('function \'getCurrentCard\' should return "false" when id is incorrect', () => {
      const mockCard = Array.from({length: 5}, makeFakeDeviceCard);
      const incorrectId = 79;

      const result = getCurrentCard(mockCard, incorrectId);

      expect(result).toBe(undefined);
    });


  });

});

