import React from "react";
import { FlatList, StyleProp, ViewStyle } from "react-native";
import { View } from "react-native-ui-lib";

import Photo from "./Photo";

interface GridViewProps {
  infos: Array<any>,
  renderItem: (info: any, index?: number) => React.ReactElement;
  numColumns: number;
  style?: StyleProp<ViewStyle>;
}

const GridView = ({ infos, renderItem, numColumns, style}: GridViewProps) => {
  const size = `${100/numColumns}%`;
  return (
    <View style={[ style, { flexDirection: "row", flexWrap: "wrap" }]}>
      {infos.map((info, index) => (<View key={index} style={{width: size, aspectRatio: 1 }}>{renderItem(info, index)}</View>))}
    </View>
  );
}

interface PhotoGridViewProps {
  rowPhotos: number,
  photosURI: Array<string>,
  multiSelect?: boolean
  select?: boolean;
  onPress?: (uri: string) => void;
  style?: StyleProp<ViewStyle>;
}

const PhotoGridView = (props: PhotoGridViewProps) => {

  const onPress = (photoUri: string) => {
    if (props.onPress !== undefined)
      props.onPress(photoUri);
  };

  return (
    <GridView
      style={props.style}
      infos={props.photosURI}
      renderItem={(info, index) => (<Photo key={index} URI={info} width={"100%"} onPress={onPress} select={props.select} />)}
      numColumns={props.rowPhotos}
    />
  );
};

export default PhotoGridView;