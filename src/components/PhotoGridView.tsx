import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Image, TouchableOpacity, View } from "react-native-ui-lib";

interface PhotoGridViewProps {
  rowPhotos: number,
  photosUri: Array<string>,
  callbackOnPhotoSelect: (uri: string) => void
}

const PhotoGridView = (props: PhotoGridViewProps) => {

  const onPhotoPressed = (e) => {
    props.callbackOnPhotoSelect(props.photosUri[parseInt(e.children.key)]);
  };

  const views = [];
  for(let i = 0; i < props.photosUri.length; i += props.rowPhotos) {
    const rowImages = [];
    for(let j = i; j < Math.min(i + props.rowPhotos, props.photosUri.length); j++) {
      rowImages.push(
        <TouchableOpacity 
          style={{ width: `${100/props.rowPhotos}%`, aspectRatio: 1/1, backgroundColor: 'orange'}}
          onPress={onPhotoPressed}
        >
        <Image 
          key={j} 
          source={{ uri: props.photosUri[j] }}
          style={{ width: "100%", height: "100%"}} 
        />
        </TouchableOpacity>);
    }
    
    views.push(
      <View style={{ flex: 1, flexDirection: "row" }}>
        {rowImages}
      </View>
    );
  }

  return (
    <ScrollView>
      {views}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  photo: {
  }
});

export default PhotoGridView;