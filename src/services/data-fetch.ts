import { EXCHANGE_API_KEY, SUPPORTED_ASSETS } from "constants/constants";
import { IAsset, IExchangeAsset } from "model/IAsset";

interface IAssetResponse {
  data: IAsset[];
  status: {
    error_message: string;
  };
}

/**
 * Function to fetch crypto assets for display
 * @param  {} {pageParam=1}
 * @returns Promise
 */
export const fetchAssets = async ({ pageParam = 1 }): Promise<IAsset[]> => {
  const response = await fetch(
    `https://data.messari.io/api/v2/assets?fields=id,name,symbol,metrics/market_data/price_usd&page=${pageParam}&limit=10`
  );

  let data = (await response.json()) as IAssetResponse;

  if (!response.ok) {
    throw new Error(data.status.error_message);
  }

  data.data = data.data.map((asset) => {
    return { ...asset, price: asset.metrics.market_data.price_usd };
  });

  return data.data;
};

/**
 * Function to fetch Assets information including price for trading
 * @returns Promise
 */
export const fetchAvailableAssets = async (): Promise<IExchangeAsset[]> => {
  const response = await fetch(
    `https://rest-sandbox.coinapi.io/v1/assets?filter_asset_id=${SUPPORTED_ASSETS}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "X-CoinAPI-Key": EXCHANGE_API_KEY,
      },
    }
  );

  const data = (await response.json()) as IExchangeAsset[];
  if (!response.ok) {
    throw new Error("Error fetching asset list");
  }

  return data;
};
