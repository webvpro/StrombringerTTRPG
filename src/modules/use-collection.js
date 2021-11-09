import { toRefs, reactive, onMounted } from "vue";
import { db } from "@/modules/firebase"
import { 
  collection,
  where,
  orderBy,
  limit,
  query, 
  onSnapshot,
} from "firebase/firestore";

/**
 *
 * @param { String } collectionName name of the desired collection
 * @param { object } queryOptions
 * @param { boolean | undefined } queryOptions.onMounted if true run query on mount
 * @param { string | undefined } queryOptions.query query string, see firebase documentation
 * @param { string | undefined } queryOptions.orderBy order results,  string, see firebase documentation
 * @param { number | undefined } queryOptions.limit number of object to return,  string, see firebase documentation
 */


 export default function(collectionName, queryOptions) {
    let state = reactive({
      // error if one happens
      collectionData: [],
      error: null,
      loading: true
    });
  
      
    /**
     * there is the option to load the query when the component
     * is mounted, you need to set the option in the `queryOptions`
     * params that you pass in
     *
     */
    onMounted(() => {
      queryOptions && (queryOptions.onMount && getCollection());
    });
  
    /**
     *
     * @param { object } queryOptions
     * @param { boolean | undefined } queryOptions.onMounted
     * @param { array of strings | undefined } queryOptions.where
     * @param { array of strings | undefined } queryOptions.orderBy
     * @param { number | undefined } queryOptions.limit
     */
    
    const getCollection = ({ where:_where, orderBy:_orderBy, limit:_limit } = queryOptions) => {
       let qArgs = []
       qArgs.push(collection(db,collectionName))
       if (_where) qArgs.push(where(..._where))
       if (_orderBy) qArgs.push(orderBy(..._orderBy))
       if (_limit) qArgs.push(limit(_limit))
          
      const q = query(...qArgs)
      
      onSnapshot(q, (querySnapshot) => {
        let resultArray = [];
        querySnapshot.forEach((doc) => {
          resultArray.push({ id: doc.id, ...doc.data() })
        });
        state.collectionData = resultArray;
        state.loading =false
      });
          
      
    };
    
    
    return {
      ...toRefs(state),
      'getCollection' : getCollection,
    };
  }