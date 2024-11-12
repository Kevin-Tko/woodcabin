import TableRow from './TableRow'
import TableHead from './TableHead';
import {formatCurrency} from '../utils/helpers'

function Table({cabin}) {

  console.log(cabin)

  const {name, maxCapacity, regularPrice, discount} = cabin

  const TableHeaders = ['cabin', 'capacity', 'price', 'discount', 'button']

    return(
    <table className="table-fixed min-w-full">
    <thead>
        <TableRow>
            {TableHeaders.map((header, idx)=>
                <TableHead key={header}>{TableHeaders[idx]}</TableHead>
            )}
        </TableRow>
    </thead>
    <tbody>
      <TableRow>
        {Object.keys(cabin).forEach(key=> {
          if(key==='regularPrice' || key==='discount') {
            return <td>{formatCurrency(cabin[key])}</td>
          }else {
            return <td>{cabin[key]}</td>
          }
        })}
      </TableRow>

      {/* <img src={image} alt="cabin" className="h-14" />
                <p>{name}</p>
                <p>{maxCapacity} people</p>
                <p>{currConverter(regularPrice)}</p>
                <p>
                    {cabin.discount ? (
                        currConverter(discount)
                    ) : (
                        <span>&mdash;</span>
                    )}
                </p> */}
      {/* <tr>
        <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
        <td>Malcolm Lockyer</td>
        <td>1961</td>
      </tr>
      <tr>
        <td>Witchy Woman</td>
        <td>The Eagles</td>
        <td>1972</td>
      </tr>
      <tr>
        <td>Shining Star</td>
        <td>Earth, Wind, and Fire</td>
        <td>1975</td>
      </tr> */}
    </tbody>
  </table>)
}

export default Table;