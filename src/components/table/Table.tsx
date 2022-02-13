import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { LOGO_URL } from "constants/constants";
import { IAsset } from "model/IAsset";
import React, { Fragment } from "react";
import { formatPrice } from "services/utility";

interface IAssetTable {
  assets: IAsset[];
}

function renderTableHeader() {
  const classes =
    "border-slate-600 font-medium p-4 pl-8 text-slate-400 text-slate-200 text-left";

  return (
    <thead className="bg-gray-900">
      <tr>
        <th className={classes}>Coin Name</th>
        <th className={classes}>Coin Symbol</th>
        <th className={classes}>Price</th>
        <th className={classes}>Action</th>
      </tr>
    </thead>
  );
}

function renderTableBodyRow(asset: IAsset) {
  const {
    metrics: {
      market_data: { price_usd },
    },
  } = asset;
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
      <td className={classes}>{formatPrice(price_usd)}</td>
      <td className={classes}>
        <Options />
      </td>
    </tr>
  );
}

function Table({ assets }: IAssetTable) {
  return (
    <>
      <table className="border-collapse table-auto w-full text-sm">
        {renderTableHeader()}
        <tbody className="bg-slate-800">
          {assets.map((asset) => renderTableBodyRow(asset))}
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
