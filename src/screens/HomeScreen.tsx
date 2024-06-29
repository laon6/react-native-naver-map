import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

const HomeScreen = () => {
   // hooks
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
   return (
     <View style={styles.container}>
       <BottomSheet
         ref={sheetRef}
         snapPoints={snapPoints}
         onChange={handleSheetChange}
       >
         <BottomSheetFlatList
           data={data}
           keyExtractor={(i) => i}
           renderItem={renderItem}
           contentContainerStyle={styles.contentContainer}
         />
       </BottomSheet>
     </View>
   );
 };

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     paddingTop: 100,
   },
   contentContainer: {
     backgroundColor: "white",
   },
   itemContainer: {
     padding: 6,
     margin: 6,
     backgroundColor: "#eee",
   },
 });

export default HomeScreen;
