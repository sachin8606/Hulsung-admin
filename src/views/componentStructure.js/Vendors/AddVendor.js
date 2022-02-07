import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, CardText, CardTitle, Card } from 'reactstrap';
import Switch from 'react-switch';
import axios from 'axios';
import VendorLogo from '../../../assets/img/myImages/addvendorlogo.jpg'

const AddVendor = () => {

  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [country, setcountry] = useState("");
  const [city, setcity] = useState("");
  const [state, setState] = useState("");
  const [zip, setzip] = useState("");
  const [address, setaddress] = useState("");
  const [landmark, setlandmark] = useState("");
  const [gst, setgst] = useState("");
  const [tin, settin] = useState("");
  const [isActive, setisActive] = useState(false)
  const [type, settype] = useState("");
  const [description, setdescription] = useState("");
  const [avatar, setavatar] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [ImageArray, setImageArray] = useState([]);
  const [selectedservicable, setselectedservicable] = useState();
  const [servicableArray, setservicableArray] = useState([]);
  const [vendorUserId, setvendorUserId] = useState();

  // Active

  function setisactivefunction() {
    if (isActive === false) {
      setisActive(true)
    }
    else {
      setisActive(false)
    }
  }


  // servicable Related

  function addtolistservicable() {
    if (selectedservicable) {
      setservicableArray(servicableArray => [...servicableArray,JSON.stringify(selectedservicable)])
      setselectedservicable();
    }
    else {
      alert("Type something First");
    }
  }

  function deleteServeceablefromList(index) {
    for (let i = 0; i < servicableArray.length; i++) {
      if (index === i) {
        servicableArray.splice(index, 1)
        const newservicableArray = [...servicableArray]
        setservicableArray(newservicableArray)
      }
    }
  }

  useEffect(() => {
    setservicableArray(servicableArray)
  }, [servicableArray])


  // Images Related


  const setImg = (e) => {
    var imageFile = e.target.files[0];
    setSelectedImage(imageFile.name);
    var oFReader = new FileReader();
    oFReader.readAsDataURL(imageFile);

    oFReader.onload = function (oFREvent) {
      document.getElementById("uploadPreview").src = oFREvent.target.result;
    };
  }

  // Add To List Images


  function addtolistImages() {
    setImageArray(ImageArray => [...ImageArray,selectedImage])
  }

  useEffect(() => {
    setImageArray(ImageArray)
  }, [ImageArray])

  // Delete Image

  function delselectedImage(id) {
    deletefromServer(ImageArray[id])
    for (let i = 0; i < ImageArray.length; i++) {
      if (id === i) {
        ImageArray.splice(id, 1)
        const newImageArray = [...ImageArray]
        setImageArray(newImageArray)
      }
    }
  }

  // mutation($name:String, $email:String!, $type:String!, $phoneNumber:String!, $country:String, $city: String, $state: String, $zipcode: String, $address: String, $landmark: String, $gstNo: String, $tinNo: String, $servicable: Array, $type: String, $active: boolean, $businessCard: Array, $description: String, $avatar: String)


  // Add image to server

  function uploadimagetoserver(e){
    e.preventDefault();
    if(selectedImage){
    addtolistImages();
    const formData = new FormData();
    var file = document.getElementById('imagesListvendor').files[0];
    formData.append('file',file)
    axios({
      method: 'post',
      url: 'http://127.0.0.1:4000/uploadvendorsshopimages',
      data: formData,
    }).then((response)=>{
      console.log("Image saved")
    }).catch((e)=>{
      alert(e)
    })
  }
  else{
    alert("Select an image first")
  }
  }

  // Delete image from server

  function deletefromServer(imageName) {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:4000/deletevendorshopImage',
      data: {
        "name": imageName
      }
    }).then((response) => {
    }).catch((e) => {
      console.log(e)
    })
  }

  // Add Vendor

  function addVendor() {
    const data = {
      query:`{
        finduserByMobile(mobile:"${mobile}"){
            id
            email
            firstname
        }
      }`
    }
    axios.post('http://localhost:4000/graphql', data).then((res)=>{
      if(res.data.data.finduserByMobile){
        var d = res.data.data.finduserByMobile;
        setvendorUserId(d.id)
      }
      else{
        addNewUserVendor();
      }
      nowaddVendor();
    }).catch((err)=>{
      console.log(err)
    })

    // const data = await axios.post('http://localhost:4000/graphql', {
    //   query: `mutation addVendor($name:String!, $email:String!, $type:String!, $phoneNumber:String!, $country:String, $city: String, $state: String, $zipcode: String, $address: String, $landmark: String, $gstNo: String, $tinNo: String, $servicable: Array, $type: String, $active: boolean, $businessCard: Array, $description: String, $avatar: String){
    //    addVendor(name:$name,email:$email, phoneNumber:$phoneNumber,country:$country,city:$city, state:$state,zipcode:$zipcode, address:$address, landmark:$landmark, gstNo:$gstNo, tinNo:$tinNo, servicable:$servicable, type:$type, active:$active, businessCard:$businessCard, description:$description, avatar:$avatar){
    //     name
    //     email
    //   }
    // }
    //   }`,
    //   variables: {
    //     name: name,
    //     email: email,
    //     phoneNumber: mobile,
    //     country: country,
    //     city: city,
    //     state: state,
    //     zipcode: zip,
    //     address: address,
    //     landmark: landmark,
    //     gstNo: gst,
    //     tinNo: tin,
    //     servicable: servicableArray,
    //     type: type,
    //     active: isActive,
    //     businessCard: ImageArray,
    //     description: description,
    //     avatar: avatar
    //   }
    // }, {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }
    // )



    function addNewUserVendor(){
      var time = new Date();
      var minutesOffset = time.getTimezoneOffset()
      var millisecondsOffset = minutesOffset*60*1000
      var created_at = new Date(time - millisecondsOffset)
      created_at =  created_at.toISOString().substr(0, 10)
  axios.post(`http://localhost:4000/graphql?query=mutation{
      UserRegistration(
           firstname:"${name}",
           lastname:"Singh",
           password:"${password}",
           email:"${email}", 
           role:"vendor",
           mobileno:"${mobile}",
           active:${isActive}, 
           subscribe:true,
           salt:"salt",
           avatar:"${avatar}",
           wtpSubs:true,
           created_at:"${created_at}",
           updated_at:"${created_at}",
           otp:"23334"
      ){
        id
      }
    }`).then((res)=>{
      if(res.data.data.UserRegistration){
        var response = res.data.data.UserRegistration;
        setvendorUserId(response.id)
      }
      else{
          alert("Error saving user");
      }
    })
    .catch((err)=>console.log(err))
  }

    function nowaddVendor(){

    for(let i = 0;i<ImageArray.length;i++){
      ImageArray[i] = JSON.stringify(ImageArray[i])
    }
    
    axios.post(`http://localhost:4000/graphql?query=mutation{
        addVendor(
             user: "${vendorUserId}",
             name:"${name}",
             password:"${password}"
             email:"${email}", 
             phoneNumber:"${mobile}",
             country:"${country}",
             city:"${city}", 
             state:"${state}",
             zipcode:"${zip}", 
             address:"${address}", 
             landmark:"${landmark}", 
             gstNo:"${gst}", 
             tinNo:"${tin}", 
             servicable:[${servicableArray}], 
             type:"${type}",
             active:${isActive}, 
             businessCard:[${ImageArray}], 
             description:"${description}", 
             avatar:"${avatar}"
        ){
          id
          name
          email
        }
      }`).then((res)=>{
        var ele =  document.getElementById("alertBoxhide");
        ele.removeAttribute('id');
        ele.setAttribute('id','alertBoxshow')
         setTimeout(function(){ 
           ele.removeAttribute('id');
           ele.setAttribute('id','alertBoxhide')
          }, 3000);
      })
      .catch((err)=>console.log(err))
    

    }

    //     const body =  {
    //       mutation:`
    //         {
    //           addVendor(
    //             name:$name,
    //               email:$email, 
    //               phoneNumber:$phoneNumber,
    //               country:$country,
    //               city:$city, 
    //               state:$state,
    //               zipcode:$zipcode, 
    //               address:$address, 
    //               landmark:$landmark, 
    //               gstNo:$gstNo, 
    //               tinNo:$tinNo, 
    //               servicable:$servicable, 
    //               type:$type, active:$active, 
    //               businessCard:$businessCard, 
    //               description:$description, 
    //               avatar:$avatar
    //               ){ 
    //             name
    //            email
    //           }
    //         }
    //       `,
    //       variables: {
    //         names:name,
    //         email:email,
    //         phoneNumber:mobile,
    //         country:country,
    //         city:city,
    //         state:state,
    //         zipcode:zip,
    //         address:address,
    //         landmark:landmark,
    //         gstNo:gst,
    //         tinNo:tin,
    //         servicable:servicableArray,
    //         type:type,
    //         active:isActive,
    //         businessCard:ImageArray,
    //         description:description,
    //         avatar:avatar

    //       },
    //     }
    //     console.log(body)
    //     axios.post(`http://localhost:4000/graphql`, body ,options)
    //     .then((res) => {
    //     console.log(res)
    //   })
    // .catch(err => console.log(err))
  }


  return (
    <>
     <div id="alertBoxhide">
        <p className="alertMessage">Updated successfully...</p>
      </div>
     <div className="designAddsection">
        <div className="designcontainuseraddheader">
            <img src={VendorLogo} class="designaddimageheader" alt="preview"/>
        </div>
    </div>
      <Form className="form21" onSubmit={uploadimagetoserver} encType="multipart-form-data">
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Label className="form-control-label" for="Name">Vendor Name</Label>
              <Input type="text" className="inputClass" value={name} onChange={(e) => setname(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label className="form-control-label">Password</Label>
              <Input type="password" className="inputClass" value={password} onChange={(e) => setpassword(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label className="form-control-label">Email</Label>
              <Input type="email" className="inputClass" value={email} onChange={(e) => setemail(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md="2">
            <FormGroup style={{ display: "table", margin: "auto" }}>
              <Label className="form-control-label">Active</Label>
              <br />
              <Switch onChange={() => setisactivefunction()} checked={isActive} />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label className="form-control-label">Phone number</Label>
              <Input type="text" className="inputClass" value={mobile} onChange={(e) => setmobile(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label className="form-control-label">Country</Label>
              <Input type="text" className="inputClass" value={country} onChange={(e) => setcountry(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label className="form-control-label">Avatar</Label>
              <Input type="text" className="inputClass" value={avatar} onChange={(e) => setavatar(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label className="form-control-label" for="exampleCity">City</Label>
              <Input type="text" name="city" id="exampleCity" value={city} className="inputClass" onChange={(e) => setcity(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label className="form-control-label" for="exampleState">State</Label>
              <Input type="text" name="state" id="exampleState" value={state} className="inputClass" onChange={(e) => setState(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label className="form-control-label" for="exampleZip">Zip</Label>
              <Input type="text" name="zip" id="exampleZip" value={zip} className="inputClass" onChange={(e) => setzip(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>
        <Row Form>
          <Col md={6}>
            <FormGroup>
              <Label className="form-control-label" for="Address">Address</Label>
              <Input type="textarea" className="inputClass" value={address} onChange={(e) => setaddress(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label className="form-control-label" for="landmark">Landmark</Label>
              <Input type="text" className="inputClass" value={landmark} onChange={(e) => setlandmark(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>
        <Row Form>
          <Col md={3}>
            <FormGroup>
              <Label className="form-control-label" for="Gst">GST No.</Label>
              <Input type="text" className="inputClass" value={gst} onChange={(e) => setgst(e.target.value)} />
            </FormGroup>

          </Col>
          <Col md={3}>
            <FormGroup>
              <Label className="form-control-label" for="Tin no">TIN No.</Label>
              <Input type="text" className="inputClass" value={tin} onChange={(e) => settin(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label className="form-control-label">Type</Label>
              <Input type="text" className="inputClass" value={type} onChange={(e) => settype(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            <Card body>
              <CardTitle tag="h3">servicable</CardTitle>
              <FormGroup>
                <Input type="text" className="inputClass" value={selectedservicable} onChange={(e) => setselectedservicable(e.target.value)} />

                <Button size="sm" onClick={addtolistservicable}>Add</Button>
              </FormGroup>
              <div>
                <h3>List</h3>
                {servicableArray && servicableArray.map((item, index) => {
                  return <CardText key={index}>{item}<i onClick={() => deleteServeceablefromList(index)} class="fa fa-trash" aria-hidden="true" style={{ color: "red", marginLeft: "8px" }}></i></CardText>
                })}
              </div>
            </Card>
          </Col>
          <Col md={7}>
            <Card body>
              <CardTitle tag="h3">Images</CardTitle>
              <img id="uploadPreview" style={{ width: "100px", height: "100px" }} />
              <input type="file" id="imagesListvendor" onChange={setImg} />
              <Button size="sm" type="submit">Add</Button>
              <div>
                <h3>Selected Images</h3>
                {ImageArray && ImageArray.map((item, index) => {
                  return <CardText key={index}>{item}<i onClick={() => delselectedImage(index)} class="fa fa-trash" aria-hidden="true" style={{ color: "red", marginLeft: "8px" }}></i></CardText>
                })}
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label className="form-control-label">Description</Label>
              <Input type="textarea" className="inputClass" value={description} onChange={(e) => setdescription(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>
        <div className="categoryExtraBtns" style={{ "display": "flex", "flex-direction": "row-reverse" }}>
          <Button className="btn-icon btn-3" color="primary" id="btncategoryaddnew" type="button" onClick={() => addVendor()}>
            <i class="fas fa-plus    "></i>  <span className="btn-inner--text" style={{ marginLeft: "0.15em" }}>Add Vendor</span>
          </Button>
        </div>
      </Form>
    </>
  );
}

export default AddVendor;