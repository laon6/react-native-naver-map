import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet
} from 'react-native';
import {
    NaverMapView,
    type NaverMapViewRef,
    NaverMapMarkerOverlay,
    MapType,
    Region,
    Camera,
    CameraChangeReason,
} from '@mj-studio/react-native-naver-map'
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { getProductMarkerList } from '../services/api/productApi';

interface MarkerData {
    id: string;
    lat: number;
    lng: number;
    title: string;
    subTitle: string;
    placeName: string;
    content: string;
    imageUrl: string;
}


/**
 * @private
 */
const MapTypes = [
    'Basic',
    'Navi',
    'Satellite',
    'Hybrid',
    'Terrain',
    'NaviHybrid',
    'None',
] satisfies MapType[];

function ListScreen(): React.JSX.Element {

    // 아래는 리스트 관련
    const sheetRef = useRef<BottomSheet>(null);

    // variables
    const data = useMemo(
        () =>
            Array(50)
                .fill(0)
                .map((_, index) => `index-${index}`),
        []
    );
    const snapPoints = useMemo(() => ["4%", "50%", "80%"], []);

    // callbacks
    const handleSheetChange = useCallback((index: any) => {
        console.log("handleSheetChange", index);
    }, []);

    // render
    const renderItem = useCallback(
        ({ item }: { item: string }) => (
            <View style={styles.itemContainer}>
                <Text>{item}</Text>
            </View>
        ),
        []
    );


    // 아래는 지도 관련
    const [region, setRegion] = useState<Region>({
        latitude: 37.564362,
        longitude: 126.977011,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const ref = useRef<NaverMapViewRef>(null);

    const [mapType, setMapType] = useState<MapType>(MapTypes[0]!);
    const [markers, setMarkers] = useState<MarkerData[]>([]);

    const onCameraChange = (params: Camera & { reason: CameraChangeReason }) => {
        const { latitude, longitude, zoom } = params;

        const calculatedZoom = zoom !== undefined ? zoom : 10; // 기본값 10 설정
        const latitudeDelta = Math.exp(Math.log(360) - calculatedZoom * Math.LN2) / 10;
        const longitudeDelta = Math.exp(Math.log(360) - calculatedZoom * Math.LN2) / 10;

        const southWestLat = latitude - latitudeDelta / 2;
        const southWestLng = longitude - longitudeDelta / 2;
        const northEastLat = latitude + latitudeDelta / 2;
        const northEastLng = longitude + longitudeDelta / 2;

        setRegion({
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
        });

        fetchMarkers(southWestLat, southWestLng, northEastLat, northEastLng);
    };

    const fetchMarkers = async (southWestLat: number, southWestLng: number, northEastLat: number, northEastLng: number) => {
        try {
            const markerList = await getProductMarkerList(southWestLat, southWestLng, northEastLat, northEastLng);
            setMarkers(markerList);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
        const southWestLat = latitude - latitudeDelta / 2;
        const southWestLng = longitude - longitudeDelta / 2;
        const northEastLat = latitude + latitudeDelta / 2;
        const northEastLng = longitude + longitudeDelta / 2;

        fetchMarkers(southWestLat, southWestLng, northEastLat, northEastLng);
    }, []);

    return (
        <View style={{ flex: 1 }}>

            <NaverMapView
                ref={ref}
                style={{ flex: 1 }}
                mapType={mapType}
                layerGroups={{
                    BUILDING: true,
                    BICYCLE: false,
                    CADASTRAL: false,
                    MOUNTAIN: false,
                    TRAFFIC: false,
                    TRANSIT: false,
                }}
                fpsLimit={0}
                isExtentBoundedInKorea
                onInitialized={() => console.log('initialized!')}
                onOptionChanged={() => console.log('Option Changed!')}
                onCameraChanged={onCameraChange}

                //  onTapMap={(args) => console.log(`Map Tapped: ${formatJson(args)}`)}
            >
                {markers && markers.map((marker) => (
                    <NaverMapMarkerOverlay
                        key={marker.id}
                        latitude={marker.lat}
                        longitude={marker.lng}
                        onTap={() => console.log(marker.title, marker.subTitle)}
                        anchor={{ x: 0.5, y: 1 }}
                        caption={{ text: marker.placeName }}
                        subCaption={{ text: marker.subTitle }}
                        width={24}
                        height={24}
                    />
                ))}
            <TextInput
                style={styles.input}
                placeholder="검색으로 집을 찾을 수 있어요."
            />
            </NaverMapView>

            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                onChange={handleSheetChange}
            >
            <Text>1234</Text>
                <BottomSheetFlatList
                    data={data}
                    keyExtractor={(i) => i}
                    renderItem={renderItem}
                    contentContainerStyle={styles.contentContainer}
                />
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    container: {
        flex: 1,
        paddingTop: 100,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    itemContainer: {
        flex: 1,
        padding: 100,
        margin: 100,
        backgroundColor: "#eee",
    },
    input: {
        height: 40,
        width: '80%',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        color: 'black',
        borderWidth: 0, // 경계선 없애기
        borderRadius: 20, // 둥근 모서리
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5, // 그림자 효과
        marginTop: 20, // 상단 여백

    }
});

export default ListScreen;
