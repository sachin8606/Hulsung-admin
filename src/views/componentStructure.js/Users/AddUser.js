import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, CardText, CardTitle, Card } from 'reactstrap';
import Switch from 'react-switch';
import axios from 'axios';
import Adduserlogo from '../../../assets/img/myImages/adduserImg.png'

const AddUser = () => {

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastame] = useState("");
  const [role, setrole] = useState("");
  const [isActive, setisActive] = useState(false);
  const [mobile, setmobile] = useState("");
  const [subscribed, setsubscribed] = useState(false);
  const [password, setpassword] = useState("");
  const [avatar, setavatar] = useState("");
  const [email, setemail] = useState("");
  const [salt, setsalt] = useState("")
  const [wtpSubs, setwtpSubs] = useState(false);
  const [updatedat, setupdatedat] = useState(new Date());
  const [otp, setotp] = useState("");


  // Active

  function setisactivefunction() {
    if (isActive === false) {
      setisActive(true)
    }
    else {
      setisActive(false)
    }
  }


//   Is subscribed

function setisUserSubscribed(){
    if(subscribed === false){
        setsubscribed(true)
    }
    else{
        setsubscribed(false)
    }
}

//   Is whatsapp subscribed


  function setiswtsSubscribed(){
      if(wtpSubs === false){
          setwtpSubs(true)
      }
      else{
          setwtpSubs(false)
      }
  }




  // mutation($name:String, $email:String!, $type:String!, $phoneNumber:String!, $country:String, $city: String, $state: String, $zipcode: String, $address: String, $landmark: String, $gstNo: String, $tinNo: String, $servicable: Array, $type: String, $active: boolean, $businessCard: Array, $description: String, $avatar: String)



  // Add Vendor

  function addUser() {
    const data = {
      query:`{
        finduserByMobile(mobile:"${mobile}"){
            email
            firstname
        }
      }`
    }
    axios.post('http://localhost:4000/graphql', data).then((res)=>{
      console.log(res.data.data.finduserByMobile)
      if(res.data.data.finduserByMobile){
        alert("Already created")
      }
      else{
        nowaddUser()
      }
    }).catch((err)=>{
      console.log(err)
    })

    function nowaddUser(){
        var time = new Date();
        var minutesOffset = time.getTimezoneOffset()
        var millisecondsOffset = minutesOffset*60*1000
        var created_at = new Date(time - millisecondsOffset)
        created_at =  created_at.toISOString().substr(0, 10)
    axios.post(`http://localhost:4000/graphql?query=mutation{
        UserRegistration(
             firstname:"${firstname}",
             lastname:"${lastname}",
             password:"${password}",
             email:"${email}", 
             role:"${role}",
             mobileno:"${mobile}",
             active:${isActive}, 
             subscribe:${subscribed},
             salt:"salt",
             avatar:"${avatar}",
             wtpSubs:${wtpSubs},
             created_at:"${created_at}",
             updated_at:"${updatedat}",
             otp:"${otp}"
        ){
          id
          firstname
          email
          created_at
        }
      }`).then((res)=>{
        console.log(res)
        var data = res.data.data.UserRegistration;
        if(res.data.data.UserRegistration){
          var userId = data.id
            axios.post(`http://localhost:4000/graphql?query=mutation{
              createCart(
                user:"${userId}"
                ){
                  user
                }
            }`).then((response)=>{
              console.log(response)
              if(response.data.data.createCart){
                var ele =  document.getElementById("alertBoxhide");
                ele.removeAttribute('id');
                ele.setAttribute('id','alertBoxshow')
                 setTimeout(function(){ 
                   ele.removeAttribute('id');
                   ele.setAttribute('id','alertBoxhide')
                  }, 3000);
              }
              else{
                alert("Error creating cart");
              }
            }).catch((err)=>console.log(err))
           
        }
        else{
            alert("Error saving user");
        }
      })
      .catch((err)=>console.log(err))
    }
  }


  return (
    <>
     <div id="alertBoxhide">
        <p className="alertMessage">Updated successfully...</p>
      </div>
    <div className="designAddsection">
        <div className="designcontainuseraddheader">
            <img src={Adduserlogo} class="designaddimageheader" alt="preview"/>
        </div>
    </div>
      <Form className="form21">
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Label className="form-control-label" for="Name">First Name</Label>
              <Input type="text" className="inputClass" value={firstname} onChange={(e) => setfirstname(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label className="form-control-label">Last Name</Label>
              <Input type="text" className="inputClass" value={lastname} onChange={(e) => setlastame(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label className="form-control-label">Password</Label>
              <Input type="password" className="inputClass" value={password} onChange={(e) => setpassword(e.target.value)} />
            </FormGroup>
          </Col>
          
        </Row>
        <Row form>
        <Col md="4">
            <FormGroup style={{ display: "table", margin: "auto" }}>
              <Label className="form-control-label">User Active</Label>
              <br />
              <Switch onChange={() => setisactivefunction()} checked={isActive} />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup style={{ display: "table", margin: "auto" }}>
              <Label className="form-control-label">Subscribed</Label>
              <br />
              <Switch onChange={() => setisUserSubscribed()} checked={subscribed} />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup style={{ display: "table", margin: "auto" }}>
              <Label className="form-control-label">Whatsapp Subscription</Label>
              <br />
              <Switch onChange={() => setiswtsSubscribed()} checked={wtpSubs} />
            </FormGroup>
          </Col>
          </Row>
          <Row form> 
          <Col md={4}>
            <FormGroup>
              <Label className="form-control-label">Email</Label>
              <Input type="email" className="inputClass" value={email} onChange={(e) => setemail(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label className="form-control-label">Role</Label>
              <Input type="text" className="inputClass" value={role} onChange={(e) => setrole(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label className="form-control-label">Phone number</Label>
              <Input type="text" className="inputClass" value={mobile} onChange={(e) => setmobile(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label className="form-control-label">Avatar</Label>
              <Input type="text" className="inputClass" value={avatar} onChange={(e) => setavatar(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
         <Col md={3}>
         <FormGroup>
              <Label className="form-control-label">Updated at</Label>
              <Input type="date" className="inputClass" value={updatedat} onChange={(e) => setupdatedat(e.target.value)} />
            </FormGroup>
         </Col>
         <Col md={3}>
         <FormGroup>
              <Label className="form-control-label">OTP</Label>
              <Input type="text" className="inputClass" value={otp} onChange={(e) => setotp(e.target.value)} />
            </FormGroup>
         </Col>
        </Row>
        <div className="categoryExtraBtns" style={{ "display": "flex", "flex-direction": "row-reverse" }}>
          <Button className="btn-icon btn-3" color="primary" id="btncategoryaddnew" type="button" onClick={() => addUser()}>
            <i class="fas fa-plus    "></i>  <span className="btn-inner--text" style={{ marginLeft: "0.15em" }}>Add User</span>
          </Button>
        </div>
      </Form>
    </>
  );
}

export default AddUser;