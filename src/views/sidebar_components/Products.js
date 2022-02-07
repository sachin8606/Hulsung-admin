import React, { useEffect, useState } from 'react';
import Header from "components/Headers/Header.js";
import {
    Table,
    Button,
    ListGroup,
    ListGroupItem

} from "reactstrap";
import PaginationComponenent from 'views/componentStructure.js/Pagination';
import axios from "axios";
import ProductStruct from 'views/componentStructure.js/Product/ProductStruct';
const Products = ()=>{


    const[ProductList, setProductList] = useState("");
    const[currentProducts, setCurrentProducts] = useState(1);
    const[obtainedsearchresults, setobtainedsearchresults] = useState();
    const[searchtypedValue, setSearchTypedValue] = useState("");
    
   
    useEffect(() => {
       axios.post(`http://localhost:4000/graphql?query={
        allproducts{
            id
            SKU
            productName
            status
            quantity
            },
}`).then((result) => {
            setProductList(result.data.data.allproducts)
            });
    }, [])

    function addnewProduct(){
        window.location.assign('/admin/addProduct');
    }


    function searchProduct() {
        console.log(searchtypedValue)
        axios.post(`http://localhost:4000/graphql?query={
          searchProduct(tag:"${searchtypedValue}"){
           SKU
           productName
          }
        }`).then((result) => {
            console.log(result)
          setobtainedsearchresults(result.data.data.searchProduct);
        });
      }

    function gotoProductDetails(SKU){
        window.location.assign("/admin/editProduct/" + SKU);
    }



    // Pagination

    const indexofLastPost = currentProducts*10; 
    const indexofFirstPost = indexofLastPost-10;
    const posts = ProductList.slice(indexofFirstPost,indexofLastPost);
    const paginate =(pageNo)=>{setCurrentProducts(pageNo)};


    return(
        <>
        <Header />
        <div className="categoryExtraBtns">
                <div className="searchRecordMainLeft">
                    <input type="text" className="searchBarinput" placeholder="Enter Product Name" value={searchtypedValue} onChange={(e)=>setSearchTypedValue(e.target.value)}/>
                    <button className="searchBarBtn" onClick={()=>searchProduct()}><i class="fa fa-search" aria-hidden="true"></i></button>
                    <ListGroup>
                    {obtainedsearchresults && obtainedsearchresults.map(item => {
                      return (
                          <>
                        <ListGroupItem key={item.SKU} onClick={() => gotoProductDetails(item.SKU)}>{item.productName}</ListGroupItem>
                        </>
                      )
                    })}
                  </ListGroup>
                    
                </div>

                <div className="addNewRecordMainright">
                    <Button className="btn-icon btn-3" outline id="btncategoryaddnew" type="button" onClick={()=>{addnewProduct()}}>
                    <span className="btn-inner--icon">
                        <i className="ni ni-fat-add" />
                    </span>
                    <span className="btn-inner--text" style={{marginLeft:"0.15em"}}>Add Product</span>
                    </Button>
                </div>
           
            </div>

        <Table className="align-items-center" responsive>
            <thead className="thead-light">
                <tr>
                    <th scope="col">SKU</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Edit/Delete</th>
                </tr>
            </thead>
            <tbody>
                    
                    {posts && posts.map(item => {
                      
                       
                        return (
                            <tr key = {item.id}>
                            
                        <ProductStruct
                            SKU={item.SKU}
                            productName={item.productName}
                            status={item.status}
                            quantity={item.quantity}
                        />
                  
                        </tr>
                        )
                    })}
        
            </tbody>
        </Table>
    
        <PaginationComponenent number ={ProductList.length} paginate = {paginate}/> 


    </>
    )
}
export default Products;