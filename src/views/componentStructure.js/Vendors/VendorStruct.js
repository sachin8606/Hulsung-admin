import {
    Badge,
    Media,
    Button
  
  } from "reactstrap";
  import axios from 'axios';
  
  
  
  
  const VendorStruct = (props) => {
  
  const edit = (e) => {
      window.location.assign("/editProduct/" + e);
    }
  
  
    const delet = (e) => {
      var decision = window.confirm("Are you sure you want to delete this vendor?")
      if(decision === true){
      axios.post(`http://localhost:4000/graphql?query=mutation{
              deleteVendor(id:"${e}"),{
                id
              }
  }`).then((result) => {
        if (result.status === 200) {
          window.location.reload(true);
        }
      });
    }
    }
  
  
  
  
  
    return (
      <>
        <th id="th" scope="row">
          <Media className="align-items-center">
            <Media>
              <span className="mb-0 text-sm" id="span1">
                {props.name}
              </span>
            </Media>
          </Media>
        </th>
        <td className="td">{props.State}</td>
        <td className="td">
          <Badge color="" className="badge-dot mr-4">
            <i className="bg-warning" />
            {props.Active.toString()}
          </Badge>
        </td>
        <td className="text td">
          <Button className="btn-icon" size="sm" onClick={() => edit(props.id)} type="button">
            <span className="btn-inner--icon">
              <i className="fas fa-edit text-blue" />
            </span>
          </Button>
          <Button className="btn-icon" onClick={() => delet(props.id)} size="sm" type="button" >
            <span className="btn-inner--icon">
              <i className="fas fa-trash text-danger" />
            </span>
          </Button>
  
        </td>
  
      </>
    )
  
  
  }
  
  
  export default VendorStruct;