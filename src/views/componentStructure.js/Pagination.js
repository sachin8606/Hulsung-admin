import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginationComponenent =(props)=>{
  // console.log(props)

const Page = [];

for(let i = 1;i<=Math.ceil(props.number/10);i++){
  Page.push(i);
}

function activePage(no){
  var ele =  document.getElementsByClassName("paginationLinks");
  for(let i = 0;i<ele.length;i++){
    if(i === no){
      ele[i].setAttribute('id','activePaginationLink')
    }
    else{
    ele[i].removeAttribute('id');
    }
  }
}
 

return(
    <>
      <nav aria-label="Page navigation example">
      <Pagination className="pagination justify-content-end" listClassName="justify-content-end">
         {Page.map((number,index)=>{
           if(index === 0){
           return(
           <PaginationItem key={number} onClick={()=>activePage(index)}>
            <PaginationLink className="paginationLinks"  id="activePaginationLink" onClick={()=>props.paginate(number)}>
              {number}  
            </PaginationLink>
        </PaginationItem>
           )
           }
           else{
            return(
              <PaginationItem key={number} onClick={()=>activePage(index)}>
               <PaginationLink className="paginationLinks" onClick={()=>props.paginate(number)}>
                 {number}  
               </PaginationLink>
           </PaginationItem>
              )
           }
         })}
         
      </Pagination>
  </nav>       
</>
)
}
export default PaginationComponenent;