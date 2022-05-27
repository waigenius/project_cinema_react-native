import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React from 'react'

export default function MovieForm(props) {
 
    return (
        
        <View style={styles.container}>

            <View style={styles.formulaire}>
                <Text>Titre</Text>
                <TextInput
                    style = {[styles.textInput, { height: 40 }]}
                    placeholder="Le titre du film"
                    value = {props.title}
                    onChangeText={props.handleTitleChange}
                />
                <Text>Synopsis</Text>
                <TextInput
                    style = {[styles.textInput, { height: 120 }]}
                    multiline
                    placeholder="Le synopsis du film"
                    value = { props.synopsis}
                    onChangeText={props.handleSynopsisChange}
                />
                <Text>Url de l'image du film</Text>
                <TextInput
                    style = {[styles.textInput, { height: 40 }]}
                    placeholder = "L'url du film"
                    value = {props.urlImage}
                    onChangeText = {props.handleUrlImageChange}
                />
                 <Button title="Mettre à jour" onPress={props.onSubmit} ></Button>         
            </View>

           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#154360",
        alignItems: "center",
        justifyContent: "center",
        
    },
    formulaire:{

        backgroundColor: '#ffffff',
        padding: '20px',
        boxShadow : "5px 5px 15px #ABB2B9",

    },
    textInput: {
        borderWidth: 1,
        padding: 10,
        margin : 10,
        width: "90%",
    }
});