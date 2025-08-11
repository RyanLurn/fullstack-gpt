import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type SearchParamsToSetType = {
  [key: string]: string | number | undefined | null;
};

function useUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    ({
      searchParamsToSet,
      swap
    }: {
      searchParamsToSet: SearchParamsToSetType;
      swap: boolean;
    }) => {
      // 1. Create a new URLSearchParams object based on the current search parameters
      // If `swap` is true, start with an empty URLSearchParams object.
      // Otherwise, start with the current search params.
      const params = new URLSearchParams(swap ? "" : searchParams.toString());
      // 2. Iterate over the new parameters and update them
      for (const [key, value] of Object.entries(searchParamsToSet)) {
        if (value === null || value === undefined) {
          // If the value is null or undefined, remove the parameter
          params.delete(key);
        } else {
          // Otherwise, set the new parameter.
          params.set(key, String(value));
        }
      }
      // 3. Return the updated query string
      return params.toString();
    },
    [searchParams]
  );

  const constructUrlState = useCallback(
    ({
      searchParamsToSet,
      swap
    }: {
      searchParamsToSet: SearchParamsToSetType;
      swap: boolean;
    }) => {
      const queryString = createQueryString({ searchParamsToSet, swap });
      const urlState = pathname + "?" + queryString;

      return urlState;
    },
    [createQueryString, pathname]
  );

  const setUrlState = useCallback(
    ({
      searchParamsToSet,
      swap
    }: {
      searchParamsToSet: SearchParamsToSetType;
      swap: boolean;
    }) => {
      const urlState = constructUrlState({ searchParamsToSet, swap });
      router.replace(urlState);
    },
    [constructUrlState, router]
  );

  return {
    router,
    pathname,
    searchParams,
    constructUrlState,
    setUrlState
  };
}

export { useUrlState };
export type { SearchParamsToSetType };
