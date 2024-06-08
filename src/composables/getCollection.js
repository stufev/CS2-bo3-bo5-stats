import {ref} from "vue";
import {projectFirestore} from "@/firebase/config.js";

const getCollection = async (collection) => {
    const documents = ref(null);
    const error = ref(null);

    let collectionRef = projectFirestore.collection(collection);

    console.log(collectionRef)


    try {
        let res = await collectionRef.get()
        res = res.docs.map(doc => doc.data());
        console.log(res)
        documents.value = res;
    } catch (err) {
        console.log(err)
        error.value = error;
    }

    return {error, documents}
}

export default getCollection