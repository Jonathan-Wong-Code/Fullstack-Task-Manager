import React, { useEffect } from 'react';
import useSafeSetState from "./../useSafeSetState";
import { render, wait } from '@testing-library/react';

const TestComponent = () => {
  const [state, safeSetState] = useSafeSetState();
  useEffect(() => {
    const getData = () => {
      setTimeout(() => {
        safeSetState('jon')
      }, 1500)
    }
    getData();
  }, [safeSetState])
  return (
    <p data-testid='name'>{state}</p>
  )
}

describe('the useSafeSetState hook', () => {
  test("it simulates grabbing the user's name from an API", async () => {
    const { getByTestId } = render(<TestComponent />);
    await wait(() => {
      expect(getByTestId('name').textContent).toBe('jon');
    })
  })
})


