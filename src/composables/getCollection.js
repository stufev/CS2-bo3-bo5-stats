import {ref} from "vue";
import {projectFirestore} from "@/firebase/config.js";

const getCollection = async (collection) => {
    const documents = ref(null);
    const error = ref(null);

    let collectionRef = projectFirestore.collection(collection);

    try {
        let result = [];
        let res = await collectionRef.get()

        res.docs.forEach(doc => {
            if (doc.exists) {
                result.push({...doc.data(), id: doc.id})
            }
        })

        documents.value = result;
        error.value = null
    } catch (err) {
        console.log(err)
        error.value = error;
    }

    return {error, documents}
}

export default getCollection