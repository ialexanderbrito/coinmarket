/* eslint-disable no-unused-vars */
import { ChangeEvent } from 'react';

export type IHeaderContext = {
  currency: string;
  setCurrency: (currency: string) => void;
  handleCurrency: (event: ChangeEvent<HTMLSelectElement>) => void;
};
