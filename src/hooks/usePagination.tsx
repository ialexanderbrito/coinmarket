import { ButtonProps } from '@chakra-ui/react';
import { usePaginator } from 'chakra-paginator';

export function usePagination() {
  const { currentPage, setCurrentPage, pagesQuantity } = usePaginator({
    total: 200,
    initialState: { currentPage: 1, pageSize: 10 },
  });

  const outerLimit = 1;
  const innerLimit = 1;

  const baseStyles: ButtonProps = {
    w: 7,
    fontSize: 'sm',
    color: 'gray.600',
  };

  const activeStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: 'purple.300',
    },
    bg: 'purple.400',
  };

  const separatorStyles: ButtonProps = {
    w: 7,
    bg: 'gray.100',
    color: 'gray.600',
  };

  return {
    pagesQuantity,
    currentPage,
    setCurrentPage,
    outerLimit,
    innerLimit,
    baseStyles,
    activeStyles,
    separatorStyles,
  };
}
