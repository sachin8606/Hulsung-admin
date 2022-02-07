import {
  Badge,
  Media,
  Button

} from "reactstrap";
import axios from 'axios';




const CategoryStruct = (props) => {

const edit = (e) => {
  window.location.assign("/admin/editRootCategory/" + e);
  }

  const delet = (e) => {
    var decision = window.confirm("Are u sure?");
    if(decision === true){
    axios.post(`http://localhost:4000/graphql?query=mutation{
            deleterootcategory(id:"${e}"),{
              id
            }
}`).then((result) => {
      if (result.status === 200) {
       window.location.reload(true) 
      }
    });
  }
}





  return (
    <>
      <th id="th" scope="row" key={props.key}>
        <Media className="align-items-center">
          <Media>
            <span className="mb-0 text-sm" id="span1">
              {props.id}
            </span>
          </Media>
        </Media>
      </th>
      <td className="td">{props.CategoryName}</td>
      <td className="td">
        <Badge color="" className="badge-dot mr-4">
          <i className="bg-warning" />
          {props.status.toString()}
        </Badge>
      </td>
      <td className="td">
        <div className="d-flex align-items-center">
          {props.Category_id}
        </div>
      </td>
      <td className="text td">
        <Button className="btn-icon" size="sm" onClick={() => edit(props.id)} type="button">
          <span className="btn-inner--icon">
            <i class="fas fa-edit text-blue" />
          </span>
        </Button>
        <Button className="btn-icon" onClick={() => delet(props.id)} size="sm" type="button" >
          <span className="btn-inner--icon">
            <i class="fas fa-trash text-danger" />
          </span>
        </Button>

      </td>

    </>
  )


}


export default CategoryStruct;