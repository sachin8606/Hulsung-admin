import React, { useEffect, useState } from 'react';
import Header from "components/Headers/Header.js";
import {
    Table,
    Button,
    ListGroup,
    ListGroupItem

} from "reactstrap";
import '../../assets/my-css.css';
import CategoryStruct from 'views/componentStructure.js/RootCategories/CategoryStruct';
import PaginationComponenent from 'views/componentStructure.js/Pagination';

import axios from "axios";
var i =0;
const Categories = () => {

    const [categoryList, setCategoryList] = useState("");
    const[currentPosts, setCurrentPosts] = useState(1);
    const [searchtypedValue, setSearchTypedValue] = useState("");
    const[obtainedsearchresults, setobtainedsearchresults] = useState();
    
   
    useEffect(() => {
       axios.post(`http://localhost:4000/graphql?query={
            rootCategoriesList{
                id
                category_id
                active
                categoryName
              },
}`).then((result) => {
            setCategoryList(result.data.data.rootCategoriesList);
            });
    }, [])

    function addnewrctgry(){
        window.location.assign('/admin/addRootCategory');
    }


    function searchCategory() {
        axios.post(`http://localhost:4000/graphql?query={
          searchCategory(tag:"${searchtypedValue}"){
           id
           categoryName
          }
        }`).then((result) => {
          setobtainedsearchresults(result.data.data.searchCategory);
        });
      }

    function gotoRootCategory(id){
        setSearchTypedValue("")
        window.location.assign("/admin/editRootCategory/" + id);
    }



 // Pagination

    const indexofLastPost = currentPosts*10; 
    const indexofFirstPost = indexofLastPost-10;
    const posts = categoryList.slice(indexofFirstPost,indexofLastPost);
    const paginate =(pageNo)=>{setCurrentPosts(pageNo)};


    return (
        <>
            <Header />
            <div className="categoryExtraBtns">
                <div className="searchRecordMainLeft">
                    <input type="text" className="searchBarinput" placeholder="Enter Category Name" value={searchtypedValue } onChange={(e)=>setSearchTypedValue(e.target.value)}/>
                    <button className="searchBarBtn" onClick={()=>searchCategory()}><i class="fa fa-search" aria-hidden="true"></i></button>
                    <ListGroup>
                    {obtainedsearchresults && obtainedsearchresults.map(item => {
                      return (
                        <ListGroupItem key={item.id} onClick={() => gotoRootCategory(item.id)}>{item.categoryName}</ListGroupItem>
                      )
                    })}
                  </ListGroup>
                    
                </div>

                <div className="addNewRecordMainright">
                    <Button className="btn-icon btn-3" outline id="btncategoryaddnew" type="button" onClick={()=>{addnewrctgry()}}>
                    <span className="btn-inner--icon">
                        <i className="ni ni-fat-add" />
                    </span>
                    <span className="btn-inner--text" style={{marginLeft:"0.15em"}}>Add Root Category</span>
                    </Button>
                </div>
           
            </div>

            <Table className="align-items-center" responsive>
                <thead className="thead-light">
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Category Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Category Id</th>
                        <th scope="col">Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                        
                        {posts && posts.map(item => {
                          
                           
                            return (
                                <tr>
                                
                            <CategoryStruct
                                index = {++i}
                                id={item.id}
                                status={item.active}
                                CategoryName={item.categoryName}
                                Category_id={item.category_id}
                                key = {item.id}
                            />
                      
                            </tr>
                            )
                        })}
            
                </tbody>
            </Table>
        
            <PaginationComponenent number ={categoryList.length} paginate = {paginate}/> 


        </>
    );
}


export default Categories;