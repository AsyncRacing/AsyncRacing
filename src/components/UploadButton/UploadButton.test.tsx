import React from 'react';
import { render } from '@testing-library/react';
import UploadButton from './UploadButton';

test('Confirms that math works', () => {
  render(<UploadButton setFile={(e)=>{console.log(1+1)}}/>);
  expect(1+1).toEqual(2);
});
