import { toRefs, reactive, onMounted } from "vue";
import { db } from "@/modules/firebase"
import { 
  collection,
  getDoc,
  doc,
  setDoc,
  Timestamp

} from "firebase/firestore";
import { async } from "@firebase/util";


/**
 *
 * @param { String } collectionName name of the desired collection
 * @param { object } queryOptions
 * @param { boolean | undefined } queryOptions.onMounted if true run query on mount
 * @param { string | undefined } queryOptions.documentId query string, see firebase documentation
 */
export default function(collectionName, queryOptions) {
  let state = reactive({
    // error if one happens
    error: null,
    // the results of the query
    documentData: {},
    // if the query is loading or ot
    loading: false
  });
 


  /**
   * there is the option to load the query when the component
   * is mounted, you need to set the option in the `queryOptions`
   * params that you pass in
   *
   */
  onMounted(() => {
    queryOptions &&
      (queryOptions.onMount && getDocument(queryOptions.documentId));
  });

  const deleteDocument = async _documentId => {
    state.loading = true;
    state.error = null;
    await deleteDoc(doc(db, collectionName, _documentId));
  };

  const setDocument = async  _documentData => {
    state.loading = true;
    state.error = null;
    let docRef = null
    if (_documentData.id) {
      // update existing
      let docRefArray = []
      docRefArray.push(db)
      docRefArray.push(collectionName)
      docRefArray.push(_documentData.id)
      delete _documentData.id
      docRef = doc(...docRefArray)
    } else {
      //create new
      console.log(collectionName)
      docRef = doc(collection(db, collectionName))
    }

    await setDoc(docRef,{ 
      ..._documentData,
      createdOn: Timestamp.now()
    }) 
    
    
    state.loading = false; 
  };

  

  /**
   *
   * @param { object } queryOptions
   * @param { boolean | undefined } queryOptions.onMounted
   * @param { string | undefined } queryOptions.documentId
   */
  const getDocument = async documentId => {
    state.loading = true;
    state.error = null;
    const docRef = doc(db, collectionName, _documentId)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      state.documentData = docSnap.data()
    } else {
      state.documentData = {}
      console.log("No such document!");
    }
     
  };

  return {
    ...toRefs(state),
    'getDocument': getDocument,
    'setDocument': setDocument,
    'deleteDocument': deleteDocument,
  };
}