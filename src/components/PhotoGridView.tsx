import React from "react";
import { RefreshControl, StyleProp, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native-ui-lib";

import Photo from "./Photo";

interface PhotoGridViewProps {
  rowPhotos: number,
  photosUri: Array<string>,
  multiSelect?: boolean,
  style?: StyleProp<ViewStyle>;
  onPhotoPress?: (uri: string) => void
  onRefresh?: () => void;
}

const PhotoGridView = (props: PhotoGridViewProps) => {

  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const onPhotoPress = (photoUri: string) => {
    if(props.onPhotoPress !== undefined)
      props.onPhotoPress(photoUri);
  };

  const views = [];
  for(let i = 0; i < props.photosUri.length; i += props.rowPhotos) {
    const rowImages = [];
    for(let j = i; j < Math.min(i + props.rowPhotos, props.photosUri.length); j++) {
      rowImages.push(<Photo key={j} photoUri={props.photosUri[j]} width={`${100/props.rowPhotos}%`} onPress={onPhotoPress} select />);
    }
    
    views.push(
      <View key={i} style={{ flex: 1, flexDirection: "row" }}>
        {rowImages}
      </View>
    );
  }

  return (
    <ScrollView 
      style={props.style}
      refreshControl={
        props.onRefresh && <RefreshControl
          refreshing={refreshing}
          onRefresh={props.onRefresh}
        />
      }
    >
      {views}
    </ScrollView>
  );
};

export default PhotoGridView;