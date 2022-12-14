import './App.css';
import React, { useEffect, useState } from 'react';
import MainTable from '@canonical/react-components/dist/components/MainTable'
import axios from 'axios'

function App() {

  const [table, setTable] = useState([])
  const [key, setKey] = useState('')
  useEffect(() => {
    getcurrency();
  }, []);

  const getcurrency = () => {
    axios.get("https://api.coincap.io/v2/assets").then((response) => {
      //console.log(response.data)
      // setTable([response.data]) 
      if (response && response.data) {
        response.data.data.map((item, key) =>
          setTable(table => [...table, {
            columns: [
              {
                content: item.id
              },
              {
                content: item.rank
              },
              {
                content: item.symbol
              },
              {
                content: item.name
              },
              {
                content: item.supply
              },
              {
                content: item.maxSupply
              }, {
                content: item.marketCapUsd
              }, {
                content: item.volumeUsd24Hr
              },
              {
                content: item.priceUsd
              }, {
                content: item.changePercent24Hr
              }, {
                content: item.vwap24Hr
              }
            ]
          }])

        )

      }
    })
  }

  const filterResults = () => {
    //console.log(key);
    axios.get(`https://api.coincap.io/v2/assets?search=${key}`).then((response) => {
      // console.log(response.data)
      if (response && response.data) {
        setTable([]);
        response.data.data.map((item, key) =>
          
          setTable(table => [...table, {
            columns: [
              {
                content: item.id
              },
              {
                content: item.rank
              },
              {
                content: item.symbol
              },
              {
                content: item.name
              },
              {
                content: item.supply
              },
              {
                content: item.maxSupply
              }, {
                content: item.marketCapUsd
              }, {
                content: item.volumeUsd24Hr
              },
              {
                content: item.priceUsd
              }, {
                content: item.changePercent24Hr
              }, {
                content: item.vwap24Hr
              }
            ]
          }])
        )
      }
    })
  }
  return (
<form action="">
    <div className='container'>
      <div style={{ float: 'left', padding: '5px', width:'100%',maxHeight:'100%',maxWidth:'100%'}}>
        <div style={{width:'250px'}}><input type="text" onChange={(e) => setKey(e.target.value)}  />
        </div>
        <button className="p-button--brand" onClick={filterResults}>search</button>
      </div>
      <div style={{marginTop:'20px',maxWidth:'100%'}}>
      <p style={{textAlign:'center',maxWidth:'100%',fontWeight:'bold'}}>CRYPTO CURRENCIES</p>
        {
          //console.log(table, "table")
        }
        {
          table && table.length >= 1 && <MainTable style={{border:'1px solid black',borderCollapse:'collapse'}} headers={[{
            content: "id"
          }, {
            content: "rank"
          },
          {
            content: "symbol"
          }, {
            content: "name"
          },
          {
            content: "supply"
          }, {
            content: "maxSupply"
          },
          {
            content: "marketCapUsd"
          }, {
            content: "volumeUsd24Hr"
          }, {
            content: "priceUsd"
          }, {
            content: "changePercent24Hr"
          },
          {
            content: "vwap24Hr"
          }
          ]} paginate={20} rows={table} />

        }
        
      </div>
    </div>
    </form>
  );
}
export default App;
