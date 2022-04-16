import React from "react";
import { FlatList, StyleProp, ViewStyle } from "react-native";
import { View } from "react-native-ui-lib";

import Photo from "./Photo";

interface PhotoGridViewProps {
  rowPhotos: number,
  photosUri: Array<string>,
  multiSelect?: boolean,
  scrollEnabled?: boolean;
  style?: StyleProp<ViewStyle>;
  select?: boolean;
  onPhotoPress?: (uri: string) => void;
}

const PhotoGridView = (props: PhotoGridViewProps) => {

  const [ width ] = React.useState<string>(`${100/props.rowPhotos}%`);

  const onPhotoPress = (photoUri: string) => {
    if(props.onPhotoPress !== undefined)
      props.onPhotoPress(photoUri);
  };

  return (
    <FlatList
      style={props.style}
      data={props.photosUri}
      renderItem={(dataInfo) => (
        <Photo photoUri={dataInfo.item} width={width} onPress={onPhotoPress} select={props.select} />
      )}
      numColumns={props.rowPhotos}
      keyExtractor={(item, index) => index.toString()}
      scrollEnabled={props.scrollEnabled}
      nestedScrollEnabled
    />
  );
};

export default PhotoGridView;