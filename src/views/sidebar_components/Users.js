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
import UserStruct from 'views/componentStructure.js/Users/UserStruct';
const Users = ()=>{

    const [obtainedsearchresults, setobtainedsearchresults] = useState([]);
    const [searchtypedValue, setSearchTypedValue] = useState("");
    const [UserList, setUserList] = useState("");
    const[currentUsers, setcurrentUsers] = useState(1);
    
   
    useEffect(() => {
       axios.post(`http://localhost:4000/graphql?query={
        users{
            id
            firstname
            lastname
            active
            created_at
              },
}`).then((result) => {
    console.log(result)
            setUserList(result.data.data.users)
            });
    }, [])

    // function addnewProduct(){
    //     window.location.assign('/products/adProduct/');
    // }


    //Go to Add new user function

    function addnewUser(){
        window.location.assign('/admin/addUser')
    }


    function searchUser(){
        axios.post(`http://localhost:4000/graphql?query={
            searchuserbyName(tag:"${searchtypedValue}"){
            id
            firstname
            lastname
            }
          }`).then((result) => {
              console.log(result)
            setobtainedsearchresults(result.data.data.searchuserbyName);
          });
    }

    function gotoUserDetails(id){
        window.location.assign("/admin/editUserDetails/" + id);
    }

    // Pagination

    const indexofLastPost = currentUsers*10; 
    const indexofFirstPost = indexofLastPost-10;
    const posts = UserList.slice(indexofFirstPost,indexofLastPost);
    const paginate =(pageNo)=>{setcurrentUsers(pageNo)};


    return(
        <>
        <Header />
        <div className="categoryExtraBtns">
                <div className="searchRecordMainLeft">
                    <input type="text" className="searchBarinput" placeholder="Enter User Name" value={searchtypedValue} onChange={(e)=>setSearchTypedValue(e.target.value)}/>
                    <button className="searchBarBtn" onClick={()=>searchUser()}><i class="fa fa-search" aria-hidden="true"></i></button>
                    <ListGroup>
                    {obtainedsearchresults && obtainedsearchresults.map(item => {
                      return (
                          <>
                        <ListGroupItem key={item.id} onClick={() => gotoUserDetails(item.id)}>{item.firstname + " "+ item.lastname}</ListGroupItem>
                        </>
                      )
                    })}
                  </ListGroup>
                    
                </div>

                <div className="addNewRecordMainright">
                    <Button className="btn-icon btn-3" outline id="btncategoryaddnew" type="button" onClick={()=>{addnewUser()}}>
                    <span className="btn-inner--icon">
                        <i className="ni ni-fat-add" />
                    </span>
                    <span className="btn-inner--text" style={{marginLeft:"0.15em"}}>Add User</span>
                    </Button>
                </div>
           
            </div>
        <Table className="align-items-center" responsive>
            <thead className="thead-light">
                <tr>
                    <th scope="col">User ID</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Active</th>
                    <th scope="col">Created on</th>
                    <th scope="col">Edit/Delete</th>
                </tr>
            </thead>
            <tbody>
                    
                    {posts && posts.map(item => {
                       
                        return (
                            <tr key = {item.id}>
                            
                        <UserStruct
                            id={item.id}
                            name={item.firstname + " "+item.lastname}
                            status={item.active}
                            created_at={item.created_at}
                        />
                  
                        </tr>
                        )
                    })}
        
            </tbody>
        </Table>
    
        <PaginationComponenent number ={UserList.length} paginate = {paginate}/> 


    </>
    )
}
export default Users;