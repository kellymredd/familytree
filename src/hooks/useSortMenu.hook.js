import { useCallback } from 'react';

export default function useSortMenu() {
  const sortMenu = useCallback((response) => {
    const lastNames = response.map((member) => member.lastName);
    const listHeaders = new Set(lastNames);
    const orgd = [];

    listHeaders.forEach((value) => {
      orgd.push({
        header: value,
        members: response.filter((member) => member.lastName === value),
      });
    });

    return Promise.resolve(orgd);
  });

  return sortMenu;
}
