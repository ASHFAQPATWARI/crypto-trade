import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { LOGO_URL } from "constants/constants";
import { IAsset } from "model/IAsset";
import React, { Fragment, useEffect, useState } from "react";
import { formatPrice } from "services/utility";

interface IAssetTable {
  assets: IAsset[];
}

function renderTableBodyRow(asset: IAsset) {
  const classes = "border-slate-600 p-4 pl-8 text-white";
  return (
    <tr className="hover:bg-slate-700" key={asset.id}>
      <td className={classes}>
        <img
          src={`${LOGO_URL}/${asset.id}/32.png`}
          className="inline pr-3"
          alt=""
        />
        {asset.name}
      </td>
      <td className={classes}>{asset.symbol}</td>
      <td className={classes}>{formatPrice(asset.price)}</td>
      <td className={classes}>
        <Options />
      </td>
    </tr>
  );
}

export const onSort = (
  sortKey: "name" | "price",
  direction: "asc" | "desc",
  data: IAsset[]
): IAsset[] => {
  if (sortKey === "name") {
    data.sort((a, b) => a["name"].localeCompare(b["name"]));
  } else {
    data.sort((a, b) => a.price - b.price);
  }
  if (direction === "desc") data.reverse();
  return data;
};

type TSortDirection = null | "asc" | "desc";
type TSortKey = null | "name" | "price";

interface ISortModel {
  sortKey: TSortKey;
  direction: TSortDirection;
}

function ReturnSortIcon(type: TSortDirection) {
  switch (type) {
    case "asc":
      return <ChevronUpIcon className="h-4 w-4 inline" />;
    case "desc":
      return <ChevronDownIcon className="h-4 w-4 inline" />;
    default:
      break;
  }
}

function Table({ assets }: IAssetTable) {
  const [sortedAssets, setSortedAssets] = useState<IAsset[]>([]);
  const [sortModel, setsortModel] = useState<ISortModel>({
    sortKey: null,
    direction: null,
  });

  function setSortedAssetsDeep(data: IAsset[]) {
    setSortedAssets(JSON.parse(JSON.stringify(data)));
  }

  useEffect(() => {
    console.log("assets changed");

    setSortedAssetsDeep(assets);
  }, [assets]);

  const handleSort = (key: "name" | "price") => {
    const currentDirection = sortModel.direction;
    const direction =
      currentDirection === null
        ? "asc"
        : currentDirection === "asc"
        ? "desc"
        : null;
    setsortModel((prev) => ({
      sortKey: key,
      direction: direction,
    }));

    if (direction) {
      const data = onSort(key, direction, sortedAssets);
      console.log("sroted data", data);
      setSortedAssets(data);
    } else {
      console.log("old assets", assets);
      setSortedAssetsDeep(assets);
    }
  };

  function renderTableHeader() {
    const classes =
      "border-slate-600 font-medium p-4 pl-8 text-slate-400 text-slate-200 text-left";

    return (
      <thead className="bg-gray-900">
        <tr>
          <th
            className={`${classes} cursor-pointer`}
            onClick={() => handleSort("name")}
          >
            Coin Name{" "}
            {sortModel.sortKey === "name" &&
              sortModel.direction !== null &&
              ReturnSortIcon(sortModel.direction)}
          </th>
          <th className={classes}>Coin Symbol</th>
          <th className={classes} onClick={() => handleSort("price")}>
            Price{" "}
            {sortModel.sortKey === "price" &&
              sortModel.direction !== null &&
              ReturnSortIcon(sortModel.direction)}
          </th>
          <th className={classes}>Action</th>
        </tr>
      </thead>
    );
  }

  return (
    <>
      <table className="border-collapse table-auto w-full text-sm">
        {renderTableHeader()}
        <tbody className="bg-slate-800">
          {sortedAssets.map((asset) => renderTableBodyRow(asset))}
        </tbody>
      </table>
    </>
  );
}

export default Table;

function Options() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          Trade
          <ChevronDownIcon
            className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-50 absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-500 text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  Buy
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-500 text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  Sell
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
