import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React from 'react'

export default function CommentForm(props) {

    console.log(props.comments);
    //RENVOIR UNDEFINED
    // console.log("We are here");
    // console.log(props.commentAuthor);
    // console.log(props.commentContent);
    return (
        <View>
            <View>
                <View>
                    

                    <Text>Nom de l'auteur</Text>
                    <TextInput
                        placeholder="Entrer votre prénom"
                        style={[styles.textInput, { height: 40 }]}
                        value={props.commentAuthor}
                        onTextInput={props.handleCommentAuthorChange}

                    />
                    <Text>Commentaire</Text>
                    <TextInput
                        style={[styles.textInput, { height: 140 }]}
                        placeholder="Entrer votre commentaire"
                        multiline="true"
                        value={props.commentContent}
                        onTextInput={props.handleCommentContentChange}
                    />
                </View>

                <Button title="Valider Commentaire" onPress={props.onSubmit}  ></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textInput: {
        borderWidth: 1,
        padding: 10,
        width: "90%",
    }
});