import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, UncontrolledCollapse, CardBody, ListGroup, ListGroupItem } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import classnames from 'classnames';
import { Editor } from "react-draft-wysiwyg";
import { EditorState} from 'draft-js'
import { stateToHTML } from 'draft-js-export-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Switch from 'react-switch';
import axios from 'axios';
import { JSONtographql } from 'myModules/jsontographql';


const AddProduct = () => {

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const [SKU, setSKU] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState(EditorState.createEmpty())
  const [shortdescription, setshortDescription] = useState(EditorState.createEmpty())
  const [rating, setRating] = useState("");
  const [ratingCount, setRatingCount] = useState("");
  const [switchProductStatus, switchProductstatechange] = useState(false);
  const [productTaxClass, setproductTaxClass]  = useState();
  const [urlKey, setUrlKey] = useState("");
  const [manufacturerCountry, setManufacturerCountry] = useState("");
  const [featureProductState, switchFeatureProductchange] = useState(false);
  const [manufacturer, setManufacturer] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [shippingCharges, setShippingCharges] = useState("");
  const [CodAvailability, switchSetCodAvailability] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [gst, setGst] = useState("");
  const [specialPrice, setSpecialPrice] = useState("");

  const [actualPrice, setActualPrice] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaKeywords, setMetaKeywords] = useState();
  const [metadescription, setmetaDescription] = useState("");
  const [mkeyword,setmkeyword] = useState([]);
  const [images, setImage] = useState();
  const [videos, setVideo] = useState("");
  const [videoarray, setvideoarray] = useState([]);
  const [label, setLabel] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [updatedat, setDate] = useState(new Date());
  const [stock, setStock] = useState("");

  const [vendortaxClass, setVendorTaxClass] = useState("");
  const [paymentType, setPaymentType] = useState("");


  const [thumbnail, setThumbnail] = useState(false);
  const [smallImage, setSmallImage] = useState(false);
  const [baseImage, setBaseImage] = useState(false);
  const [thumbImage, setthumbImage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isvActive, setisvActive] = useState(false);
  const [isLoanAvailable, setisLoanAvailable] = useState(false);
  const [vendorSearched, setSearchedVendorName] = useState("");
  const [searchedVendorsList, setSearchedVendorsList] = useState("");
  const [isActiveVendor, setisActiveVendor] = useState(false);
  const [vendorArray, setSelectedVendor] = useState([]);
  const [ImageArray, setImageArray] = useState([]);


  

  // General Information related

  const switchSetProductStatus = () => {
    if (switchProductStatus === false) {
      switchProductstatechange(true)
    
    }
    else {
      switchProductstatechange(false)
 
    }
  }



  // metakeywords array




  function pushmetaKeyword() {
   setmkeyword(mkeyword =>[...mkeyword,JSON.stringify(metaKeywords)])
   setMetaKeywords("")
  }


  function deleteselectedmetakeywords(index){
    for(let i=0;i<mkeyword.length;i++){
      if(index===i){
        mkeyword.splice(index,1)
        const newmetaKeywordArray = [...mkeyword]
        setmkeyword(newmetaKeywordArray)
       }
    }
  }

  
  useEffect(()=>{
    setmkeyword(mkeyword)
  },[mkeyword])



  // Manufacturer page related

  const switchSetFeatureProduct = () => {
    if (featureProductState === false) {
      switchFeatureProductchange(true)
     
    }
    else {
      switchFeatureProductchange(false)
     
    }
  }


  // Shipping Details related

  const SetCodAvailability = () => {
    if (CodAvailability === false) {
      switchSetCodAvailability(true)
    }
    else {
      switchSetCodAvailability(false);
    }
  }







  // Image/Video Related functions


  // Images


  const switchThumbNail = () => {
    if (thumbnail === false) {
      setThumbnail(true);
    }
    else {
      setThumbnail(false)
    }
  }


  const switchBaseImage = () => {
    if (baseImage === false) {
      setBaseImage(true)
    }
    else {
      setBaseImage(false)
    }
  }



  const switchSmallImage = () => {
    if (smallImage === false) {
      setSmallImage(true)
    }
    else {
      setSmallImage(false)
    }
  }


  const switchVisible = () => {
    if (isVisible === false) {
      setIsVisible(true)
    }
    else {
      setIsVisible(false)
    }
  }


  const setImg = (e) => {
    var imageFile = e.target.files[0];
    setImage(imageFile.name);
    var oFReader = new FileReader();
    oFReader.readAsDataURL(imageFile);

    oFReader.onload = function (oFREvent) {
      document.getElementById("uploadPreview").src = oFREvent.target.result;
    };
  }




  function addtolistImages(){
    setImageArray(ImageArray=>[...ImageArray,
    {
      image: images,
      baseImage: baseImage,
      smallImage: smallImage,
      thumbnail: thumbnail,
      thumbImage: thumbImage,
      label: label,
      visible: isVisible 
    }]);
    setBaseImage(false);
    setSmallImage(false)
    setThumbnail(false)
    setthumbImage("")
    setLabel("")
    setIsVisible(false)
  }


  // delete image from selected images list 

  function delselectedImage(id){
   deletefromServer(ImageArray[id].image)
   for(let i=0;i<ImageArray.length;i++){
     if(id===i){
       ImageArray.splice(id,1)
       const newImageArray = [...ImageArray]
       setImageArray(newImageArray)
      }
   }
  }

  useEffect(()=>{
    setImageArray(ImageArray)
  },[ImageArray])




// Uploading Images to Server

function uploadProductImage(e){
  e.preventDefault();
  addtolistImages();
  const formData = new FormData();
  var file = document.getElementById('productimage').files[0];
  formData.append('file',file)
  axios({
    method: 'post',
    url: 'http://127.0.0.1:4000/uploadproductImages',
    data: formData,
  }).then((response)=>{
  }).catch((e)=>{
    alert(e)
  })
}

 
// Delete image from server

function deletefromServer(imageName){
  console.log(imageName)
  axios({
    method: 'post',
    url: 'http://127.0.0.1:4000/deleteImage',
    data :{
      "name":imageName
    }
  }).then((response)=>{
    console.log(response)
  }).catch((e)=>{
    console.log(e)
  })
  // axios.post('http://127.0.0.1:4000/deleteImage',"data": imageName).then((response)=>{
  //   console.log(response)
  // }).catch((error)=>{
  //   console.log(error)
  // })
}




  // Video

  const handleVideoChange = (e) => {
    setVideo("https://www.youtube.com/embed/" + e.target.value)
  }




  function pushVideo() {
    setvideoarray(videoarray=>[...videoarray,JSON.stringify(videos)])
    setVideo("");
  }

  function delselectedvideos(index){
    for(let i = 0;i<videoarray.length;i++){
      if(i===index){
        videoarray.splice(index,1)
        const newvideosArray = [...videoarray];
        setvideoarray(newvideosArray);
      }
    }
  }

  useEffect(()=>{
    setvideoarray(videoarray)
  },[videoarray])



  // Vendor Related

  function searchVendor() {
    axios.post(`http://localhost:4000/graphql?query={
      searchVendors(tag:"${vendorSearched}"){
       id
       name
       email
       active
      }
    }`).then((result) => {
      setSearchedVendorsList(result.data.data.searchVendors)
    });
  }


  function switchvActive() {
    if (isvActive === false) {
      setisvActive(true)
    }
    else {
      setisvActive(false)
    }
  }


  function pushVendor(id) {
    if(purchasePrice ===""  && stock ==="" && vendortaxClass===""){
      alert("First fill in all the fields then select vendor")
    }
    else{
    setSelectedVendor(vendorArray=>[...vendorArray,
      {
          vendor_id:id,
          purchase_price: parseInt(purchasePrice),
          updated_at:updatedat,
          stock: parseInt(stock),
          active: isActiveVendor,
          vActive: isvActive,
          taxClass:parseInt(vendortaxClass)
  
    }]
    )
    setVendorTaxClass("");
    setPurchasePrice("");
    setDate("");
    setStock("");
    setisActiveVendor(false);
    setisvActive(false);
  }
}


  function switchActiveVendor() {
    if (isActiveVendor === false) {
      setisActiveVendor(true)
    }
    else {
      setisActiveVendor(false)
    }
  }


// Remove selected vendors from list

 function deleteselectedvendors(index){
  for(let i = 0;i<vendorArray.length;i++){
    if(i === index){
      vendorArray.splice(index,1)
      const newVendorArray = [...vendorArray]
      setSelectedVendor(newVendorArray);
    }
  }
 }

useEffect(()=>{
  setSelectedVendor(vendorArray)
},[vendorArray])





  // Other Information related 


  const switchSetLoanAvailablity = () => {
    if (isLoanAvailable === false) {
      setisLoanAvailable(true)
    }
    else {
      setisLoanAvailable(false)
    }
  }






















  // Save Product


  const saveProduct = () => {
 
    // var getDescription = encodeURIComponent(JSON.stringify(convertToRaw(description.getCurrentContent())));
    // var getShortDescription = (JSON.stringify(convertToRaw(shortdescription.getCurrentContent())))
   
    var finalDescription = encodeURIComponent(stateToHTML(description.getCurrentContent()).replace(/\r?\n|\r/g,""));
    var finalShortDescription = encodeURIComponent(stateToHTML(shortdescription.getCurrentContent()).replace(/\r?\n|\r/g,""));

 




    axios.post(`http://localhost:4000/graphql?query=mutation{
        addProduct(
          SKU: "${SKU}",
          productName:"${productName}",
          description:"${finalDescription}" ,
          shortDescription: "${finalShortDescription}",
          rating: ${rating},
          ratingCount: ${ratingCount},
          status: ${switchProductStatus},
          urlKey: "${urlKey}",
          manufacturerCountry: "${manufacturerCountry}",
          featureProduct: ${featureProductState},
          manufacturer: "${manufacturer}",
          deliveryTime: "${deliveryTime}",
          shippingCharges: ${shippingCharges},
          codAvailable: ${CodAvailability},
          quantity: ${quantity},
          price: ${price},
          gst: ${gst},
          specialPrice: ${specialPrice},
          displayActualPrice: ${actualPrice},
          taxClass: ${productTaxClass},
          metaTitle: "${metaTitle}",
          metaKeywords: [${mkeyword}],
          metaDescription: "${metadescription}",
      
          images:${JSONtographql(ImageArray)}, 
          videos:[${videoarray}],
          vendors:${JSONtographql(vendorArray)},
          loan_available: ${isLoanAvailable},
          payment_type:"${paymentType}"
        ),{
          SKU
        }
}`).then((result) => {
  if (result.status === 200) {
    // document.getElementById("alertBox").style.display = "block";
    // setTimeout(function(){ 
    //   document.getElementById("alertBox").style.display = "none";  
    //  }, 3000);
    var ele =  document.getElementById("alertBoxhide");
    ele.removeAttribute('id');
    ele.setAttribute('id','alertBoxshow')
     setTimeout(function(){ 
       ele.removeAttribute('id');
       ele.setAttribute('id','alertBoxhide')
      }, 3000);
     setdefault();

  }
  }).catch(err => alert(err)) 


  }


  function setdefault(){
    setSKU("");
    setProductName("");
    setDescription("");
    setshortDescription("");
    setRating("");
    setRatingCount("");
    switchSetProductStatus(false);
    setUrlKey("");
    setManufacturer("");
    setManufacturerCountry("");
    switchSetFeatureProduct(false);
    setDeliveryTime("");
    setShippingCharges("");
    SetCodAvailability("");
    setQuantity("");
    setPrice("");
    setGst("");
    setSpecialPrice("");
    setActualPrice("");
    setproductTaxClass("");
    setMetaTitle("");
    setmetaDescription("");
    setisLoanAvailable(false)
    setPaymentType("")
    setmkeyword([]);
    setvideoarray([]);
    setImageArray([]);
    setSelectedVendor([])
  }


  return (
   

    <div>
        <div id="alertBoxhide">
        <p className="alertMessage">Updated successfully...</p>
      </div>
      <Nav tabs>

        {/*  1 nav item */}

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            General Information
          </NavLink>
        </NavItem>

        {/* 2 nav item */}

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Manu. Information
          </NavLink>
        </NavItem>

        {/* 3 nav item */}

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            Shipping Details
          </NavLink>
        </NavItem>


        {/* 4 nav item */}


        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
          >
            Meta Information
          </NavLink>
        </NavItem>



        {/* 5 nav item */}


        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '5' })}
            onClick={() => { toggle('5'); }}
          >
            Images/Videos
          </NavLink>
        </NavItem>


        {/* 6 nav item */}


        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '6' })}
            onClick={() => { toggle('6'); }}
          >
            Vendors
          </NavLink>
        </NavItem>


        {/* 7 nav item */}


        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '7' })}
            onClick={() => { toggle('7'); }}
          >
            Other
          </NavLink>
        </NavItem>
      </Nav>


      {/* 1 content   -   General Information */}


      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Form className="form21">
            <Row form> 
              <Col md={6}>
                <FormGroup>
                  <Label className="form-control-label" for="exampleSKU">SKU</Label>
                  <Input type="text" value={SKU} onChange={(e) => setSKU(e.target.value)} name="SKU" id="examplesSKU" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="form-control-label" for="Name">Product Name</Label>
                  <Input type="text" value={productName} name="name" id="ProductName" onChange={(e) => setProductName(e.target.value)} />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={3}>
                <FormGroup>
                  <Label className="form-control-label">Status</Label>
                  <br />
                  <Switch onChange={switchSetProductStatus} checked={switchProductStatus} />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label className="form-control-label" >URL Key</Label>
                  <Input type="text" value={urlKey} onChange={(e) => setUrlKey(e.target.value)} />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label className="form-control-label">Rating</Label>
                  <Input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label className="form-control-label" >Rating Count</Label>
                  <Input type="number" value={ratingCount} onChange={(e) => setRatingCount(e.target.value)} />
                </FormGroup>
              </Col>
            </Row>

            {/* <Button onClick={() => show()}>Sign in</Button> */}
          </Form>


          {/* Editor */}

          <div>

            <div id="addProductEditorshortdescription">
              <Label className="form-control-label" for="exampleCheck" check>Short Description</Label>
              <br />

              <Editor editorState={shortdescription}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                wrapperStyle={{ border: "1px solid black", marginBottom: "20px" }}
                editorStyle={{ height: "300px", padding: "5px",backgroundColor:"white" }}
                onEditorStateChange={editorState => setshortDescription(editorState)}
              />
            </div>
            <div id="addProductEditordescription">
              <Label className="form-control-label" for="exampleCheck" check>Description</Label>
              <br />
              <Editor editorState={description}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                wrapperStyle={{ border: "1px solid black", marginBottom: "20px" }}
                editorStyle={{ height: "300px", padding: "5px",backgroundColor:"white" }}
                onEditorStateChange={editorState => setDescription(editorState)}
              />
            </div>
          </div>
        </TabPane>



        {/* 2 content  - Manufacturer Details*/}


        <TabPane tabId="2">
          <Form className="form21">
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">Manufacturer Country</Label>
                  <Input type="text" value={manufacturerCountry} onChange={(e) => setManufacturerCountry(e.target.value)} />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">Manufacturer</Label>
                  <Input type="text" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">Feature Product</Label>
                  <br />
                  <Switch onChange={switchSetFeatureProduct} checked={featureProductState} />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </TabPane>



        {/* 3 content - Shipping Information*/}


        <TabPane tabId="3">
          <Form className="form21">
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">Delivery Time</Label>
                  <Input type="text"value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">Shipping Charges</Label>
                  <Input type="number" value={shippingCharges} onChange={(e) => setShippingCharges(e.target.value)} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">COD Available</Label>
                  <br />
                  <Switch onChange={SetCodAvailability} checked={CodAvailability} />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">Quantity</Label>
                  <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">Price</Label>
                  <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">Special Price</Label>
                  <Input type="number" value={specialPrice} onChange={(e) => setSpecialPrice(e.target.value)} />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">Actual Price</Label>
                  <Input type="number" value={actualPrice} onChange={(e) => setActualPrice(e.target.value)} />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </TabPane>




        {/* 4 content  - Meta Information*/}


        <TabPane tabId="4">
          <Form className="form21">
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">Meta Title</Label>
                  <Input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">Meta Keywords</Label>
                  <Input type="text" value={metaKeywords} onChange={(e) =>setMetaKeywords(e.target.value)}/>
                  <Button size="sm" onClick={pushmetaKeyword}>Add</Button>
                </FormGroup>
              </Col>
              <Col md="4">
              <Card body>
                  <CardTitle tag="h3">Meta Keywords</CardTitle>
                  <p>
                     {
                       mkeyword && mkeyword.map((element,index) => {
                        return <div className="spanmetakeywords" key={index}><span>{JSON.parse(element)}<span className="spandeletemetakeywords" onClick={()=>deleteselectedmetakeywords(index)}>❌ </span></span></div>
                       })
                     }
                     </p>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="6">
              <FormGroup>
                  <Label className="form-control-label">Meta Description</Label>
                  <Input type="textarea" value={metadescription} onChange={(e) => setmetaDescription(e.target.value)} />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </TabPane>



        {/* 5 content - Images/Videos */}



        {/* Images */}

        <TabPane tabId="5">
          <Row>
            <Col sm="12">
              <Card body>

                <UncontrolledCollapse toggler="#imagetoggler">
                  <Row>
                    <Col md="3">
                      <CardTitle tag="h3">Image Upload</CardTitle>
                      <img id="uploadPreview" style={{ width: "100px", height: "100px" }} />
                    </Col>
                    <Col md="9">
                      <Card body>
                        <CardTitle tag="h3">Selected Images</CardTitle>
                        {ImageArray && ImageArray.map((item,index) => {
                          return <CardText key={index}>{item.image}<span onClick={()=>delselectedImage(index)}>❌ </span></CardText>
                        })}
                      </Card>
                    </Col>
                  </Row>
                  <Form className="form21" onSubmit={uploadProductImage} encType="multipart/form-data">
                    <Row>
                      <Col md="3">
                        <FormGroup>
                          <Label className="form-control-label">Image</Label>
                          <Input type="file" id="productimage" onChange={setImg} name="productimage"/>
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label className="form-control-label">Base Image</Label>
                          <br />
                          <Switch onChange={switchBaseImage} checked={baseImage} />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label className="form-control-label">Small Image</Label>
                          <br />
                          <Switch onChange={switchSmallImage} checked={smallImage} />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label className="form-control-label">Thumbnail</Label>
                          <br />
                          <Switch onChange={switchThumbNail} checked={thumbnail} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="3">
                        <FormGroup>
                          <Label className="form-control-label">Thumb Image</Label>
                          <Input type="text" value={thumbImage} onChange={(e) => setthumbImage(e.target.value)} />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label className="form-control-label">Label</Label>
                          <Input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label className="form-control-label">Visible</Label>
                          <br />
                          <Switch onChange={switchVisible} checked={isVisible} />
                        </FormGroup>
                      </Col>
                      <Col md="3" style={{ margin: "auto" }}>
                        <Button type="submit" className="btn-block" size="sm" outline color="primary">
                          <span className="btn-inner--icon">
                            <i className="ni ni-fat-add">Add to List</i>
                          </span>
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </UncontrolledCollapse>
                <Button color="primary" id="imagetoggler" style={{ marginBottom: '1rem' }}>
                  Add Image
                </Button>
              </Card>
            </Col>
          </Row>


          {/* Video */}

          <Row>
            <Col sm="12">
              <Card body>
                <UncontrolledCollapse toggler="#videotoggler">
                  
                  <Row>
                    <Col md="4">
                    <iframe width="300" height="200" src={videos} ></iframe>
                    </Col>
                    <Col>
                    <Card body className="videoarraycard">
                        <CardTitle tag="h3">Selected Videos</CardTitle>
                        {videoarray && videoarray.map((item,index) => {
                          return <CardBody className="videocardinner" key={index}><iframe width="120" height="60" src={JSON.parse(item)} ></iframe><span className="spanVideoAddproduct">{JSON.parse(item)}<span className="videodeleteiconaddProduct" onClick={()=>delselectedvideos(index)}>❌ </span></span></CardBody>
                        })}
                      </Card>
                    </Col>
                    </Row>
                    <Row md="4">
                    <Col md="6">
                      <Label className="form-control-label">Video URL</Label>
                      <Input type="text" onChange={handleVideoChange} />
                      <Button size="sm" onClick={()=>pushVideo()}>Add</Button>
                      <br/>
                    </Col>
                  </Row>
                </UncontrolledCollapse>
                <Button color="primary" id="videotoggler" style={{ marginBottom: '1rem' }}>
                  Add Video
                </Button>
              </Card>
            </Col>
          </Row>
        </TabPane>




        {/* 6 content - Vendors */}


        <TabPane tabId="6">
          <Form className="form21">
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">Search Vendor</Label>
                  <Input type="text"  onChange={(e) => setSearchedVendorName(e.target.value)} />
                  <ListGroup>
                    {searchedVendorsList && searchedVendorsList.map(item => {
                      return (
                        <ListGroupItem key={item.id} onClick={() => pushVendor(item.id)}>{item.name}</ListGroupItem>
                      )
                    })}
                  </ListGroup>
                  <Button className="btn-icon btn-2" onClick={() => searchVendor()} type="button">
                    <span className="btn-inner--icon">
                      <i class="fas fa-search"></i>
                    </span>
                  </Button>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">Purchase Price</Label>
                  <Input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
                </FormGroup>
              </Col>
              <Col md="6">
                <Card body>
                  <CardTitle tag="h3" style={{textAlign:"center"}}>Selected Vendor</CardTitle>
                  {vendorArray && vendorArray.map((item,index)=>{
                    return <CardText key={index}>{item.vendor_id}<span onClick={()=>deleteselectedvendors(index)}>❌ </span></CardText>
                  })}
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">Updated at</Label>
                  <Input type="date" value={updatedat} onChange={(e) => setDate(e.target.value)} />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">Stock</Label>
                  <Input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">Active</Label>
                  <br />
                  <Switch onChange={switchActiveVendor} checked={isActiveVendor} />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">vActive</Label>
                  <br />
                  <Switch onChange={switchvActive} checked={isvActive} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">Tax Class</Label>
                  <Input type="number" value={vendortaxClass} onChange={(e) => setVendorTaxClass(e.target.value)} />
                </FormGroup>
              </Col>
            
            </Row>
          </Form>
        </TabPane>




        {/* 7 content - Others */}


        <TabPane tabId="7">
          <Form className="form21">
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">GST</Label>
                  <Input type="number" value={gst} onChange={(e) => setGst(e.target.value)} />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">Tax Class</Label>
                  <Input type="number" value={productTaxClass} onChange={(e) =>setproductTaxClass(e.target.value)} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label className="form-control-label">Loan Available</Label>
                  <br />
                  <Switch onChange={switchSetLoanAvailablity} checked={isLoanAvailable} />
                </FormGroup>
              </Col>
              <Col md="3">
                <Label className="form-control-label">Payment Type</Label>
                <Input type="text" value={paymentType} onChange={(e) => setPaymentType(e.target.value)} />
              </Col>
            </Row>
            <Button color="primary" onClick={() => saveProduct()} style={{ float: "right", marginRight: "70px" }}>Save</Button>
          </Form>
        </TabPane>

      </TabContent>
    </div >
  );
}

export default AddProduct;