import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {

 
  
  if (action.type === LOAD_PRODUCTS) {

    let maxPrice = action.payload.map((p) => p.price)
    maxPrice = Math.max(...maxPrice);
  
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {...state.filters, max_price: maxPrice, min_price: 0 , price: maxPrice}
      }
  }

  if (action.type === SET_GRIDVIEW) {
   return    { ...state,    gird_view: true   }
  }


  if (action.type === SET_LISTVIEW) {
      return { ...state,  gird_view: false,  }
  }

  if (action.type === UPDATE_SORT) {
    return { ...state,   sort: action.payload }
  }

  if (action.type === SORT_PRODUCTS) {

    const {sort, filtered_products} = state
    
    let tempProducts = [...filtered_products];

    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a , b) => {
        let x = a.price
        let y = b.price
        if (x < y) {
          return -1
        }
        if (x > y) {
          return +1
        }
        return 0
      })
    }

    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a , b) => {

        let x = a.price
        let y = b.price

        if (x > y) {
          return -1
        }
        if (x < y) {
          return 1
        }
        return 0
      })
    }

    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a , b) => {
        return a.name.localeCompare(b.name) } )
    }

    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a , b) => {
        return b.name.localeCompare(a.name) } )
    }

    return {  ...state,  filtered_products: tempProducts  }
    }
    
    if (action.type === UPDATE_FILTERS) {
      const { name, value } = action.payload
      return { ...state, filters: { ...state.filters, [name]: value } }
    }

    if (action.type === FILTER_PRODUCTS) {

      const { all_products } = state;
      const {text, company, category, color, price, shipping} = state.filters;
      let tempProducts = [...all_products];

     if ( text ) {
        tempProducts  = tempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text);
        })
      }

     if ( category !== 'all') {
        tempProducts = tempProducts.filter(product => product.category === category)
     }

     if ( company !== 'all') {
        tempProducts = tempProducts.filter(product => product.company === company)
     }

      if ( color !== 'all') {
          tempProducts = tempProducts.filter(product => {
            return  product.colors.find((c) => c === color)
          })
      }

      tempProducts = tempProducts.filter(product => product.price <= price)

      if (shipping) {
          tempProducts = tempProducts.filter(product => product.shipping === true)
      }



      return { ...state,  filtered_products: tempProducts  }
    }
   
  
    if (action.type === CLEAR_FILTERS) {
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      }
    }
   
  

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
