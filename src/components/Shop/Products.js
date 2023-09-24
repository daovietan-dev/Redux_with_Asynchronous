import ProductItem from './ProductItem'
import classes from './Products.module.css'

const DUMMY_DATA = [
  {
    id: 'p1',
    title: 'book1',
    price: 6,
    description: 'the first book I have wrote',
  },
  {
    id: 'p2',
    title: 'book2',
    price: 7,
    description: 'the second book I have wrote',
  },
]

const Products = props => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_DATA.map(item => (
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  )
}

export default Products
