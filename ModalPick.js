import React from 'react';
import {
    StyleSheet, View,
    Text, Modal, TouchableOpacity,
    Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PopUp = ({visible, children}) => {

    const [showModal, setShowModal ] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        toggleModal();
    }, [visible]);

    const toggleModal = () => {
        if(visible){
            setShowModal(true);
            Animated.spring(scaleValue,{
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setShowModal(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
        }
    };

    return (
        <Modal transparent visible={showModal}>
            <View style={styles.popUpBG}>
                <Animated.View style={styles.popUpContainer}>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    );
};

export default function ModalSelect(){
    const [ visible, setVisible ] = React.useState(false);

    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <PopUp visible={visible}>
                <View style={{alignItems: 'center'}}>
                    <View style={styles.hdClose}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Ionicons name="close-outline" size={30}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={{marginVertical: 30, fontSize: 20, fontWeight: 'bold', textAlign:'center'}}>
                    Congratulations, you have successfuly opened the modal.
                </Text>
            </PopUp>
            <TouchableOpacity onPress={() => setVisible(true)}>
                <Ionicons name="albums-outline" size={30} color="#52575D"/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    popUpBG:{
        flex: 1,
        backgroundColor: 'rgba(50, 70, 200, 0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    popUpContainer:{
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20
    },
    hdClose:{
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
});