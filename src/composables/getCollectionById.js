import {ref} from "vue";
import {projectFirestore} from "@/firebase/config.js";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const getCollectionById = async (collection, id) => {
    const document = ref(null);
    const error = ref(null);

    let collectionRef = projectFirestore.collection(collection);

    try {
        let result = null;
        let res = await collectionRef.where(firebase.firestore.FieldPath.documentId(), "in", [id]).get()

        res.docs.forEach(doc => {
            if (doc.exists) {
                result = {...doc.data(), id: doc.id};
            }
        })

        document.value = result;
        error.value = null
    } catch (err) {
        console.log(err)
        error.value = error;
    }

    return {error, document}
}

export default getCollectionById