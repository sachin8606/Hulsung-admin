import React, { useEffect, useState } from "react";
import axios from "axios";


// reactstrap components
import {
  Label,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Button,
  Card,
  CardTitle
} from "reactstrap";



const EditRootCategory = (props) => {
  const [ctname, setctname] = useState();
  const [categoryId, setCateId] = useState("");
  const [rootCid, setrootCid] = useState("");
  const [level, setlevel] = useState("");
  const [position, setposition] = useState("");
  const [cname, setcname] = useState("");
  const [isactive, setisactive] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState("");
  const [pageT, setpaget] = useState("");
  const [metakeywords, setmetakeywords] = useState([]);
  const [metaDescription, setmetaDescripton] = useState("");
  const [nmenu, setnmenu] = useState();
  const [urlkey, seturlkey] = useState("");
  const [childs, setchilds] = useState("");
  const [mkey, setmkey] = useState();
 

  var d;
  var isFirst = true;

  useEffect(() => {
    axios.post(`http://localhost:4000/graphql?query={
        rootCategoryDetail(id:"${props.match.params.id}"){
          id
          level
          category_id
          position
          rootCategoryId
          categoryName
          active
          description
          image
          pageTitle
          metaKeywords
          metaDescription
          navigationMenu
          urlKey
          childs
        }
      }`).then((result) => {
      setctname(result.data.data.rootCategoryDetail.categoryName)
      d = result.data.data.rootCategoryDetail;
      Tool();
    });
  }, [])


 



  const Tool = () => {
    if (d.active === true) {
      document.getElementById('trueisActive').checked = true;
      setisactive("true")
    }
    else {
      document.getElementById('falseisActive').checked = true;
      setisactive("false");
    }
    setlevel(d.level);
    setCateId(d.category_id);
    setposition(d.position);
    setrootCid(d.rootCategoryId);
    setcname(d.categoryName);
    setdescription(d.description);
    setimage(d.image);
    setpaget(d.pageTitle);
    setmetakeywords(d.metaKeywords)

    setmetaDescripton(d.metaDescription)
    seturlkey(d.urlKey)
    setchilds(d.childs)

    if (d.navigationMenu === true) {
      document.getElementById('truenmenu').checked = true;
      setnmenu("true")
    }
    else {
      document.getElementById('falsenmenu').checked = true;
      setnmenu("false")
    }
    

  }




  function deleteselectedMetaKeyword(index) {
    for (let i = 0; i < metakeywords.length; i++) {
      if (i === index) {
        metakeywords.splice(index, 1);
        const newmkeywordArray = [...metakeywords];
        console.log(newmkeywordArray)
        setmetakeywords(newmkeywordArray);
      }
    }
  }



  function addnewmetaKeys() {
    setmetakeywords(metaKeywords => [...metaKeywords, mkey])
    setmkey()
  }

  const updateRootCtgry = () => {
    if (isFirst) {
      for (let i = 0; i < metakeywords.length; i++) {
        metakeywords[i] = JSON.stringify(metakeywords[i])
      }
      isFirst = false;
    }
  else {
    for (let i = 0; i < metakeywords.length; i++) {
      metakeywords[i] = JSON.parse(metakeywords[i])
    }
    for (let i = 0; i < metakeywords.length; i++) {
      metakeywords[i] = JSON.stringify(metakeywords[i])
    }
    }

    axios.post(`http://localhost:4000/graphql?query=mutation{
    updaterootCategory(
      id:"${props.match.params.id}",
      level: ${level},
      category_id: "${categoryId}",
      position: "${position}",
      rootCategoryId: "${rootCid}",
      categoryName: "${cname}",
      active: ${isactive},
      description: "${description}",
      image: "${image}",
      pageTitle: "${pageT}",
      metaKeywords: [${metakeywords}],
      metaDescription: "${metaDescription}",
      navigationMenu: ${nmenu},
      urlKey: "${urlkey}",
      childs:  ${childs}
    ){
      level
      position
    }
}`).then((result) => {
      if (result.status === 200) {
        var ele =  document.getElementById("alertBoxhide");
        ele.removeAttribute('id');
        ele.setAttribute('id','alertBoxshow')
        setTimeout(function(){ 
          ele.removeAttribute('id');
          ele.setAttribute('id','alertBoxhide')
         }, 3000);
      }

    }).catch((err) => alert(err))
  }


 
  return (
    <>
      <div id="alertBoxhide">
        <p className="alertMessage"><i class="fa fa-check" aria-hidden="true"></i> Updated successfully...</p>
      </div>

      <div className="headingTop">
        <h1 style={{color:"beige",fontFamily:"emoji"}}>Category Details for: <span className="spanheadingtop">{ctname}</span> </h1>
      </div>
      <Form className="form21">

        {/*1 row */}
        <Row>
          <Col md="3">
            <FormGroup>
              <Label className="form-control-label" for="rootCategoryId">Root Category Id</Label>
              <Input
                value={rootCid}
                id="exampleFormControlInput1"
                onChange={e => setrootCid(e.target.value)}
                type="text"
                className="form-control-alternative form-control"
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label className="form-control-label" for="rootCategoryName">Root Category Name</Label>
              <Input className="form-control-alternative form-control" type="text" value={cname} onChange={e => setcname(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>

        {/* 2 row */}
        <Row>
          <Col md="4">
            <FormGroup>
              <Label className="form-control-label" for="categoryId">Category Id</Label>
              <Input className="form-control-alternative form-control" type="text" value={categoryId} onChange={e => setCateId(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label className="form-control-label" for="level">Level</Label>
              <Input className="form-control-alternative form-control" type="number" value={level} onChange={e => setlevel(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label className="form-control-label" for="Position">Position</Label>
              <Input className="form-control-alternative form-control" type="text" value={position} onChange={e => setposition(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>

        {/* 3 row */}
        <Row>

          <Col md="6" className="radioContainer">
            <FormGroup>
              <Label className="form-control-label" for="isactive">Active:</Label>
              <input className="radioinput" type="radio" id="trueisActive" name="isActive" onChange={e => setisactive(e.target.value)} value="true" />
              <Label className="form-control-label" class="form-control-label" for="Yes" className="Labelradio">Yes</Label>
              <input type="radio" className="radioinput" id="falseisActive" name="isActive" onChange={e => setisactive(e.target.value)} value="false" />
              <Label className="form-control-label" class="form-control-label" for="No" className="Labelradio">No</Label>
            </FormGroup>
          </Col>
        </Row>

        {/* 4 row */}
        <Row>
          <Col md="6">
            <FormGroup>
              <Label className="form-control-label" for="description">Description</Label>
              <Input type="textarea" value={description} onChange={e => setdescription(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label className="form-control-label" for="image">Image</Label>
              <Input type="text" value={image} onChange={e => setimage(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>

        {/* 5 row */}
        <Row>
          <Col md="3">
            <FormGroup>
              <Label className="form-control-label" for="pagetitle">Page Title</Label>
              <Input className="form-control-alternative form-control" type="text" value={pageT} onChange={e => setpaget(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label className="form-control-label" for="metakeywords">Meta Keywords</Label>
              <Input className="form-control-alternative form-control" type="text" value={mkey} onChange={(e) => setmkey(e.target.value)} />
              <Button size="sm" style={{ marginTop: "1px" }} onClick={() => addnewmetaKeys()}>Add</Button>
            </FormGroup>
          </Col>
          <Col md="6">
            <Card body>
              <CardTitle tag="h3" style={{ textAlign: "center" }}>MetaKeywords</CardTitle>
              <p>
                {metakeywords && metakeywords.map((item, index) => {
                  return <div className="spanmetakeywords" key={index}>{item}<span className="spandeletemetakeywords" onClick={() => deleteselectedMetaKeyword(index)}>❌ </span></div>
                })}
              </p>
            </Card>
          </Col>
        </Row>

        {/* 6 row */}
        <Row>
          <Col md="6">
            <FormGroup>
              <Label className="form-control-label" for="MetaDescription">Meta Description</Label>
              <Input className="form-control-alternative form-control" type="textarea" value={metaDescription} onChange={e => setmetaDescripton(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md="6" className="radioContainer">
            <FormGroup >
              <Label className="form-control-label" for="NavigationMenu">Navigation Menu</Label>
              <input type="radio" className="radioinput" id="truenmenu" name="isNm" onChange={e => setnmenu(e.target.value)} value="true" />
              <Label className="form-control-label" for="Yes" className="Labelradio">Yes</Label>
              <input type="radio" className="radioinput" id="falsenmenu" name="isNm" onChange={e => setnmenu(e.target.value)} value="false" />
              <Label className="form-control-label" for="No" className="Labelradio">No</Label>

            </FormGroup>
          </Col>
        </Row>

        {/* 7 row */}
        <Row>
          <Col md="6">
            <FormGroup>
              <Label className="form-control-label" for="UrlKey">URL Key</Label>
              <Input className="form-control-alternative form-control" type="text" value={urlkey} onChange={e => seturlkey(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label className="form-control-label" for="childs">Childs</Label>
              <Input className="form-control-alternative form-control" type="number" value={childs} onChange={e => setchilds(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>
      </Form>
      <div className="categoryExtraBtns">
        <Button className="btn-icon btn-3" color="primary" id="btncategoryaddnew" type="button" onClick={() => updateRootCtgry()}>
          <span className="btn-inner--text" style={{ marginLeft: "0.15em" }}>Update Record</span>
        </Button>
      </div>
    </>
  )
}

export default EditRootCategory;