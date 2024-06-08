import {ref} from "vue";
import {projectFirestore} from "@/firebase/config.js";

const useCollection = (collection) => {
    const error = ref(null);

    const addDoc = async (doc) => {
        error.value = null;

        try {
            await projectFirestore.collection(collection).add(doc);
        } catch (err) {
            console.log(err.message)
            err.value = 'could not update data'
        }
    }

    return {error, addDoc}
}

export default useCollection