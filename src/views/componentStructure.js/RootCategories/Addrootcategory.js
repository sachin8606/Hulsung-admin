import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Label,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Button,
  Card,
  CardTitle,
} from "reactstrap";

const Addrootcategory = () => {


  const [categoryId, setCateId] = useState("");
  const [rootCid, setrootCid] = useState("");
  const [level, setlevel] = useState("");
  const [position, setposition] = useState("");
  const [cname, setcname] = useState("");
  const [isactive, setisactive] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState("");
  const [pageT, setpaget] = useState("");
  const [mkeywords, setmkeywords] = useState();
  const [metaDescription, setmetaDescripton] = useState("");
  const [nmenu, setnmenu] = useState();
  const [urlkey, seturlkey] = useState("");
  const [childs, setchilds] = useState("");
  const [metaKeywordsArray, setmetaKeywordsArray] = useState([]);

  function addMetaKeyword(){
    setmetaKeywordsArray(metaKeywordsArray=>[...metaKeywordsArray,JSON.stringify(mkeywords)]);
    setmkeywords();
    console.log(metaKeywordsArray)
  }

  function deleteselectedMetaKeyword(index){
    for(let i=0;i<metaKeywordsArray.length;i++){
      if(i === index){
        metaKeywordsArray.splice(index,1);
        const newmKeyArray = [...metaKeywordsArray];
        setmetaKeywordsArray(newmKeyArray);
      }
    }
  }

  useEffect(()=>{
    setmetaKeywordsArray(metaKeywordsArray)
  },[metaKeywordsArray])

  function addrootCategory() {
    axios.post(`http://localhost:4000/graphql?query=mutation{
    addrootCategory(
      level: ${level},
      category_id: "${categoryId}",
      position: "${position}",
      rootCategoryId: "${rootCid}",
      categoryName: "${cname}",
      active: ${isactive},
      description: "${description}",
      image: "${image}",
      pageTitle: "${pageT}",
      metaKeywords: [${metaKeywordsArray}],
      metaDescription: "${metaDescription}",
      navigationMenu: ${nmenu},
      urlKey: "${urlkey}",
      childs:  ${childs}
    ),{
      id
      level
    }
}`).then((result) => {
      if (result.status === 200) {
        console.log(result)
       
       var ele =  document.getElementById("alertBoxhide");
       ele.setAttribute('id','alertBoxshow')
        setTimeout(function(){ 
          ele.setAttribute('id','alertBoxhide')
         }, 3000);
      }
      setdefault();
    }).catch((err)=>alert(err))
  }


function setdefault(){
  setCateId("");
  setrootCid("");
  setlevel("");
  setposition("");
  setcname("");
  setisactive();
  setdescription("")
  setimage("")
  setpaget("")
  setmetaKeywordsArray([])
  setmkeywords("")
  setmetaDescripton("")
  document.getElementById("true").checked = false;
  document.getElementById("false").checked = false;
  document.getElementById("ntrue").checked = false;
  document.getElementById("nfalse").checked = false;
  seturlkey("")
  setchilds("")
}

  return (
    <>
     <div id="alertBoxhide">
        <p className="alertMessage"><i className="ni ni-check-bold"></i>Added successfully...</p>
      </div>
     <div className="headingTop">
        <h1 id="headingtopheading">Add new category: <span className="spanheadingtop">{cname}</span> </h1>
      </div>

      <Form className="form21">
        

        {/*1 row */}
        <Row>
          <Col md="3">
            <FormGroup>
              <Label for="rootCategoryId">Root Category Id</Label>
              <Input
                value={rootCid}
                id="exampleFormControlInput1"
                onChange={e => setrootCid(e.target.value)}
                type="text"
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="rootCategoryName">Root Category Name</Label>
              <Input type="text" value={cname} onChange={e => setcname(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>

        {/* 2 row */}
        <Row>
          <Col md="4">
            <FormGroup>
              <Label for="categoryId">Category Id</Label>
              <Input type="text" value={categoryId} onChange={e => setCateId(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="level">Level</Label>
              <Input type="number" value={level} onChange={e => setlevel(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="Position">Position</Label>
              <Input type="text" value={position} onChange={e => setposition(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>

        {/* 3 row */}
        <Row>

          <Col md="6" className="radioContainer">
            <FormGroup>
              <Label for="isactive">Active:</Label>
              <input className="radioinput" type="radio" id="true" name="isActive" onChange={e => setisactive(e.target.value)} value="true" />
              <label for="Yes" className="labelradio">Yes</label>
              <input type="radio" className="radioinput" id="false" name="isActive" onChange={e => setisactive(e.target.value)} value="false" />
              <label for="No" className="labelradio">No</label>
            </FormGroup>
          </Col>
        </Row>

        {/* 4 row */}
        <Row>
          <Col md="6">
            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="textarea" value={description} onChange={e => setdescription(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="image">Image</Label>
              <Input type="text" value={image} onChange={e => setimage(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>

        {/* 5 row */}
        <Row>
          <Col md="3">
            <FormGroup>
              <Label for="pagetitle">Page Title</Label>
              <Input type="text" value={pageT} onChange={e => setpaget(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label for="metakeywords">Meta Keywords</Label>
              <Input type="text" value={mkeywords} onChange={e => setmkeywords(e.target.value)} />
              <Button size="sm" style={{marginTop:"1px"}} onClick={()=>addMetaKeyword()}>Add</Button>
            </FormGroup>
          </Col>
          <Col md="6">
          <Card body>
                <CardTitle tag="h3" style={{textAlign:"center"}}>Selected MetaKeywords</CardTitle>
                <p>
                {metaKeywordsArray && metaKeywordsArray.map((item,index)=>{
                  return <div className="spanmetakeywords" key={index}>{JSON.parse(item)}<span className="spandeletemetakeywords" onClick={()=>deleteselectedMetaKeyword(index)}>❌ </span></div>
                })}
                </p>
                </Card>
          </Col>
        </Row>

        {/* 6 row */}
        <Row>
          <Col md="6">
            <FormGroup>
              <Label for="MetaDescription">Meta Description</Label>
              <Input type="textarea" value={metaDescription} onChange={e => setmetaDescripton(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md="6" className="radioContainer">
            <FormGroup >
              <Label for="NavigationMenu">Navigation Menu</Label>
              <input type="radio" className="radioinput" id="ntrue" name="isNm" onChange={e => setnmenu(e.target.value)} value="true" />
              <label for="Yes" className="labelradio">Yes</label>
              <input type="radio" className="radioinput" id="nfalse" name="isNm" onChange={e => setnmenu(e.target.value)} value="false" />
              <label for="No" className="labelradio">No</label>

            </FormGroup>
          </Col>
        </Row>

        {/* 7 row */}
        <Row>
          <Col md="6">
            <FormGroup>
              <Label for="UrlKey">URL Key</Label>
              <Input type="text" value={urlkey} onChange={e => seturlkey(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="childs">Childs</Label>
              <Input type="number" value={childs} onChange={e => setchilds(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>
      </Form>
      <div className="categoryExtraBtns">
      <Button className="btn-icon btn-3" color="primary" id="btncategoryaddnew" type="button" onClick={() => addrootCategory()}>
          <span className="btn-inner--icon">
            <i className="ni ni-fat-add" />
          </span>
          <span className="btn-inner--text" style={{marginLeft:"0.15em"}}>Add Root Category</span>
        </Button>
      </div>
    </>
  )
}
export default Addrootcategory;
