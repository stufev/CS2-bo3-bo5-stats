import {ref} from "vue";
import {projectFirestore} from "@/firebase/config.js";

const editCollection = (collection) => {
    const error = ref(null);

    const editDoc = async (doc, id) => {
        error.value = null;

        try {
            // await projectFirestore.collection(collection).add(doc);
            await projectFirestore.collection(collection).doc(id).update(doc);
        } catch (err) {
            console.log(err.message)
            err.value = 'could not update data'
        }
    }

    return {error, editDoc}
}

export default editCollection