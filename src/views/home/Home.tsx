import { Button, Table } from "components";
import React from "react";
import { useInfiniteQuery } from "react-query";
import { fetchAssets } from "services/data-fetch";

function Home() {
  const {
    isLoading,
    isIdle,
    isError,
    isSuccess,
    error,
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["projects"], fetchAssets, {
    keepPreviousData: true,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  });

  console.log("errors", isError, error, isLoading);
  if (isLoading || isIdle) return <p>Loading</p>;

  if (isError && error instanceof Error)
    return (
      <>
        <p>An error has occurred: " {error.message} </p>
      </>
    );

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      {isSuccess && <Table assets={data?.pages.flat()!} />}

      <Button
        className="mt-3"
        theme="secondary"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </Button>
    </div>
  );
}

export default Home;
