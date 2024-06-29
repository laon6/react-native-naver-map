import React from 'react';
import Navigation from './navigation';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const App = () => {

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <Navigation />
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
};
export default App;
