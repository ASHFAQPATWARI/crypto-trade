import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import SwapBtn from "components/buttons/SwapBtn";
import { DECIMAL_LIMIT } from "constants/constants";
import { IExchangeAsset } from "model/IAsset";
import React, { Fragment, useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useQuery } from "react-query";
import { fetchAvailableAssets } from "services/data-fetch";

const inputClasses =
  "w-full outline-none bg-slate-600 text-2xl text-white font-bold placeholder-white pr-3";

function Tradeform() {
  const [isSwapped, setIsSwapped] = useState(false);
  const [flatAmount, setFlatAmount] = useState<string>("");
  const [cryptoAmount, setCryptoAmount] = useState<string>("");
  const handleSwap = () => {
    setIsSwapped(!isSwapped);
  };
  const [selectedExchangeAsset, setSlectedExchangeAsset] =
    useState<IExchangeAsset>();

  const { data: assets } = useQuery(
    ["available-assets"],
    () => fetchAvailableAssets(),
    {
      retry: false,
      enabled: !selectedExchangeAsset,
      refetchOnReconnect: false,
      select: (data) => data.filter((asset) => asset.type_is_crypto === 1),
      onSuccess: (data) => {
        if (data.length > 0) {
          setSlectedExchangeAsset(data[0]);
        }
      },
    }
  );

  const currentEditingValue = isSwapped ? flatAmount : cryptoAmount;
  useEffect(() => {
    if (selectedExchangeAsset && cryptoAmount) {
      if (isSwapped) {
        setCryptoAmount(
          (Number(flatAmount) / selectedExchangeAsset.price_usd)
            .toFixed(DECIMAL_LIMIT)
            .toString()
        );
      } else {
        setFlatAmount(
          (Number(cryptoAmount) * selectedExchangeAsset?.price_usd)
            .toFixed(DECIMAL_LIMIT)
            .toString()
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedExchangeAsset, currentEditingValue]);

  return (
    <div className="relative flex flex-col items-stretch">
      <div
        className={`${
          isSwapped ? "order-last" : "order-first"
        } rounded-lg bg-slate-600 outline-slate-200 hover:outline-1 hover:outline p-4 flex items-stretch`}
      >
        <div className="grow">
          <input
            onKeyPress={(event) => {
              if (!/^\d*\.?\d*$/.test(event.key)) {
                event.preventDefault();
              }
            }}
            name="crypto-value"
            className={inputClasses}
            placeholder="0.0"
            value={cryptoAmount}
            readOnly={isSwapped}
            onChange={(e) => setCryptoAmount(e.target.value)}
          />
        </div>
        <Options
          assets={assets}
          onSelect={setSlectedExchangeAsset}
          current={selectedExchangeAsset}
        />
      </div>
      <SwapBtn onClick={handleSwap} />
      <div
        className={`${
          isSwapped ? "order-first" : "order-last"
        } rounded-lg bg-slate-600 outline-slate-200 hover:outline-1 hover:outline p-4 flex items-stretch`}
      >
        <div className="grow">
          <CurrencyInput
            prefix="$"
            name="currency"
            readOnly={!isSwapped}
            className={inputClasses}
            placeholder="0.0"
            value={flatAmount}
            decimalsLimit={DECIMAL_LIMIT}
            onValueChange={(value) => setFlatAmount(value ?? "")}
          />
        </div>
        <p className="text-white font-medium">USD</p>
      </div>
    </div>
  );
}

export default Tradeform;

interface IExchangeOptions {
  assets?: IExchangeAsset[];
  onSelect: (asset: IExchangeAsset) => void;
  current: IExchangeAsset | undefined;
}
function Options({ assets, onSelect, current }: IExchangeOptions) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          disabled={!current}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          {current ? current.name : "Select"}
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
            {assets &&
              assets.map((asset) => (
                <Menu.Item key={asset.asset_id}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-500 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      onClick={() => onSelect(asset)}
                    >
                      {asset.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
