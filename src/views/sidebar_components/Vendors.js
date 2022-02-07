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
import VendorStruct from 'views/componentStructure.js/Vendors/VendorStruct';
const Vendors = ()=>{


    const [VendorList, setVendorList] = useState([]);
    const[currentVendors, setcurrentVendors] = useState(1);
    const [searchtypedValue, setSearchTypedValue] = useState("");
    const [obtainedsearchresults, setobtainedsearchresults] = useState([]);
    useEffect(() => {
       axios.post(`http://localhost:4000/graphql?query={
        vendorList{
            id
            name
            state
            active
              },
}`).then((result) => {
            setVendorList(result.data.data.vendorList)
            });
    }, [])

    function addnewVendor(){
        window.location.assign('/admin/addVendor');
    }


    function searchVendor(){
        axios.post(`http://localhost:4000/graphql?query={
            searchVendors(tag:"${searchtypedValue}"){
             id
             name
            }
          }`).then((result) => {
              console.log(result)
            setobtainedsearchresults(result.data.data.searchVendors);
          });
        }


    function gotoVendorDetails(){

    }


    // Pagination


    const indexofLastPost = currentVendors*10; 
    const indexofFirstPost = indexofLastPost-10;
    const posts = VendorList.slice(indexofFirstPost,indexofLastPost);
    const paginate =(pageNo)=>{setcurrentVendors(pageNo)};


    return(
        <>
        <Header />
        <div className="categoryExtraBtns">
                <div className="searchRecordMainLeft">
                    <input type="text" className="searchBarinput" placeholder= "Look for vendor" value={searchtypedValue} onChange={(e)=>setSearchTypedValue(e.target.value)}/>
                    <button className="searchBarBtn" onClick={()=>searchVendor()}><i class="fa fa-search" aria-hidden="true"></i></button>
                    <ListGroup>
                    {obtainedsearchresults && obtainedsearchresults.map(item => {
                      return (
                          <>
                        <ListGroupItem key={item.id} onClick={() => gotoVendorDetails(item.SKU)}>{item.name}</ListGroupItem>
                        </>
                      )
                    })}
                  </ListGroup>
                    
                </div>

                <div className="addNewRecordMainright">
                    <Button className="btn-icon btn-3" outline id="btncategoryaddnew" type="button" onClick={()=>{addnewVendor()}}>
                    <span className="btn-inner--icon">
                        <i className="ni ni-fat-add" />
                    </span>
                    <span className="btn-inner--text" style={{marginLeft:"0.15em"}}>Add Vendor</span>
                    </Button>
                </div>
           </div>

        <Table className="align-items-center" responsive>
            <thead className="thead-light">
                <tr>
                    <th scope="col">Vendor Name</th>
                    <th scope="col">State</th>
                    <th scope="col">Active</th>
                    <th scope="col">Edit/Delete</th>
                </tr>
            </thead>
            <tbody>
                    
                    {posts && posts.map(item => {
                      
                       
                        return (
                            <tr key={item.id}>
                            
                        <VendorStruct
                            id={item.id}
                            name={item.name}
                            State={item.state}
                            Active={item.active}
                        />
                  
                        </tr>
                        )
                    })}
        
            </tbody>
        </Table>
    
        <PaginationComponenent number ={VendorList.length} paginate = {paginate}/> 


    </>
    )
}
export default Vendors;