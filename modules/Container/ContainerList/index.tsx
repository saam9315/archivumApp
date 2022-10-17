import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import React, { useState } from "react";
import ContainerCard from "../ContainerCard";
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import { containerListSelector } from "../../../stores/Atoms";
import SearchBar from "../SearchBar";

const ContainerList = () => {
  const colorScheme = useColorScheme();
  const listContainerBgC = colorScheme === "dark" ? "#161f28" : "white";
  const containers = useRecoilValue(containerListSelector);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshContainers = useRecoilRefresher_UNSTABLE(containerListSelector);

  const onRefresh = () => {
    setIsRefreshing(true);
    refreshContainers();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  return (
    <View style={[styles.listContainer, { backgroundColor: listContainerBgC }]}>
      <SearchBar />
      <FlatList
        data={containers ? containers : null}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        renderItem={({ item }) => <ContainerCard container={item} />}
        keyExtractor={(item) => item.displayName}
      />
    </View>
  );
};

export default ContainerList;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
});
