import axios from "axios";
import { Alert } from "react-native";
import { atom, selector } from "recoil";
import { AuthData } from "../../contexts/Auth";
import Container from "../../types";

export const userTokenAtom = atom<AuthData | undefined>({
  key: "userToken",
  default: undefined,
});

export const isLoadingAtom = atom({
  key: "loading",
  default: true,
});

export const containerListAtom = atom<Container[]>({
  key: "containerList",
  default: [],
});

export const isRefreshingAtom = atom({
  key: "isRefreshing",
  default: false,
});

export const containerListSelector = selector({
  key: "containerListSelector",
  get: async ({ get }) => {
    const authData = get(userTokenAtom);
    const accessToken = authData?.accessToken;

    if (accessToken) {
      const headerConfig = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const containerGetUrl =
        "https://dev.archivum.mblb.net/api/containers?pageSize=100";

      const response = await axios.get(containerGetUrl, headerConfig);

      if (response) {
        return response.data.elements.map((entry: Container) => ({
          apiKey: entry.apiKey,
          archivalDuration: entry.archivalDuration, // pattern: ^P(\d+Y)?(\d+M)?(\d+W)?(\d+D)?$
          connectors: entry.connectors,
          description: entry.description,
          displayName: entry.displayName,
          indexingProperties: entry.indexingProperties,
          creationDateTime: entry.creationDateTime,
          mediaType: entry.mediaType,
          name: entry.name,
          owner: entry.owner,
          ownerGroups: entry.ownerGroups,
          requiredParameters: entry.requiredParameters,
          retentionDuration: entry.retentionDuration, // pattern: ^P(\d+Y)?(\d+M)?(\d+W)?(\d+D)?$
          rules: entry.rules,
          userGroups: entry.userGroups,
          bulkActionEnabled: entry.bulkActionEnabled,
        }));
      }
    } else {
      return [];
    }
  },
});
