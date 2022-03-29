import React from "react";
import { Button } from "react-native";
import { Carousel, Image, View } from "react-native-ui-lib";

const PostDescription = ({route, navigation}) => {

    const [photosUri, setPhotosUri] = React.useState<Array<string>>([]);

    React.useEffect(() => {
        setPhotosUri(route.params.selectedPhotosUri);
    });

    // React.useEffect(() => {
    //     navigation.setptions({
    //         headerRight: () => (
    //             <Button 
    //                 title="Share" 
    //                 onPress={() => navigation.navigate("To Doo!")}
    //             />
    //         ),
    //     });
    // }, []);

    return (
        <View flex>
            <Carousel style={{height: "40%"}} showCounter>
            {
                photosUri.map((photoUri: string) => {
                    return <Image source={{uri: photoUri}} style={{width: "100%", height: "100%", resizeMode: "contain"}} />
                })
            }
            </Carousel>
        </View>
    );
};

export default PostDescription;