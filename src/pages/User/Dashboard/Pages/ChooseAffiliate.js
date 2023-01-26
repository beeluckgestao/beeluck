import React, { useState } from "react"
import './ChooseAffiliate.css'
import MenuBar from '../../../../components/MenuBar/index'
import ProductView from "../../ProductView/index"
import { useEffect } from "react"
import axios from "axios"
import { HiMenu } from "react-icons/hi"
import { UserContext } from "../../../../hooks/UserContext"
import { useContext } from "react"
import { getProducts } from "../../utils/apiFunctions"

function Afiliado({ menu }) {
  const [modalProduct, setModalProduct] = useState(false);
  const [productsApi, setProductsApi] = useState();

  async function getAllProducts() {
    const response = getProducts()

    console.log(response)

    setProductsApi(response?.data.result)
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  // selecionar produto
  const [selectedProduct, setSelectedProduct] = useState([]);

  const SelectedProduct = (product) => {
    setModalProduct(true)
    setSelectedProduct(product)
  }

  const { value, setValue } = useContext(UserContext)
  return (
    <div className="__container">
      {
        window.innerWidth <= '600' && value == true ?
          <div className="__menuBar">

            <MenuBar menu={menu} />

          </div> : <>
            {value == false && window.innerWidth <= '600' ?
              <>
                <div className="__menuIsOpen">
                  <HiMenu size={30} onClick={() => setValue(true)} />
                </div>
                <div className="__division-card">
                  <div className="__title">

                    <h1>ESCOLHA A SUA COMUNIDADE</h1>
                    <h3>Escolha em qual comunidade você deseja fazer parte.</h3>
                  </div>

                  <div className="__cardsDivision">
                    {
                      productsApi?.map((product, index) => (
                        <div key={index} className="__card-MyHart">
                          <div className="__cardImgMyHart">
                            <img src={product.image} onClick={() => SelectedProduct(product)} />
                          </div>
                          <div className="__cardImgTitleMyHart">
                            <img src={product.title} />
                          </div>

                        </div>

                      ))
                    }

                  </div>

                  {
                    modalProduct == true ?
                      <ProductView
                        modalProduct={modalProduct}
                        setModalProduct={setModalProduct}
                        selectedProduct={selectedProduct}
                      /> : <></>
                  }
                </div>
              </>
              :
              <>
                <MenuBar menu={menu} />
                <div className="__division-card">
                  <div className="__title">

                    <h1>ESCOLHA A SUA COMUNIDADE</h1>
                    <h3>Escolha em qual comunidade você deseja fazer parte.</h3>
                  </div>

                  <div className="__cardsDivision">
                    {
                      productsApi?.map((product, index) => (
                        <div key={index} className="__card-MyHart">
                          <div className="__cardImgMyHart">
                            <img src={product.image} onClick={() => SelectedProduct(product)} />
                          </div>
                          <div className="__cardImgTitleMyHart">
                            <img src={product.title} />
                          </div>

                        </div>

                      ))
                    }

                  </div>
                  {
                    modalProduct == true ?
                      <ProductView
                        modalProduct={modalProduct}
                        setModalProduct={setModalProduct}
                        selectedProduct={selectedProduct}
                      /> : <></>
                  }
                </div>
              </>}
          </>}
    </div>
  )
}


export default Afiliado